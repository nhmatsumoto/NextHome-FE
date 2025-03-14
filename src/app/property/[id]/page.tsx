"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/apiClient";
import { getSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";

interface Property {
  id: number;
  title: string;
  price: number;
  description: string;
  managementFee: number | null;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  floorArea: number;
  yearBuilt: number;
  type: string;
  category: string;
  photoUrls: string[];
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchProperty = async () => {
            const session = await getSession();

            if (!session?.accessToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/property/${id}`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
                });
                setProperty(response.data);
            } catch (error) {
                console.error("Erro ao buscar propriedade:", error);
                setProperty(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

  if (loading) return <Loader />;
  if (!property) return <p className="text-center text-gray-500">Imóvel não encontrado.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-6">{property.title}</h1>
      <div className="max-w-2xl mx-auto border rounded-lg p-4 shadow-md">
        <img
          src={property.photoUrls[0] || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <p className="text-gray-600 mt-4">{property.description}</p>
        <p className="font-bold text-xl mt-2">¥{property.price.toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-2">
          {property.bedrooms} quartos • {property.bathrooms} banheiros • {property.parkingSpaces} vagas
        </p>
        <p className="text-sm text-gray-500">
          {property.floorArea} m² • Construído em {property.yearBuilt}
        </p>
      </div>
    </div>
  );
}
