"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormData } from "@/schemas/propertySchema";
import api from "@/services/apiClient";
import { useSession } from "next-auth/react";
import AddressForm from "../../../../components/forms/AddressForm";

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
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                });

                const property = response.data;

                // Preenche os campos do formulário com os dados existentes
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
            alert(JSON.stringify(data));
            await api.put(`/property/${propertyId}`, data, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });

            alert("Propriedade atualizada com sucesso!");
            router.push("/"); 
        } catch (error) {
            console.error("Erro ao atualizar imóvel:", error);
            alert("Erro ao atualizar o imóvel. Tente novamente.");
        }
    };

    if (loading) return <p className="text-center mt-10">Carregando...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Editar Imóvel (物件の編集)
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

                {/* Botão de atualização */}
                <div className="col-span-2">
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-green-700 transition duration-200"
                >
                    Atualizar (更新)
                </button>
                </div>
            </form>
        </div>
    );
}
