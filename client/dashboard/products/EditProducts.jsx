import { useActionState, useEffect, useState } from "react";
import ProductsPopup from "../../src/components/Products/ProductsPopup";
import { editProduct, fetchSingleProduct } from "../../actions/products";
import { getCategories } from "../../actions/categories";

function EditProducts({ onCancel, productId, onProductUpdated }) {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState(null);

  const [state, action, isPending] = useActionState(
    async (prevState, formData) => await editProduct(prevState, formData, productId),
    { fieldData: null }
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const [categoryRes, productRes] = await Promise.all([
        getCategories(),
        fetchSingleProduct(productId),
      ]);

      if (categoryRes?.success) setCategories(categoryRes.data);
      if (productRes?.success) setProductData(productRes.data);
    };

    fetchInitialData();
  }, [productId]);

  useEffect(() => {
    if (state?.success && state.data) {
      onProductUpdated(state.data);
      onCancel(); 
    }
  }, [state, onProductUpdated, onCancel]);

  if (!productData) return null;

  return (
    <ProductsPopup
      title="Edit Book"
      categories={categories}
      state={state}
      action={action}
      isPending={isPending}
      onCancel={onCancel}
      defaultData={productData}
    />
  );
}

export default EditProducts;
