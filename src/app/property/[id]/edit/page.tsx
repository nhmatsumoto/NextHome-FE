"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormData } from "@/schemas/propertySchema";
import api from "@/services/apiClient";
import { useSession } from "next-auth/react";
import AddressForm from "../../../../components/forms/AddressForm";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditProperty() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id: propertyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  useEffect(() => {
    if (!propertyId) {
      setError("ID da propriedade não fornecido.");
      setLoading(false);
      return;
    }

    async function fetchProperty() {
      try {
        const response = await api.get(`/property/${propertyId}`, {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        });

        const property = response.data;

        Object.keys(property).forEach((key) => {
          setValue(key as keyof PropertyFormData, property[key]);
        });

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar propriedade:", error);
        setError("Erro ao carregar os dados da propriedade.");
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId, session, setValue]);

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {
      await api.put(`/property/${propertyId}`, data, {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      });

      alert("✅ Propriedade atualizada com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);
      alert("⚠️ Erro ao atualizar o imóvel. Tente novamente.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">⏳ 読み込み中...</p>; // "Carregando..."
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 🔙 Botão de Voltar */}
      <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-600 transition">
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>一覧に戻る</span> {/* "Voltar para a lista" */}
      </Link>

      {/* 🏠 Título */}
      <h2 className="text-3xl font-semibold text-gray-900 text-center mt-4">物件の編集</h2> {/* "Editar Imóvel" */}

      {/* 📋 Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-xl p-6 mt-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 🏡 Título do Imóvel */}
          <div className="col-span-2">
            <label className="block text-gray-700">物件タイトル:</label>
            <input
              type="text"
              {...register("title")}
              className="w-full border p-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="例: モダンアパートメント"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* 📝 Descrição */}
          <div className="col-span-2">
            <label className="block text-gray-700">物件説明:</label>
            <textarea
              {...register("description")}
              className="w-full border p-3 rounded-md h-28 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="物件の特徴を説明してください..."
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* 💰 Preço */}
          <div>
            <label className="block text-gray-700">価格:</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="w-full border p-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="¥"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          {/* 📉 Taxa de Administração */}
          <div>
            <label className="block text-gray-700">管理費:</label>
            <input
              type="number"
              {...register("managementFee", { valueAsNumber: true })}
              className="w-full border p-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="¥"
            />
          </div>

          {/* 🛏 Número de Quartos */}
          <div>
            <label className="block text-gray-700">寝室数:</label>
            <input
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
              className="w-full border p-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1~5"
            />
          </div>

          {/* 🚿 Número de Banheiros */}
          <div>
            <label className="block text-gray-700">バスルーム数:</label>
            <input
              type="number"
              {...register("bathrooms", { valueAsNumber: true })}
              className="w-full border p-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="1~3"
            />
          </div>

          {/* 📏 Área Total */}
          <div className="col-span-2">
            <label className="block text-gray-700">面積:</label>
            <input
              type="number"
              {...register("floorArea", { valueAsNumber: true })}
              className="w-full border p-3 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="m²"
            />
          </div>

          {/* 📍 Endereço */}
          <div className="col-span-2">
            <AddressForm register={register} errors={errors} />
          </div>

          {/* ✅ Botão de Atualização */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-semibold flex justify-center items-center space-x-2 hover:bg-green-700 transition duration-200"
            >
              <Save className="w-5 h-5" />
              <span>更新する</span> {/* "Atualizar" */}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
