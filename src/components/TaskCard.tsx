import { useState } from "react";
import { useSelector } from "react-redux";
import type { ShowEditsTypes, Task } from "../types/task.types";
import TaskForm from "./TaskForm";
import ConfirmationDialog from "./ConfirmationDialog";
import { useAppDispatch } from "../hooks/hooks";
import {
  updateTask,
  deleteTask,
  uploadImage,
  selectCardError,
  selectImageUploadStatus,
  selectImageUploadError,
  clearCardError,
  clearImageUploadError,
  setCardError
} from "../redux/slices/TasksSlice";
import type { RootState } from "../redux/Store";
import {  selectUserEmail } from "../redux/slices/AuthSlice";

function TaskCard({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const UserEmail = useSelector(selectUserEmail);

  const [showEdits, setShowEdits] = useState<ShowEditsTypes>({ yes: false, id: 0 });
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task>({
    title: task.title,
    description: task.description,
    image_url: task.image_url
  });
  
  
  
  const [newFile, setNewFile] = useState<File | null>(null);
  
  
  
  // Get card error and image upload state from Redux
  const cardError = useSelector((state: RootState) => 
    task.id ? selectCardError(state, task.id) : undefined
  );
  const imageUploadStatus = useSelector(selectImageUploadStatus);
  const imageUploadError = useSelector(selectImageUploadError);

  // Client-side validation for editing
  const validateEditTask = (task: Task): boolean => {
    
    
    if (!task.id) {
      
      return false;
    }

    dispatch(clearCardError(task.id));

    if (!task.title.trim()) {
      
      dispatch(setCardError({ taskId: task.id, error: "Task title is required" }));
      return false;
    }

    if (!task.description.trim()) {
      
      dispatch(setCardError({ taskId: task.id, error: "Task description is required" }));
      return false;
    }

    
    return true;
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    if (task.id) {
      dispatch(deleteTask(task.id));
      setShowDeleteDialog(false);
    }
  };
  
  const handleEdit = (id: number) => {
    setShowEdits({ yes: true, id });
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
      image_url: task.image_url
    });
    setNewFile(null);

    if (task.id) {
      dispatch(clearCardError(task.id));
      dispatch(clearImageUploadError());
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    

    if (!task.id) {
      
      return;
    }

    // Test client-side validation
    if (!validateEditTask(editingTask)) {
      
      return;
    }

    const updatedTask = { ...editingTask, id: task.id };

    // If there's a new file, upload it first
    if (newFile) {
      const uploadResult = await dispatch(uploadImage(newFile));
      
      if (uploadImage.fulfilled.match(uploadResult)) {
        updatedTask.image_url = uploadResult.payload;
      } else {
        // Upload failed, don't proceed with task update
        return;
      }
    }

    
    try {
      const resultAction = await dispatch(updateTask(updatedTask));
      

      if (updateTask.fulfilled.match(resultAction)) {
        
        setShowEdits({ yes: false, id: 0 });
        setNewFile(null);
      } else if (updateTask.rejected.match(resultAction)) {
        console.log("Update rejected:", resultAction.payload || resultAction.error);
      }
    } catch (error) {
      console.log("Update threw error:", error);
    }
  };

  const handleEditingTaskChange = (updatedTask: Task) => {
    setEditingTask(updatedTask);
    if (task.id && cardError) {
      dispatch(clearCardError(task.id));
    }
    if (imageUploadError) {
      dispatch(clearImageUploadError());
    }
  };

  const handleCancelEdit = () => {
    setShowEdits({ yes: false, id: 0 });
    if (task.id) {
      dispatch(clearCardError(task.id));
      dispatch(clearImageUploadError());
    }
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
      image_url: task.image_url
    });
    setNewFile(null);
  };

  // Combine card error and image upload error for display
  const displayError = cardError || imageUploadError;

  return (
  <>
    <li className="group border border-gray-100 rounded-lg p-4 sm:p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200 bg-white">
      {showEdits.yes && showEdits.id === task.id ? (
        <div>
          {/* Debug info */}
          <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 text-xs">
            <div>Task ID: {task.id}</div>
            <div>Card Error: {cardError || "none"}</div>
            <div>Image Upload Error: {imageUploadError || "none"}</div>
            <div>Upload Status: {imageUploadStatus}</div>
            <div>Title: "{editingTask.title}"</div>
            <div>Description: "{editingTask.description}"</div>
          </div>
          
          <TaskForm
            task={editingTask}
            error={displayError || ""}
            onSubmit={handleEditSubmit}
            onTaskChange={handleEditingTaskChange}
            buttonText={imageUploadStatus === "loading" ? "Uploading..." : "Update Task"}
            file={newFile}
            setNewFile={setNewFile}
            disabled={imageUploadStatus === "loading"}
          />
          
          <button
            className="w-full text-xs sm:text-sm px-3 py-2 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150 font-medium mt-2"
            onClick={handleCancelEdit}
            disabled={imageUploadStatus === "loading"}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <h2 className="text-sm sm:text-base font-medium text-gray-900 break-words leading-snug">
              {task.title}
            </h2>
            <div className="flex flex-col sm:items-end gap-1 text-xs text-gray-500">
              {task.email && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {task.email}
                </span>
              )}
              {task.created_at && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(task.created_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-4 break-words leading-relaxed line-clamp-3">
            {task.description}
          </p>

          <img 
            src={task.image_url ?? undefined} 
            alt="Task image" 
            className="w-full h-32 sm:h-40 object-cover rounded-md mb-4 border border-gray-100"
          />


          {task.email === UserEmail && (
<>
            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-xs rounded-md mb-3 break-words">
              {displayError}
            </div>
          )}
          
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
            <button
              className="flex-1 text-xs sm:text-sm px-3 py-2 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150 font-medium"
              onClick={() => handleEdit(Number(task.id))}
            >
              Edit
            </button>
            <button
              className="flex-1 text-xs sm:text-sm px-3 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 transition-colors duration-150 font-medium"
              onClick={handleDeleteClick}
              >
              Delete
            </button>
          </div>
                </>
            )}


        </>
      )}
    </li>
    
    <ConfirmationDialog
      isOpen={showDeleteDialog}
      title="Delete Task"
      message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
      confirmButtonStyle="danger"
    />
  </>
);
}

export default TaskCard;