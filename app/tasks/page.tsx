"use client";

import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export type ProductFormInputs = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  newImages?: File[];       // files to upload
  existingImages?: string[]; // already uploaded images
};

interface AddProductFormProps {
  onAdd: (product: Omit<ProductFormInputs, "newImages"> & { images?: string[] }) => void;
  uploadToS3: (file: File) => Promise<string>;
}

const AddProductForm = ({ onAdd, uploadToS3 }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>();

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(acceptedFiles);
    setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const onSubmit = async (data: ProductFormInputs) => {
    setUploading(true);
    try {
      const imageUrls: string[] = await Promise.all(
        images.map((file) => uploadToS3(file))
      );

      onAdd({ ...data, images: imageUrls });

      reset();
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Failed to upload images. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        {...register("name", { required: true })}
        placeholder="Name"
        className="border p-2 rounded-lg"
      />
      {errors.name && <span className="text-red-500">Name is required</span>}

      <textarea
        {...register("description")}
        placeholder="Description"
        className="border p-2 rounded-lg"
      />
      {errors.description && <span className="text-red-500">Description is required</span>}

      <input
        {...register("price", { valueAsNumber: true, required: true })}
        type="number"
        placeholder="Price"
        className="border p-2 rounded-lg"
      />
      {errors.price && <span className="text-red-500">Price is required</span>}

      <input
        {...register("stock", { valueAsNumber: true, required: true })}
        type="number"
        placeholder="Stock"
        className="border p-2 rounded-lg"
      />
      {errors.stock && <span className="text-red-500">Stock is required</span>}

      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:border-green-500"
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>

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
        className={`px-4 py-2 rounded-lg text-white ${
          uploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
