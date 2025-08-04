import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../actions/products";
import { UserContext } from "../../context/UserContext";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { role, authenticated } = useContext(UserContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const result = await fetchSingleProduct(id);

      if (result.success) {
        setProduct(result.data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);
  if (loading) return <p className="text-center py-10 min-h-[80vh]">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="w-full min-h-screen px-4 py-10 flex flex-col lg:flex-row lg:items-start items-center justify-center gap-8 lg:gap-12">
      <div className="w-full lg:w-1/4 flex justify-center lg:justify-end">
        <img
          className="w-60 h-auto lg:w-full object-contain rounded-lg shadow-md"
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://m.media-amazon.com/images/I/21cOE-lrhBL._UF1000,1000_QL80_.jpg";
          }}
        />
      </div>

      <div className="lg:w-1/3 w-[80%] flex flex-col gap-5 text-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-md text-gray-600">By {product.author}</p>
          <p className="text-lg font-bold text-slate-700">${product.price}</p>
        </div>
        <p className="text-sm text-justify text-gray-700 ">
          {product.description || "No additional description available."}
        </p>
        {(role === "user" || !authenticated) && (
          <button className="btn-primary w-fit px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
