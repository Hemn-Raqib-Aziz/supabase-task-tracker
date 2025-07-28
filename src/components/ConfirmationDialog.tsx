import type { ConfirmationDialogProps } from "../types/ui.types";

function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmButtonStyle = 'primary'
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const confirmButtonClasses = confirmButtonStyle === 'danger'
    ? "flex-1 text-xs sm:text-sm px-3 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 transition-colors duration-150 font-medium"
    : "flex-1 text-xs sm:text-sm px-3 py-2 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150 font-medium";

  // Icon components
  const IconComponent = () => {
    const baseClasses = "w-6 h-6 mx-auto mb-3";
    
    
        return (
          <svg className={`${baseClasses} text-red-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
    
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)'
      }}
    >
      <div 
        className="bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 p-4 sm:p-5 max-w-sm w-full shadow-xl animate-in zoom-in-95 duration-200"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="text-center">
          <IconComponent />
          
          {title && (
            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 break-words leading-snug">
              {title}
            </h3>
          )}
          
          <p className="text-xs sm:text-sm text-gray-600 mb-4 break-words leading-relaxed">
            {message}
          </p>
        </div>
        
        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
          <button
            className="flex-1 text-xs sm:text-sm px-3 py-2 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150 font-medium"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={confirmButtonClasses}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;