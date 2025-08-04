function SuccessPopup({ onCancel, title }) {
  return (
    <div className="fixed inset-0 bg-[#393939ab] flex justify-center items-center z-50 px-4 overflow-auto">
      <div className="bg-white flex flex-col gap-2 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold text-center">
          {title} is deleted Successfully
        </h2>

        <div className="flex justify-evenly items-center mt-2">
          <button
            onClick={onCancel}
            className="rounded border text-green-400 px-2 py-1 w-[100px] hover:bg-slate-100"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPopup;
