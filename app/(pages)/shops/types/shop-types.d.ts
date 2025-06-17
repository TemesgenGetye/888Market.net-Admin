export interface ShopStats {
  totalSales: number
  salesTrend: number
  ordersCount: number
  ordersTrend: number
  customersCount: number
  customersTrend: number
  productsTrend: number
}

export interface ShopVerificationDocuments {
  businessRegistration: string
  idVerification: string
  taxInformation: string
  uploadDate: string
}

export interface ShopType {
  id: string
  name: string
  owner: string
  email: string
  phone: string
  description: string
  address: string
  logo?: string
  coverImage?: string
  category: string
  status: string
  verificationStatus: string
  verificationDocuments: ShopVerificationDocuments
  joinedDate: string
  rating: number
  productsCount: number
  commissionRate: number
  stats: ShopStats
}
