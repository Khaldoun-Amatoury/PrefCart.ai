import { NextApiRequest, NextApiResponse } from "next";
import { loadProductData } from "../lib/productData";
import { getRecommendations } from "../lib/recommendationEngine";
import natural from "natural";
import { RecommendationProduct } from "../lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    intolerance,
    page = "1",
    limit = "20",
    productType = "safe",
  } = req.query;

  if (
    typeof intolerance !== "string" ||
    (productType !== "safe" && productType !== "unsafe")
  ) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  try {
    const products: RecommendationProduct[] = await loadProductData();
    console.log(`Total products loaded: ${products.length}`);

    const { safeProducts, unsafeProducts } = getRecommendations(
      products,
      intolerance
    );

    console.log(`Safe products: ${safeProducts.length}, Unsafe products: ${unsafeProducts.length}`);

    const targetProducts = productType === "safe" ? safeProducts : unsafeProducts;

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;

    const paginatedProducts = targetProducts.slice(startIndex, endIndex);

    res.status(200).json({
      totalProducts: targetProducts.length,
      currentPage: pageNumber,
      totalPages: Math.ceil(targetProducts.length / limitNumber),
      products: paginatedProducts,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
