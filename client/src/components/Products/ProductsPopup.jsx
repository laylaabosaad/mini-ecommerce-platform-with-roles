
import Inputs from "../Inputs"
function ProductsPopup({
  title,
  categories,
  state,
  action,
  isPending,
  onCancel,
  defaultData = {},
}) {
  const fieldData = state?.fieldData || defaultData;

  return (
    <div className="fixed inset-0 bg-[#0000009c] flex justify-center items-center z-50 px-4 overflow-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <Inputs
                title="Book Name"
                htmlFor="name"
                type="text"
                name="name"
                defaultValue={fieldData?.name}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <Inputs
                title="Author"
                htmlFor="author"
                type="text"
                name="author"
                defaultValue={fieldData?.author}
                required
              />
            </div>
          </div>

          <Inputs
            title="Image URL"
            htmlFor="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue={fieldData?.imageUrl}
            required
          />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <Inputs
                title="Price ($)"
                htmlFor="price"
                type="number"
                name="price"
                step="0.01"
                defaultValue={fieldData?.price}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <Inputs
                title="Quantity"
                htmlFor="inventoryQuantity"
                type="number"
                name="inventoryQuantity"
                defaultValue={fieldData?.inventoryQuantity}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-medium mb-1 block">Category</label>
              <select
                name="category"
                defaultValue={fieldData?.category || ""}
                required
                className="w-full border rounded-md p-2"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border rounded-md p-2 h-32 resize-y"
              defaultValue={fieldData?.description}
            />
          </div>

          {state?.success === false && (
            <p className="text-red-600">{state?.message}</p>
          )}
          {state?.success === true && (
            <p className="text-green-600">{state?.message}</p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsPopup;
