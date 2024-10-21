import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CakeContext = createContext();

export const CakeProvider = ({ children }) => {
  const [cakes, setCakes] = useState([]);
  const [currentCake, setCurrentCake] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const APP_URL = process.env.REACT_APP_URL;

  const getCakes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${APP_URL}/cakes`);
      setCakes(res.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch cakes");
    } finally {
      setLoading(false);
    }
  };

  const getCakeById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${APP_URL}/cakes/${id}`);
      setCurrentCake(res.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch cake");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addCake = async (cakeData) => {
    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log(userData, userData.token);
      const res = await axios.post(`${APP_URL}/cakes`, cakeData, {
        headers: {
          Authorization: `Bearer ${userData["token"]}`,
        },
      });
      setCakes([...cakes, res.data]);
      setError(null);
    } catch (error) {
      console.log({
        error1: error.response?.data?.message,
        error2: error.response,
      });
      setError(error.response?.data?.message || "Failed to add cake");
      throw error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const updateCake = async (id, updatedCakeData) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log(userData, userData.token);
      const res = await axios.put(`${APP_URL}/cakes/${id}`, updatedCakeData, {
        headers: {
          Authorization: `Bearer ${userData["token"]}`,
        },
      });
      setCakes(cakes.map((cake) => (cake._id === id ? res.data : cake)));
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update cake");
      throw error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  const deleteCake = async (id) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log(userData, userData.token);
      await axios.delete(`${APP_URL}/cakes/${id}`, {
        headers: {
          Authorization: `Bearer ${userData["token"]}`,
        },
      });
      setCakes(cakes.filter((cake) => cake._id !== id));
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete cake");
      throw error.response?.data;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCakes();
    // eslint-disable-next-line
  }, []);

  return (
    <CakeContext.Provider
      value={{
        cakes,
        currentCake,
        loading,
        error,
        getCakes,
        getCakeById,
        addCake,
        updateCake,
        deleteCake,
      }}
    >
      {children}
    </CakeContext.Provider>
  );
};

export default CakeContext;
