// import fs from "fs";
// import path from "path";
// import Papa from "papaparse";
// import { Product } from "./types";

// export function loadProductData(): Product[] {
//   const filePath = path.join(process.cwd(), "public", "BigBasket.csv");
//   const fileContent = fs.readFileSync(filePath, "utf8");

//   const { data } = Papa.parse<Product>(fileContent, {
//     header: true,
//     skipEmptyLines: true,
//     transformHeader: (header) => header.trim(),
//     transform: (value) => value.trim(),
//   });

//   return data;
// }

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
    ProductName: product.name,
    Price: product.priceInCents / 100,
    Brand: product.Brand,
    Image_Url: product.imagePath,
    Category: product.category,
    SubCategory: product.subcategory,
    // Map other fields as necessary
  };
}