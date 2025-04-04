import { useEffect } from 'react';

// Define props interface for the Toast component
interface ToastProps {
  message: string; // The message to display
  type?: 'success' | 'error' | 'info' | 'warning'; // Toast type for styling
  duration?: number; // Duration in milliseconds before auto-dismiss (default: 3000ms)
  onClose: () => void; // Callback to close the toast
}

const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) => {
  // Auto-dismiss after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [duration, onClose]);

  // Determine styles based on type
  const typeStyles = {
    success: 'alert-success',
    error: 'alert-error',
    info: 'alert-info',
    warning: 'alert-warning',
  }[type];

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${typeStyles} flex items-center justify-between p-4 shadow-lg`}>
        {/* Message */}
        <span>{message}</span>

        {/* Close Button */}
        <button
          className="btn btn-ghost btn-sm btn-circle ml-2"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;