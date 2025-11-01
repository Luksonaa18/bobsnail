"use client";

import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ProductFormInputs = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images?: File[]; // files to upload
};

interface AddProductFormProps {
  onAdd: (product: ProductFormInputs) => void;
}

const AddProductForm = ({ onAdd }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(acceptedFiles);
    setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const onSubmit = (data: ProductFormInputs) => {
    onAdd({ ...data, images });
    reset();
    setImages([]);
    setPreviews([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        {...register("name", { required: true })}
        placeholder="Name"
        {...(errors.name && (
          <span className="text-red-500">Name is required</span>
        ))}
        className="border p-2 rounded-lg"
      />
      <textarea
        {...register("description")}
        placeholder="Description"
        className="border p-2 rounded-lg"
        {...(errors.description && (
          <span className="text-red-500">Description is required</span>
        ))}
      />
      <input
        {...register("price", { valueAsNumber: true })}
        type="number"
        placeholder="Price"
        className="border p-2 rounded-lg"
        {...(errors.price && (
          <span className="text-red-500">Price is required</span>
        ))}
      />
      <input
        {...register("stock", { valueAsNumber: true })}
        type="number"
        placeholder="Stock"
        {...(errors.stock && (
          <span className="text-red-500">Stock is required</span>
        ))}
        className="border p-2 rounded-lg"
      />

      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:border-green-500"
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mt-4 flex gap-4 flex-wrap">
          {previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
