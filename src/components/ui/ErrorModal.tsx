// components/ui/ErrorModal.tsx
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttons?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'danger' | 'secondary';
  }[];
}

export function ErrorModal({ isOpen, onClose, title, message, buttons }: ErrorModalProps) {
  if (!isOpen) return null;

  const defaultButtons = buttons || [
    { label: 'OK', onClick: onClose, variant: 'primary' as const },
  ];

  return (
    <div 
      className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-black rounded-xl w-full max-w-md border-2 border-red-600 p-6">
        <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm mb-5 whitespace-pre-line">{message}</p>
        <div className="flex gap-3">
          {defaultButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                btn.variant === 'danger' 
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : btn.variant === 'secondary'
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}