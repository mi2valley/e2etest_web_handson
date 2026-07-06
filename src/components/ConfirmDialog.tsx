interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <dialog
        open
        aria-labelledby="dialog-title"
        aria-modal="true"
        className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full m-auto"
      >
        <h2 id="dialog-title" className="text-lg font-bold mb-4">
          確認
        </h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            確定
          </button>
        </div>
      </dialog>
    </div>
  );
}
