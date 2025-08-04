import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { fetchAllProducts } from "../../actions/products";
import ProductsCard from "../components/Products/ProductsCard";
import AddProducts from "../../dashboard/products/AddProducts";
import Pagination from "../components/Products/Pagination";
import SuccessPopup from "../components/PopUp/SuccessPopup";

function Home() {
  const { role } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletedProductTitle, setDeletedProductTitle] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const result = await fetchAllProducts(currentPage, 10);
      if (result.success) {
        setProducts(result.data);
        setTotalPages(result.pagination?.totalPages || 1);
      } else {
        console.error(result.message);
        setProducts([]);
      }
      setLoading(false);
    };

    loadProducts();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const closeSuccessPopup = () => {
    setDeletedProductTitle(null);
  };

  return (
    <div className="flex w-full  flex-col gap-6 p-6">
      <div className="flex justify-between w-full items-center">
        <h1 className="title">All Books</h1>
        {role === "admin" && (
          <button onClick={() => setShowModal(true)} className="btn-primary">
            Add New Book
          </button>
        )}
      </div>

      <div
        style={{ minHeight: "500px" }}
        className="flex w-full  lg:justify-start justify-center flex-wrap gap-6"
      >
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductsCard
              key={product._id}
              title={product.name}
              price={product.price}
              author={product.author}
              img={product.imageUrl}
              id={product._id}
              onDeleted={(deletedId, deletedTitle) => {
                setDeletedProductTitle(deletedTitle);
                setProducts((prev) => prev.filter((p) => p._id !== deletedId));
              }}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {showModal && (
        <AddProducts
          onCancel={() => setShowModal(false)}
          onProductAdded={(newProduct) =>
            setProducts((prev) => [...prev, newProduct])
          }
        />
      )}
      {deletedProductTitle && (
        <SuccessPopup
          title={deletedProductTitle}
          onCancel={closeSuccessPopup}
        />
      )}
    </div>
  );
}

export default Home;
