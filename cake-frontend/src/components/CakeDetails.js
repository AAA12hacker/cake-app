import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CakeContext from "../context/CakeContext";

const CakeDetails = () => {
  const { getCakeById, currentCake, loading, error } = useContext(CakeContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCakeById(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (!currentCake) return <p className="text-center">Cake not found</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">
        {currentCake.name}
      </h1>
      <img
        src={currentCake.imageUrl}
        alt={currentCake.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-lg text-gray-700 mb-4">{currentCake.comment}</p>
      <p className="font-semibold text-xl">
        Yum Factor: {currentCake.yumFactor}
      </p>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Cakes
        </button>
      </div>
    </div>
  );
};

export default CakeDetails;
