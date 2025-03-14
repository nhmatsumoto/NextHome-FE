"use client";

import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { getSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";
import Link from "next/link";

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

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProperties = async () => {
      const session = await getSession();

      if (!session?.accessToken) {
        setLoading(false);
        return;
      }

      api.get("/property", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((response) => {
          setProperties(response.data);
        })
        .catch((error) => {
          // console.error("Erro ao buscar propriedades:", error);
        })
        .finally(() => setLoading(false));
    };

    fetchProperties();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-6">Lista de Imóveis</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <li key={property.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={property.photoUrls[0] || "/placeholder.jpg"}
              alt={property.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{property.title}</h2>
            <p className="text-gray-600">{property.description}</p>
            <p className="font-bold mt-2">¥{property.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">
              {property.bedrooms} quartos • {property.bathrooms} banheiros •{" "}
              {property.parkingSpaces} vagas
            </p>
            <p className="text-sm text-gray-500">
              {property.floorArea} m² • Construído em {property.yearBuilt}
            </p>
            <p>
              <Link href={`/property/${property.id}`}> Ver mais</Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
