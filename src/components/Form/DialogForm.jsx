import React from "react";

const DialogForm = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  modalSuccess,
  modalError,
  submitButton
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
      <div className="bg-[#eae3f5] rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>
        {title && (
          <h2 className="text-2xl font-bold mb-4 text-center text-[#7C2EEA]">{title}</h2>
        )}
        {modalSuccess && <div className="mb-2 text-green-600 text-center">{modalSuccess}</div>}
        {modalError && <div className="mb-2 text-red-600 text-center">{modalError}</div>}
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto hide-scrollbar bg-gradient-to-br p-6 rounded-xl"
        >
          {children}
          {submitButton && (
            <div className="md:col-span-2 flex justify-center mt-4">
              {submitButton}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DialogForm;