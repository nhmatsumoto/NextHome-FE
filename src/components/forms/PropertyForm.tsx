"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormData } from "@/schemas/propertySchema";
import api from "@/services/apiClient";
import { useSession } from "next-auth/react";
import ImageUploader from "@/components/ui/ImageUploader";
import CustomCurrencyInput from "../ui/CurrencyInput";
import AddressForm from "./AddressForm";

export default function PropertyForm () {

  const { data: session } = useSession();
  
  const { 
    control, 
    register, 
    handleSubmit, 
    formState: { errors } } = useForm<PropertyFormData>({ resolver: zodResolver(propertySchema),
  });

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {

      const response = await api.post("/property", data, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });


      alert("Imóvel cadastrado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar imóvel:", error);
      alert("Erro ao cadastrar o imóvel. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        
        {/* Componente de Upload de Imagem */}
        {/* <ImageUploader onImageUpload={() => {}} /> */}

        {/* Formulário de Cadastro */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 className="text-xl font-semibold mb-4 col-span-2">Cadastro de Imóvel (物件の登録)</h2>

            <div>
              <label className="block text-gray-700">Título do imóvel (物件タイトル):</label>
              <input type="text" {...register("title")} className="w-full border p-2 rounded-md" />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Descrição (物件説明):</label>
              <textarea {...register("description")} className="w-full border p-2 rounded-md" />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Preço (価格):</label>
              <CustomCurrencyInput name="price" control={control} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Taxa de administração (管理費):</label>
              <CustomCurrencyInput name="managementFee" control={control} />
              {/* <input type="number" step="0.01" {...register("managementFee", { valueAsNumber: true })} className="w-full border p-2 rounded-md" /> */}
            </div>

            <div>
              <label className="block text-gray-700">Depósito (敷金):</label>
              <CustomCurrencyInput name="depositShikikin" control={control} />
              {/* <input type="number" step="0.01" {...register("depositShikikin", { valueAsNumber: true })} className="w-full border p-2 rounded-md" /> */}
            </div>

            <div>
              <label className="block text-gray-700">Luvas (礼金):</label>
              <input type="number" step="0.01" {...register("keyMoneyReikin", { valueAsNumber: true })} className="w-full border p-2 rounded-md" />
            </div>

            <div>
              <label className="block text-gray-700">Número de quartos (寝室数):</label>
              <input type="number" {...register("bedrooms", { valueAsNumber: true })} className="w-full border p-2 rounded-md" />
            </div>

            <div>
              <label className="block text-gray-700">Número de banheiros (バスルーム数):</label>
              <input type="number" {...register("bathrooms", { valueAsNumber: true })} className="w-full border p-2 rounded-md" />
            </div>

            <div>
              <label className="block text-gray-700">Área total (面積):</label>
              <input type="number" step="0.01" {...register("floorArea", { valueAsNumber: true })} className="w-full border p-2 rounded-md" />
            </div>

            {/* Campos do endereço */}
            <AddressForm register={register} errors={errors} />

            <div className="col-span-2 mt-4">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Enviar (送信)
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
