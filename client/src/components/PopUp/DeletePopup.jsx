function DeletePopup({ onCancel, onConfirm, errorMessage, title }) {
  return (
    <div className="fixed inset-0 bg-[#393939ab] flex justify-center items-center z-50 px-4 overflow-auto">
      <div className="bg-white flex flex-col gap-2 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold text-center">
          Delete {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>

        <p>Are you sure you want to delete this {title}?</p>
        {errorMessage && (
          <p className="rounded text-red-500 text-center text-sm">{errorMessage}</p>
        )}
        <div className="flex justify-evenly items-center mt-2">
          <button
            onClick={onCancel}
            className="rounded border px-2 py-1 w-[100px] hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded border px-2 py-1 w-[100px] hover:bg-red-100 text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
