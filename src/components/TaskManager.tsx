import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { Task } from "../types/task.types";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import type { Session } from "@supabase/supabase-js";
import { useAppDispatch } from "../hooks/hooks";
import {
  fetchTasks,
  selectAllTasks,
  selectFetchError,
  selectAddTaskError,
  selectAddTaskValidationError,
  selectImageUploadStatus,
  selectImageUploadError,
  addTask,
  uploadImage,
  clearAddTaskError,
  clearAddTaskValidationError,
  clearImageUploadError,
  setAddTaskValidationError
} from "../redux/slices/TasksSlice";

function TaskManager({session} : {session: Session}) {
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    image_url: ''
  });
  
  const [newFile, setNewFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const tasks = useSelector(selectAllTasks);
  const fetchError = useSelector(selectFetchError);
  const addTaskError = useSelector(selectAddTaskError);
  const addTaskValidationError = useSelector(selectAddTaskValidationError);
  const imageUploadStatus = useSelector(selectImageUploadStatus);
  const imageUploadError = useSelector(selectImageUploadError);

  // Client-side validation
  const validateTask = (task: Task, file: File | null): boolean => {
    // Clear previous validation error
    dispatch(clearAddTaskValidationError());

    if (!task.title.trim()) {
      dispatch(setAddTaskValidationError("Task title is required"));
      return false;
    }

    if (!task.description.trim()) {
      dispatch(setAddTaskValidationError("Task description is required"));
      return false;
    }

    if (!file) {
      dispatch(setAddTaskValidationError("Task image is required"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side validation
    if (!validateTask(newTask, newFile)) {
      return;
    }

    let imageUrl: string | null = null;

    if (newFile) {
      // Use the Redux upload image action
      const uploadResult = await dispatch(uploadImage(newFile));
      
      if (uploadImage.fulfilled.match(uploadResult)) {
        imageUrl = uploadResult.payload;
      } else {
        // Upload failed, don't proceed with task creation
        return;
      }
    }

    const taskWithImage = { ...newTask, image_url: imageUrl };

    const resultAction = await dispatch(addTask({ task: taskWithImage, session }));
    
    if (addTask.fulfilled.match(resultAction)) {
      // Success: clear the form
      setNewTask({ title: "", description: "", image_url: "" });
      setNewFile(null);
    }
    // Error handling is now done through Redux state
  };

  const handleTaskChange = (task: Task) => {
    setNewTask(task);
    // Clear validation errors when user starts typing
    if (addTaskValidationError) {
      dispatch(clearAddTaskValidationError());
    }
    // Clear server errors when user starts typing
    if (addTaskError) {
      dispatch(clearAddTaskError());
    }
    // Clear image upload errors when user makes changes
    if (imageUploadError) {
      dispatch(clearImageUploadError());
    }
  };

  useEffect(() => {
    dispatch(fetchTasks(session));
  }, [dispatch, session]);

  // Combine validation, server, and image upload errors for display
  const displayError = addTaskValidationError || addTaskError || imageUploadError;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 sm:px-6 py-8 sm:py-12 font-sans">
      <section className="max-w-lg mx-auto">
        {/* Header */}
        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Tasks
          </h1>
          <p className="text-sm text-gray-500 mt-2">Plan. Focus. Finish.</p>
        </header>

        {/* Show fetch error if exists */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-md mb-6">
            {fetchError}
          </div>
        )}

        {/* TaskForm component */}
        <TaskForm 
          task={newTask}
          error={displayError || ""}
          onSubmit={handleSubmit}
          onTaskChange={handleTaskChange}
          buttonText={imageUploadStatus === "loading" ? "Uploading..." : "Add Task"}
          file={newFile}
          setNewFile={setNewFile}
          disabled={imageUploadStatus === "loading"}
        />

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No tasks yet.</p>
            <p className="text-xs text-gray-400 mt-1">Create your first task above</p>
          </div>
        ) : (
          <ul className="space-y-3 sm:space-y-4 mt-8">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default TaskManager;