import type { BaseFormProps } from "../types/form.types";

function BaseForm({ 
  children, 
  onSubmit, 
  error, 
  buttonText,
  disabled = false
}: BaseFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-md">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={disabled}
        className={`w-full text-sm px-4 py-3 font-medium rounded-lg transition-colors duration-150 ${
          disabled
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default BaseForm;