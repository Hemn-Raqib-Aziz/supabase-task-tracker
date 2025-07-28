import BaseForm from "./BaseForm";
import type { TaskFormProps } from "../types/task.types";

function TaskForm({ 
  task, 
  error, 
  onSubmit, 
  onTaskChange, 
  buttonText = "Submit", 
  file,
  setNewFile,
  disabled = false
}: TaskFormProps) {
  
  const handleInputChange = (field: 'title' | 'description', value: string) => {
    onTaskChange({ ...task, [field]: value });
  };

  return (
    <BaseForm 
      onSubmit={onSubmit} 
      error={error} 
      buttonText={buttonText}
      disabled={disabled}
    >
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={task.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </div>

      <div>
        <textarea
          placeholder="Task description"
          rows={3}
          value={task.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </div>
      
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewFile(e.target.files?.[0] || null)}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        {file && (
          <p className="text-xs text-gray-500 mt-1">
            Selected: {file.name}
          </p>
        )}
      </div>
    </BaseForm>
  );
}

export default TaskForm;