"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormData } from "@/schemas/propertySchema";
import api from "@/services/apiClient";
import { useSession } from "next-auth/react";
import AddressForm from "./AddressForm";

export default function PropertyForm() {
  const { data: session } = useSession();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
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
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Cadastro de Imóvel (物件の登録)
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Título */}
        <div className="col-span-2">
          <label className="block text-gray-700">Título do imóvel (物件タイトル):</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border p-3 rounded-md"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Descrição */}
        <div className="col-span-2">
          <label className="block text-gray-700">Descrição (物件説明):</label>
          <textarea
            {...register("description")}
            className="w-full border p-3 rounded-md h-28"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Preço */}
        <div>
          <label className="block text-gray-700">Preço (価格):</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="w-full border p-3 rounded-md"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Taxa de administração */}
        <div>
          <label className="block text-gray-700">Taxa de administração (管理費):</label>
          <input
            type="number"
            step="0.01"
            {...register("managementFee", { valueAsNumber: true })}
            className="w-full border p-3 rounded-md"
          />
        </div>

        {/* Depósito */}
        <div>
          <label className="block text-gray-700">Depósito (敷金):</label>
          <input
            type="number"
            step="0.01"
            {...register("depositShikikin", { valueAsNumber: true })}
            className="w-full border p-3 rounded-md"
          />
        </div>

        {/* Luvas */}
        <div>
          <label className="block text-gray-700">Luvas (礼金):</label>
          <input
            type="number"
            step="0.01"
            {...register("keyMoneyReikin", { valueAsNumber: true })}
            className="w-full border p-3 rounded-md"
          />
        </div>

        {/* Número de quartos */}
        <div>
          <label className="block text-gray-700">Número de quartos (寝室数):</label>
          <input
            type="number"
            {...register("bedrooms", { valueAsNumber: true })}
            className="w-full border p-3 rounded-md"
          />
        </div>

        {/* Número de banheiros */}
        <div>
          <label className="block text-gray-700">Número de banheiros (バスルーム数):</label>
          <input
            type="number"
            {...register("bathrooms", { valueAsNumber: true })}
            className="w-full border p-3 rounded-md"
          />
        </div>

        {/* Área total */}
        <div className="col-span-2">
          <label className="block text-gray-700">Área total (面積):</label>
          <input
            type="number"
            step="0.01"
            {...register("floorArea", { valueAsNumber: true })}
            className="w-full border p-3 rounded-md"
          />
        </div>

        {/* Campos do endereço */}
        <div className="col-span-2">
          <AddressForm register={register} errors={errors} />
        </div>

        {/* Botão de envio */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Enviar (送信)
          </button>
        </div>
      </form>
    </div>
  );
}
