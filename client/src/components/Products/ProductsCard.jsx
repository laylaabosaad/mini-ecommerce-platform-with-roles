import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditProducts from "../../../dashboard/products/EditProducts";
import { UserContext } from "../../../context/UserContext";
import DeletePopup from "../PopUp/DeletePopup";
import { softDeleteProduct } from "../../../actions/products";

function ProductsCard({ title, price, author, img, id, onDeleted }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [productData, setProductData] = useState({ title, price, author, img });
  const { role } = useContext(UserContext);

  useEffect(() => {
    setProductData({ title, price, author, img });
  }, [title, price, author, img]);

  const handleProductUpdate = (updatedProduct) => {
    setProductData({
      title: updatedProduct.name,
      price: updatedProduct.price,
      author: updatedProduct.author,
      img: updatedProduct.imageUrl,
    });
    setShowEdit(false);
  };

  const handleDelete = async () => {
    const result = await softDeleteProduct(id);
    if (result.success) {
      setShowDeletePopup(false);
      setDeleteError("");
      if (onDeleted) onDeleted(id, productData.title);
    } else {
      setDeleteError(result.message || "Failed to delete product");
    }
  };

  return (
    <>
      <div className="rounded-lg shadow-md flex w-[250px] h-[400px] flex-col hover:shadow-lg transition p-2">
        <Link to={`/products/${id}`} className="block">
          <div className="w-full h-[200px] mt-2">
            <img
              src={productData.img}
              alt={productData.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://m.media-amazon.com/images/I/21cOE-lrhBL._UF1000,1000_QL80_.jpg";
              }}
            />
          </div>

          <div className="p-4 text-start flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-gray-800">
              {productData.title}
            </h2>
            <p className="text-xs text-gray-600">{productData.author}</p>
            <p className="text-sm text-slate-700 font-bold">${productData.price}</p>
          </div>
        </Link>

        {role === "admin" && (
          <div className="flex justify-evenly items-center mt-2">
            <button
              onClick={() => setShowEdit(true)}
              className="rounded border px-2 py-1 w-[100px] hover:bg-slate-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setDeleteError("");
                setShowDeletePopup(true);
              }}
              className="rounded border px-2 py-1 w-[100px] hover:bg-red-100 text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {showEdit && (
        <EditProducts
          productId={id}
          onCancel={() => setShowEdit(false)}
          onProductUpdated={handleProductUpdate}
        />
      )}

      {showDeletePopup && (
        <DeletePopup
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={handleDelete}
          errorMessage={deleteError}
          title="product"
        />
      )}
    </>
  );
}

export default ProductsCard;
