import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductsCard from "../components/Products/ProductsCard";
import { fetchProductsByCategory } from "../../actions/products";
import Pagination from "../components/Products/Pagination";

function ProductsPerCategory() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState("All Books");
  const limit = 10;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setErrorMsg("");

      const result = await fetchProductsByCategory(
        categoryId,
        currentPage,
        limit
      );
      if (result.success) {
        setProducts(result.data);
        setTotalPages(result.pagination?.totalPages || 1);
        setCategoryName(result.categoryName || "All Books");
      } else {
        setProducts([]);
        setErrorMsg(result.message);
      }

      setLoading(false);
    };

    loadProducts();
  }, [categoryId, currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col gap-6 p-6  w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="title">{categoryName}</h1>
      </div>

      <div
        style={{ minHeight: "500px" }}
        className="flex flex-wrap gap-6 w-full justify-center lg:justify-start min-h-[200px]"
      >
        {loading ? (
          <p>Loading products...</p>
        ) : errorMsg ? (
          <p className="text-red-500">{errorMsg}</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <ProductsCard
              key={product._id}
              title={product.name}
              price={product.price}
              author={product.author}
              img={product.imageUrl}
              id={product._id}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

export default ProductsPerCategory;
