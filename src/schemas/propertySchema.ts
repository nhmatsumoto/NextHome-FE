import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  prefecture: z.string().min(2, "Província deve ter pelo menos 2 caracteres"),
  postalCode: z.string().regex(/^\d{3}-\d{4}$/, "Código postal deve estar no formato 123-4567"),
  nearestStation: z.string().min(2, "Nome da estação deve ter pelo menos 2 caracteres"),
  minutesToStation: z.number().min(1, "Tempo até a estação deve ser pelo menos 1 minuto"),
});

export const propertySchema = z.object({
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  price: z.number().min(0, "Preço deve ser positivo"),
  managementFee: z.number().optional(),
  depositShikikin: z.number().optional(),
  keyMoneyReikin: z.number().optional(),
  bedrooms: z.number().min(0, "Deve ter pelo menos 0 quartos"),
  bathrooms: z.number().min(0, "Deve ter pelo menos 0 banheiros"),
  floorArea: z.number().min(0, "Área deve ser maior que 0"),
  address: addressSchema, // Add endereço ao schema
});

export type PropertyFormData = z.infer<typeof propertySchema>;
