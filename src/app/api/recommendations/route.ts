import { NextResponse } from "next/server";
import { loadProductData } from "@/app/lib/productData";
import { getRecommendations } from "@/app/lib/recommendationEngine";
import { RecommendationProduct } from "@/app/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const intolerance = searchParams.get("intolerance");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const productType = searchParams.get("productType");

  if (!intolerance || (productType !== "safe" && productType !== "unsafe")) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  try {
    const products: RecommendationProduct[] = await loadProductData();
    const { safeProducts, unsafeProducts } = getRecommendations(
      products,
      intolerance
    );

    const targetProducts = productType === "safe" ? safeProducts : unsafeProducts;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProducts = targetProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      totalProducts: targetProducts.length,
      currentPage: page,
      totalPages: Math.ceil(targetProducts.length / limit),
      products: paginatedProducts,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}