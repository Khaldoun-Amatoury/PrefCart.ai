import db from "@/db/db";
import { cache } from "@/lib/cache";

export const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      Brand: true,
      priceInCents: true,
      imagePath: true,
      category: true,
      subcategory: true,
      quantity: true,
      isAvailableForPurchase: true,
    }
  });
}, ["/products", "getProducts"]);