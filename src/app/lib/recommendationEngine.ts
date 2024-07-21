import natural from "natural";
import { RecommendationProduct } from "./types";

const TfIdf = natural.TfIdf;

function getKeywordsForIntolerance(intolerance: string): string[] {
  if (intolerance === "gluten") {
    return [
      "wheat", "barley", "rye", "oats", "gluten", "bread", "pasta", "cereal", "noodles",
    ];
  } else if (intolerance === "lactose") {
    return ["milk", "dairy", "cheese", "yogurt", "cream", "butter", "lactose"];
  }
  return [];
}

const foodCategories = [
  "Fruits & Vegetables",
  "Foodgrains, Oil & Masala",
  "Bakery, Cakes & Dairy",
  "Beverages",
  "Snacks & Branded Foods",
  "Eggs, Meat & Fish",
];

export function getRecommendations(
  products: RecommendationProduct[],
  intolerance: string
): { safeProducts: RecommendationProduct[]; unsafeProducts: RecommendationProduct[] } {
  const tfidf = new TfIdf();
  const keywords = getKeywordsForIntolerance(intolerance);

  console.log(`Intolerance: ${intolerance}, Keywords: ${keywords.join(', ')}`);

  // Filter only food products
  const foodProducts = products.filter((product) =>
    foodCategories.includes(product.Category)
  );

  console.log(`Total food products: ${foodProducts.length}`);

  // Add product descriptions to TF-IDF
  foodProducts.forEach((product, index) => {
    const description = `${product.ProductName} ${product.Category} ${product.SubCategory}`.toLowerCase();
    tfidf.addDocument(description);
  });

  // Calculate similarity scores and categorize products
  const safeProducts: RecommendationProduct[] = [];
  const unsafeProducts: RecommendationProduct[] = [];

  foodProducts.forEach((product, index) => {
    let score = 0;
    keywords.forEach((keyword) => {
      score += tfidf.tfidf(keyword, index);
    });
    
    console.log(`Product: ${product.ProductName}, Score: ${score}`);

    // Consider the product unsafe if the score is above a threshold
    if (score > 0.01) {  // Lowered threshold
      unsafeProducts.push(product);
    } else {
      safeProducts.push(product);
    }
  });

  console.log(`Safe products: ${safeProducts.length}, Unsafe products: ${unsafeProducts.length}`);

  return { safeProducts, unsafeProducts };
}