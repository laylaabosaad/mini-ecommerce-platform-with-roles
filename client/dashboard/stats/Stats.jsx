import { useEffect, useState } from "react";
import { fetchStats } from "../../actions/stats";

function Stats() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalInventory: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      const result = await fetchStats();
      if (result.error) {
        setError(result.error);
      } else {
        setStats(result.stats);
      }
      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading) return <div className="min-h-[100px] flex items-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h2 className="text-xl font-semibold">Total Products</h2>
        <p className="text-3xl mt-2 text-blue-600">{stats.totalProducts}</p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h2 className="text-xl font-semibold">Total Categories</h2>
        <p className="text-3xl mt-2 text-green-600">{stats.totalCategories}</p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-4 text-center">
        <h2 className="text-xl font-semibold">Total Inventory</h2>
        <p className="text-3xl mt-2 text-purple-600">{stats.totalInventory}</p>
      </div>
    </div>
  );
}

export default Stats;
