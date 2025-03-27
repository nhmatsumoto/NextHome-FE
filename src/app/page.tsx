"use client";

import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { getSession } from "next-auth/react";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import { BedDouble, Bath, Car, Ruler, Calendar, Eye, Edit3 } from "lucide-react";

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

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const session = await getSession();
      if (!session?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/property", {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        setProperties(response.data);
      } catch (error) {
        console.error("Erro ao buscar propriedades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-6">
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
              <img
                src={property.photoUrls[0] || "/placeholder.jpg"}
                alt={property.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900">{property.title}</h2>
                <p className="text-gray-600 mt-1 text-sm">{property.description}</p>

                <div className="mt-4">
                  <p className="text-xl font-semibold text-indigo-600">¥{property.price.toLocaleString()}</p>
                  {property.managementFee && (
                    <p className="text-sm text-gray-500">管理費: ¥{property.managementFee.toLocaleString()}</p> // "Management Fee"
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-gray-700 text-sm">
                  <span className="flex items-center space-x-1">
                    <BedDouble className="w-5 h-5 text-indigo-500" />
                    <span>{property.bedrooms} 部屋</span> {/* "Bedrooms" */}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Bath className="w-5 h-5 text-blue-500" />
                    <span>{property.bathrooms} バス</span> {/* "Bathrooms" */}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Car className="w-5 h-5 text-gray-500" />
                    <span>{property.parkingSpaces} 駐車場</span> {/* "Parking Spaces" */}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Ruler className="w-5 h-5 text-green-500" />
                    <span>{property.floorArea} m²</span> {/* "Floor Area" */}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <span>{property.yearBuilt} 年建築</span> {/* "Year Built" */}
                  </span>
                </div>

                <div className="mt-5 flex space-x-3">
                  <Link
                    href={`/property/${property.id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <Eye className="w-5 h-5" />
                    <span>詳細を見る</span> {/* "View Details" */}
                  </Link>
                  <Link
                    href={`/property/${property.id}/edit`}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    <Edit3 className="w-5 h-5" />
                    <span>編集</span> {/* "Edit" */}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-center text-gray-800">現在、利用可能な物件はありません。</h1> 
      )}
    </div>
  );
}
