export interface PrismaProduct {
  id: string;
  name: string;
  Brand: string;
  priceInCents: number;
  imagePath: string;
  category: string;
  subcategory: string;
  quantity: number;
  isAvailableForPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecommendationProduct {
  id: string;
  ProductName: string;
  Price: number;
  Brand: string;
  Image_Url: string;
  Category: string;
  SubCategory: string;
}