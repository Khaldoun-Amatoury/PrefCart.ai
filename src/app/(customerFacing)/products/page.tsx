import { Suspense } from "react";
import { ProductsList } from "@/components/ProductList";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <h1 className="text-3xl font-semibold ml-40 mt-10">Products</h1>
      <div className="mx-36 my-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList initialProducts={products} />
        </Suspense>
      </div>
    </>
  );
}
