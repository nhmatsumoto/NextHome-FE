"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/apiClient";
import { getSession } from "next-auth/react";
import Loader from "@/components/ui/loader";
import { BedDouble, Bath, Car, Ruler, Calendar, ArrowLeft, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
          headers: { Authorization: `Bearer ${session.accessToken}` },
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
  if (!property) return <p className="text-center text-gray-500 text-lg">物件が見つかりませんでした。</p>; // "Property not found."

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 🔙 Botão de Voltar */}
      <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-600 transition">
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>一覧に戻る</span> {/* "Back to list" */}
      </Link>

      {/* 🏡 Título do Imóvel */}
      <h1 className="text-3xl font-semibold text-gray-900 text-center mt-4">{property.title}</h1>

      {/* 📸 Imagem do Imóvel - Com Slider */}
      <div className="relative mt-6 max-w-4xl mx-auto">
        <Image
          src={property.photoUrls.length > 0 ? property.photoUrls[0] : "/placeholder.jpg"}
          alt={property.title}
          width={800}
          height={450}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
        {property.photoUrls.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
            {property.photoUrls.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentPhotoIndex ? "bg-indigo-600" : "bg-gray-400"}`}
                onClick={() => setCurrentPhotoIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🏠 Informações do Imóvel */}
      <div className="mt-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <p className="text-lg text-gray-700">{property.description}</p>

        <div className="mt-4 text-xl font-semibold text-indigo-600">
          ¥{property.price.toLocaleString()}
        </div>

        {property.managementFee && (
          <p className="text-sm text-gray-500">管理費: ¥{property.managementFee.toLocaleString()}</p> // "Management Fee"
        )}

        {/* 📋 Detalhes do Imóvel */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm">
          <div className="flex items-center space-x-2">
            <BedDouble className="w-5 h-5 text-indigo-500" />
            <span>{property.bedrooms} 部屋</span> {/* "Bedrooms" */}
          </div>
          <div className="flex items-center space-x-2">
            <Bath className="w-5 h-5 text-blue-500" />
            <span>{property.bathrooms} バス</span> {/* "Bathrooms" */}
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-5 h-5 text-gray-500" />
            <span>{property.parkingSpaces} 駐車場</span> {/* "Parking Spaces" */}
          </div>
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-green-500" />
            <span>{property.floorArea} m²</span> {/* "Floor Area" */}
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-yellow-500" />
            <span>{property.yearBuilt} 年建築</span> {/* "Year Built" */}
          </div>
        </div>

        {/* 📞 Botão de Contato */}
        <div className="mt-6 text-center">
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition">
            <Phone className="w-5 h-5" />
            <span>お問い合わせ</span> {/* "Contact Us" */}
          </button>
        </div>
      </div>
    </div>
  );
}
