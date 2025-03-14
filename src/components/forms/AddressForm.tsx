"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PropertyFormData } from "@/schemas/propertySchema";

interface AddressFormProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
}

export default function AddressForm({ register, errors }: AddressFormProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Endereço (住所)</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Rua (通り):</label>
          <input {...register("address.street")} className="w-full border p-2 rounded-md" />
          {errors.address?.street && <p className="text-red-500 text-sm">{errors.address.street.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Cidade (市町村):</label>
          <input {...register("address.city")} className="w-full border p-2 rounded-md" />
          {errors.address?.city && <p className="text-red-500 text-sm">{errors.address.city.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Província (都道府県):</label>
          <input {...register("address.prefecture")} className="w-full border p-2 rounded-md" />
        </div>

        <div>
          <label className="block text-gray-700">Código Postal (郵便番号):</label>
          <input {...register("address.postalCode")} className="w-full border p-2 rounded-md" />
        </div>
      </div>
    </div>
  );
}
