import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import type { Task, TaskState, AddTaskPayload } from "../../types/task.types";
import type { RootState } from "../Store";

// Image upload async thunk
export const uploadImage = createAsyncThunk(
  'tasks/uploadImage',
  async (file: File, thunkAPI) => {
    try {
      const filePath = `${file.name}-${Date.now()}`;
      const { error } = await supabase.storage.from("task-images").upload(filePath, file);
      
      if (error) {
        console.log(`Error uploading image: ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
      }

      const { data } = await supabase.storage.from("task-images").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Failed to upload image ${error}`);
    }
  }
);

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (session: Session, thunkAPI) => {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
  if (error) return thunkAPI.rejectWithValue(error.message);
  return data as Task[];
});

export const addTask = createAsyncThunk('tasks/addTask', async (payload: AddTaskPayload, thunkAPI) => {
  const { task, session } = payload;

  const email = session.user?.email;
  if (!email) {
    return thunkAPI.rejectWithValue("User email is required.");
  }

  const { title, description, image_url } = task;
  if (!title || !description || !image_url) {
    return thunkAPI.rejectWithValue("All fields are required.");
  }

  const taskWithEmail = { ...task, email };

  const { data, error } = await supabase.from('tasks').insert([taskWithEmail]).select().single();
  if (error) return thunkAPI.rejectWithValue(error.message);

  return data as Task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number, thunkAPI) => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) {
    console.log(error)
    return thunkAPI.rejectWithValue({ id, message: error.message });
  }
  return id;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task, thunkAPI) => {
  const { id, title, description, image_url } = task;
  const { error } = await supabase.from('tasks').update({ title, description, image_url }).eq('id', id);
  if (error) return thunkAPI.rejectWithValue({ id, message: error.message });
  return task;
});

const initialState: TaskState = {
  items: [], 
  status: "idle",
  // Fetch errors
  fetchError: null,
  // Add task errors
  addTaskError: null,
  addTaskValidationError: null,
  // Card operation errors (update/delete)
  cardErrors: {}, // { taskId: errorMessage }
  // Image upload state
  imageUploadStatus: "idle",
  imageUploadError: null
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // Fetch error reducers
        clearFetchError: (state) => {
            state.fetchError = null;
        },
        
        // Add task error reducers
        clearAddTaskError: (state) => {
            state.addTaskError = null;
        },
        clearAddTaskValidationError: (state) => {
            state.addTaskValidationError = null;
        },
        setAddTaskValidationError: (state, action) => {
            state.addTaskValidationError = action.payload;
        },
        
        // Card error reducers
        clearCardError: (state, action) => {
            const taskId = action.payload;
            delete state.cardErrors[taskId];
        },
        clearAllCardErrors: (state) => {
            state.cardErrors = {};
        },
        setCardError: (state, action) => {
            const { taskId, error } = action.payload;
            state.cardErrors[taskId] = error;
        },
        
        // Image upload error reducers
        clearImageUploadError: (state) => {
            state.imageUploadError = null;
        },
        
        // Real-time subscription action
        taskAdded: (state, action) => {
          state.items.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        
      builder /* fetching tasks */
        .addCase(fetchTasks.pending, (state) => {
          state.status = "loading";
          state.fetchError = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
            state.fetchError = null;
          })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.status = "failed";
          state.fetchError = (action.payload as string) || action.error.message || "Failed to fetch tasks";
          })
          
           /* adding new tasks */
          .addCase(addTask.pending, (state) => {
           state.status = "loading";
           state.addTaskError = null;
          })
          .addCase(addTask.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items.unshift(action.payload); // Add to beginning
            state.addTaskError = null;
            state.addTaskValidationError = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.addTaskError = (action.payload as string) || action.error.message || "Failed to add task";
      })
      
       /* update tasks */
      .addCase(updateTask.pending, (state, action) => {
        state.status = "loading";
        const taskId = action.meta.arg.id;
        if (taskId !== undefined) {
         delete state.cardErrors[taskId];
  }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTask = action.payload;
        const index = state.items.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          state.items[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        const taskId = action.meta.arg.id;
        if (taskId !== undefined) {
          state.cardErrors[taskId] = (action.payload as string) || action.error.message || "Failed to update task";
        }
      })

      /* delete tasks */
      .addCase(deleteTask.pending, (state, action) => {
        state.status = "loading";
        const taskId = action.meta.arg;
        delete state.cardErrors[taskId];
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action.payload;
        state.items = state.items.filter(task => task.id !== deletedId);
        delete state.cardErrors[deletedId];
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        const taskId = action.meta.arg;
        state.cardErrors[taskId] = (action.payload as string) || action.error.message || "Failed to delete task";
      })

      /* image upload */
      .addCase(uploadImage.pending, (state) => {
        state.imageUploadStatus = "loading";
        state.imageUploadError = null;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.imageUploadStatus = "succeeded";
        state.imageUploadError = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.imageUploadStatus = "failed";
        state.imageUploadError = (action.payload as string) || action.error.message || "Failed to upload image";
      });
    }
});

// Selectors
export const selectAllTasks = (state: RootState) => state.tasks.items;
export const selectAllTasksStatus = (state: RootState) => state.tasks.status;
export const selectFetchError = (state: RootState) => state.tasks.fetchError;
export const selectAddTaskError = (state: RootState) => state.tasks.addTaskError;
export const selectAddTaskValidationError = (state: RootState) => state.tasks.addTaskValidationError;
export const selectCardErrors = (state: RootState) => state.tasks.cardErrors;
export const selectCardError = (state: RootState, taskId: number) => state.tasks.cardErrors[taskId];
export const selectTaskById = (state: RootState, taskId: number) => state.tasks.items.find(task => task.id === taskId);
export const selectImageUploadStatus = (state: RootState) => state.tasks.imageUploadStatus;
export const selectImageUploadError = (state: RootState) => state.tasks.imageUploadError;

export const { 
  clearFetchError, 
  clearAddTaskError, 
  clearAddTaskValidationError,
  setAddTaskValidationError,
  clearCardError, 
  clearAllCardErrors,
  setCardError,
  clearImageUploadError,
  taskAdded 
} = taskSlice.actions;

export default taskSlice.reducer;