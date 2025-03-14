"use client";

import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { PropertyFormData } from "@/schemas/propertySchema";

interface AddressFormProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
}

export default function AddressForm({ register, errors }: AddressFormProps) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md col-span-2">
      <h2 className="text-lg font-semibold mb-2">Endereço (住所)</h2>

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
        {errors.address?.prefecture && <p className="text-red-500 text-sm">{errors.address.prefecture.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Código Postal (郵便番号):</label>
        <input {...register("address.postalCode")} className="w-full border p-2 rounded-md" />
        {errors.address?.postalCode && <p className="text-red-500 text-sm">{errors.address.postalCode.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Estação Mais Próxima (最寄り駅):</label>
        <input {...register("address.nearestStation")} className="w-full border p-2 rounded-md" />
        {errors.address?.nearestStation && <p className="text-red-500 text-sm">{errors.address.nearestStation.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Minutos até a Estação (駅までの分数):</label>
        <input type="number" {...register("address.minutesToStation", { valueAsNumber: true })} className="w-full border p-2 rounded-md" />
        {errors.address?.minutesToStation && <p className="text-red-500 text-sm">{errors.address.minutesToStation.message}</p>}
      </div>
    </div>
  );
}
