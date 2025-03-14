interface Address {
  id: number;
  street: string; // Rua (通り)
  city: string; // Cidade (市町村)
  prefecture: string; // Província (都道府県)
  postalCode: string; // Código postal (郵便番号)
  nearestStation: string; // Estação mais próxima (最寄り駅)
  minutesToStation: number; // Minutos até a estação (駅までの分数)
}