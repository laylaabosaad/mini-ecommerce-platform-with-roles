import { useActionState, useEffect, useState } from "react";
import ProductsPopup from "../../src/components/Products/ProductsPopup";
import { addProduct } from "../../actions/products";
import { getCategories } from "../../actions/categories";

function AddProducts({ onCancel, onProductAdded }) {
  const [state, action, isPending] = useActionState(addProduct, undefined);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      if (result?.success) {
        setCategories(result.data);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (state?.success && state.data) {
      if (onProductAdded) {
        onProductAdded(state.data);
      }
      onCancel();
    }
  }, [state, onProductAdded, onCancel]);

  return (
    <div>
      <ProductsPopup
        title={"Add New Book"}
        categories={categories}
        state={state}
        action={action}
        isPending={isPending}
        onCancel={onCancel}
      />
    </div>
  );
}

export default AddProducts;
