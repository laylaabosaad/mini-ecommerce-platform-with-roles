import { useState, useEffect, useActionState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { addCategory, deleteCategory } from "../../../actions/categories";
import DeletePopup from "../PopUp/DeletePopup";
import SuccessPopup from "../PopUp/SuccessPopup";

function CategoryDropdown({
  categories,
  message,
  role,
  closeMenu,
  onCategoryAdded,
  onCategoryDeleted,
}) {
  const [addingCategory, setAddingCategory] = useState(false);
  const [state, formAction, isPending] = useActionState(addCategory, undefined);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [deletedCategoryTitle, setDeletedCategoryTitle] = useState("");

  useEffect(() => {
    if (state?.success && state?.category) {
      onCategoryAdded(state.category);
      setAddingCategory(false);
    }
  }, [state?.success, state?.category, onCategoryAdded]);

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteError("");
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setCategoryToDelete(null);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    setDeleteError("");
    try {
      const result = await deleteCategory(categoryToDelete._id);

      if (result.success) {
        onCategoryDeleted(categoryToDelete._id);
        setDeletedCategoryTitle(categoryToDelete.title);
        setShowDeletePopup(false);
        setCategoryToDelete(null);
        setShowSuccessPopup(true);
      } else {
        setDeleteError(result.message || "Failed to delete category.");
      }
    } catch (e) {
      setDeleteError("Unexpected error.");
    }
  };

  return (
    <div className="relative group">
      <div className="px-4 py-2 nav-link cursor-pointer rounded hover:nav-link-active group-hover:bg-slate-700">
        Categories
      </div>

      <div className="absolute left-0 top-full w-60 bg-slate-600 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50 flex flex-col max-h-[300px] overflow-y-auto">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between group/category hover:bg-slate-700 px-4 py-2"
            >
              <Link
                to={`/products/category/${category._id}`}
                onClick={closeMenu}
                className="flex-grow"
              >
                {category.title}
              </Link>
              {role === "admin" && (
                <button
                  onClick={() => handleDeleteClick(category)}
                  className="text-red-600 hover:underline text-sm flex items-center gap-1"
                  aria-label={`Delete category ${category.title}`}
                >
                  <FaTrash />
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <span className="px-4 py-2 text-sm italic text-gray-200">
            {message || "No categories found"}
          </span>
        )}

        {role === "admin" && (
          <>
            {!addingCategory ? (
              <button
                onClick={() => setAddingCategory(true)}
                className="px-4 py-2 text-sm hover:bg-slate-500 hover:text-white transition-colors duration-150 cursor-pointer border-t border-slate-500 w-full text-left sticky bottom-0 bg-slate-600"
              >
                + Add New Category
              </button>
            ) : (
              <div className="p-2 border-t border-slate-500 sticky bottom-0 bg-slate-600">
                <form action={formAction}>
                  <input
                    name="title"
                    type="text"
                    className="w-full px-2 py-1 text-black rounded mb-2"
                    placeholder="Category name"
                    autoFocus
                  />
                  <div className="flex justify-between gap-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {isPending ? "Adding..." : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddingCategory(false)}
                      className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                  {state?.error && (
                    <div className="text-red-200 text-sm mt-1">
                      {state.error}
                    </div>
                  )}
                </form>
              </div>
            )}
          </>
        )}
      </div>

      {showDeletePopup && (
        <DeletePopup
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          errorMessage={deleteError}
          title="category"
        />
      )}

      {showSuccessPopup && (
        <SuccessPopup
          title={deletedCategoryTitle}
          onCancel={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
}

export default CategoryDropdown;
