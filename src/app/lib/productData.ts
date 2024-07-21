import db from '@/db/db';
import { PrismaProduct, RecommendationProduct } from './types';

export async function loadProductData(): Promise<RecommendationProduct[]> {
  try {
    const products: PrismaProduct[] = await db.product.findMany();
    return products.map(convertPrismaProductToRecommendationProduct);
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

function convertPrismaProductToRecommendationProduct(product: PrismaProduct): RecommendationProduct {
  return {
    id: product.id,
    ProductName: product.name,
    Price: product.priceInCents / 100,
    Brand: product.Brand,
    Image_Url: product.imagePath,
    Category: product.category,
    SubCategory: product.subcategory,
  };
}