"use client";

import { useState } from 'react';


interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setUploadedImages((prev) => [...prev, imageUrl]);
      setSelectedImage(imageUrl);
      onImageUpload(imageUrl);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setSelectedImage(newImages.length > 0 ? newImages[0] : null);
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Exibe a imagem clicada no preview
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <div className="flex gap-4">
        
        {/* Área de Preview */}
        <div className="w-3/4">
          <div className="border border-gray-300 rounded-md p-4 h-80 flex items-center justify-center">
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="max-h-full rounded-md cursor-pointer" />
            ) : (
              <span className="text-gray-500">プレビュー (Preview)</span>
            )}
          </div>

          {/* Botão de Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4 w-full border border-gray-300 rounded-md p-2 cursor-pointer"
          />
        </div>

        {/* Lista de Imagens com Scroll */}
        <div className="w-1/4 overflow-y-auto max-h-80 flex flex-col gap-2 border border-gray-300 rounded-md p-2">
          {uploadedImages.length === 0 && (
            <p className="text-gray-500 text-sm text-center">画像なし (Nenhuma imagem)</p>
          )}

          {uploadedImages.map((image, index) => (
            <div key={index} className="relative group cursor-pointer" onClick={() => handleSelectImage(image)}>
              <img src={image} alt={`Imagem ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
              
              {/* Botão de Excluir */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Impede que o clique no botão selecione a imagem
                  handleRemoveImage(index);
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                X
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
