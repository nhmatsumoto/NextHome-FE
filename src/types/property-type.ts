interface Property {
    id: number
    title: string
    price: number
    description: string
    managementFee: number | null
    bedrooms: number
    bathrooms: number
    parkingSpaces: number
    floorArea: number
    yearBuilt: number
    type: string
    category: string
    photoUrls: string[]
}