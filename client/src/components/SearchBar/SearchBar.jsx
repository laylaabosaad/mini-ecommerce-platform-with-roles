import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchByName } from "../../../actions/products";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(null);
 
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const debounceTimeout = useRef(null);
  const location = useLocation();

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setProducts(null);
      setError("");
      return;
    }

    setError("");
    try {
      const res = await searchByName(query.trim());
      if (res.success) {
        setProducts(res.data.products || []);
      } else {
        setError(res.message || "Error during search");
        setProducts(null);
      }
    } catch (err) {
      setError("Network or server error");
      setProducts(null);
    } 
  }, [query]);


  useEffect(() => {
    if (!query.trim()) {
      setProducts(null);
      setError("");
      return;
    }

    debounceTimeout.current && clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(debounceTimeout.current);
  }, [query, handleSearch]);


  useEffect(() => {
    setProducts(null);
    setQuery("");
  }, [location.pathname]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setProducts(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-1/2 p-4 relative" ref={containerRef}>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
         
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls="search-results-dropdown"
        />
      
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {products && (
        <div
          id="search-results-dropdown"
          role="listbox"
          className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-96 overflow-auto z-20"
        >
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              Products ({products.length})
            </h3>
            {products.length === 0 ? (
              <p className="mb-4">No products found.</p>
            ) : (
              <ul className="mb-6 space-y-3 max-h-60 overflow-auto pr-2">
                {products.map(({ _id, name, author, price }) => (
                  <li
                    key={_id}
                    className="border p-3 rounded flex items-center gap-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <Link to={`/products/${_id}`} className="flex items-center gap-4 w-full">
                      <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-gray-600">Author: {author}</p>
                        <p className="text-sm font-bold">${price}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
