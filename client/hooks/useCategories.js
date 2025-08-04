import { useState, useEffect } from "react";
import { getCategories } from "../actions/categories";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getCategories(setCategories).finally(() => setLoading(false));
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      setErrorMsg("Title is required");
      return false;
    }

    if (result.success) {
      setNewCategoryTitle("");
      setAddingCategory(false);
      setErrorMsg("");
      await getCategories(setCategories);
      return true;
    } else {
      setErrorMsg("Failed to add category");
      return false;
    }
  };

  return {
    categories,
    loading,
    addingCategory,
    setAddingCategory,
    newCategoryTitle,
    setNewCategoryTitle,
    errorMsg,
    handleAddCategory,
  };
}

export default useCategories;
