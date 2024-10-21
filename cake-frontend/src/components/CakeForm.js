import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CakeContext from "../context/CakeContext";

const CakeForm = ({ edit = false }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    addCake,
    updateCake,
    getCakeById,
    currentCake,
    loading,
    error: errorVal,
  } = useContext(CakeContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getCakeById(id);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (currentCake && edit) {
      setValue("name", currentCake.name);
      setValue("comment", currentCake.comment);
      setValue("imageUrl", currentCake.imageUrl);
      setValue("yumFactor", currentCake.yumFactor);
    }
    // eslint-disable-next-line
  }, [currentCake, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateCake(id, data);
      } else {
        await addCake(data);
      }
      navigate("/");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  //   if (errorVal) return <p className="text-red-500">{errorVal}</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Update Cake" : "Add a Cake"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name must be 50 characters or less",
              },
            })}
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("imageUrl", {
              required: "Image URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Image URL must be a valid URL",
              },
            })}
            type="text"
            placeholder="Image URL"
            className="border p-2 w-full"
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...register("comment", {
              required: "Comment is required",
              minLength: {
                value: 5,
                message: "Comment must be at least 5 characters long",
              },
              maxLength: {
                value: 200,
                message: "Comment must be 200 characters or less",
              },
            })}
            placeholder="Comment"
            className="border p-2 w-full"
          ></textarea>
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("yumFactor", {
              required: "Yum Factor is required",
              min: {
                value: 1,
                message: "Yum Factor must be at least 1",
              },
              max: {
                value: 5,
                message: "Yum Factor must be at most 5",
              },
              valueAsNumber: true,
            })}
            type="number"
            placeholder="Yum Factor (1-5)"
            className="border p-2 w-full"
          />
          {errors.yumFactor && (
            <p className="text-red-500">{errors.yumFactor.message}</p>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {id ? "Update Cake" : "Submit"}
        </button>
        {errorVal && <p className="text-red-500">{errorVal}</p>}
      </form>
    </div>
  );
};

export default CakeForm;
