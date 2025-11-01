// components/admin/ImageUploader.tsx
"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  initialImages?: string[]; // URLs from server
  onChange: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImages = [],
  onChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialImages);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onChange(acceptedFiles); // pass new files to parent
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  useEffect(() => {
    // Generate previews for new files
    if (files.length > 0) {
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(filePreviews);
    } else {
      // If no new files, show initial images from server
      setPreviews(initialImages);
    }

    // Clean up object URLs when component unmounts or files change
    return () => {
      previews.forEach((src) => {
        if (src.startsWith("blob:")) {
          URL.revokeObjectURL(src);
        }
      });
    };
  }, [files, initialImages]);

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:border-green-500 transition-colors"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag & drop images here, or click to select files</p>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 flex gap-4 flex-wrap">
          {previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
