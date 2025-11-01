"use client";
import { useForm } from "react-hook-form";

interface Product {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface UpdateFormProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
}

const UpdateForm = ({ product, onUpdate }: UpdateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl || "",
    },
  });

  const onSubmit = (data: Product) => {
    onUpdate({ ...data, _id: product._id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        {...(register("name"), { required: true })}
        {...(errors.name && (
          <span className="text-red-500">Name is required</span>
        ))}
        placeholder="Name"
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
        {...(errors.price && (
          <span className="text-red-500">Price is required</span>
        ))}
        className="border p-2 rounded-lg"
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
      <input
        {...register("imageUrl")}
        placeholder="Image URL"
        {...(errors.imageUrl && (
          <span className="text-red-500">Image URL is required</span>
        ))}
        className="border p-2 rounded-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateForm;
