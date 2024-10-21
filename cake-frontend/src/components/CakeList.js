import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CakeContext from "../context/CakeContext";

const CakeList = () => {
  const { cakes, getCakes, deleteCake, loading, error } =
    useContext(CakeContext);

  useEffect(() => {
    getCakes();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this cake?")) {
      deleteCake(id);
    }
  };

  if (loading) return <p>Loading cakes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Cakes</h1>
        <Link
          to="/add-cake"
          className="bg-green-500 text-white p-2 inline-block"
        >
          Add Cake
        </Link>
      </div>
      <div className="space-y-4">
        {cakes.map((cake) => (
          <div key={cake._id} className="border p-4 rounded flex items-center">
            {cake.imageUrl && (
              <img
                src={cake.imageUrl}
                alt={cake.name}
                className="w-16 h-16 rounded mr-4"
              />
            )}
            <div className="flex-grow">
              <Link to={`/cakes/${cake._id}`}>
                <h2 className="text-xl font-semibold">{cake.name}</h2>
                <p className="text-sm">{cake.comment}</p>
              </Link>
            </div>
            <div className="flex mt-2">
              <Link
                to={`/cakes/edit/${cake._id}`}
                className="text-blue-500 mr-4"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(cake._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CakeList;
