import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecommendationProduct } from "../../../lib/types";
import { ProductCard } from "@/components/ProductCard";
import Image from "next/image";

interface ProductListProps {
  intolerance: string;
}

const ProductList: React.FC<ProductListProps> = ({ intolerance }) => {
  const [safeProducts, setSafeProducts] = useState<RecommendationProduct[]>([]);
  const [unsafeProducts, setUnsafeProducts] = useState<RecommendationProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [safePage, setSafePage] = useState(1);
  const [unsafePage, setUnsafePage] = useState(1);
  const [safeTotalPages, setSafeTotalPages] = useState(1);
  const [unsafeTotalPages, setUnsafeTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async (productType: "safe" | "unsafe") => {
      try {
        setLoading(true);
        const page = productType === "safe" ? safePage : unsafePage;
        const response = await axios.get(
          `/api/recommendations?intolerance=${intolerance}&page=${page}&limit=10&productType=${productType}`
        );
        if (productType === "safe") {
          setSafeProducts(response.data.products);
          setSafeTotalPages(response.data.totalPages);
        } else {
          setUnsafeProducts(response.data.products);
          setUnsafeTotalPages(response.data.totalPages);
        }
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${productType} products:`, error);
        setLoading(false);
      }
    };

    fetchProducts("safe");
    fetchProducts("unsafe");
  }, [intolerance, safePage, unsafePage]);

  const handlePageChange = (
    productType: "safe" | "unsafe",
    newPage: number
  ) => {
    if (productType === "safe") {
      setSafePage(newPage);
    } else {
      setUnsafePage(newPage);
    }
  };

  const renderProductList = (
    products: RecommendationProduct[],
    title: string,
    page: number,
    totalPages: number,
    productType: "safe" | "unsafe"
  ) => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {products.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productType === "safe"
              ? products.map((product) => (
                  <ProductCard
                    key={product.ProductName}
                    id={product.id}
                    name={product.ProductName}
                    priceInCents={product.Price * 100}
                    Brand={product.Brand}
                    imagePath={product.Image_Url}
                  />
                ))
              : products.map((product) => (
                  <li key={product.ProductName} className="border rounded p-4">
                    <div className="relative w-full h-72 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                    <Image
                      src={product.Image_Url}
                      alt={product.ProductName}
                      layout="fill"
                      objectFit="contain"
                      quality={100}
                      className="transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>
                  <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-2">{product.ProductName}</h3>
                  <p className="text-sm mb-1">Brand: {product.Brand}</p>
                  <p className="text-sm mb-1">Price: ${product.Price}</p>
                </div>
                  </li>
                ))}
          </ul>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handlePageChange(productType, page - 1)}
              disabled={page === 1}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(productType, page + 1)}
              disabled={page === totalPages}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No {productType} products found.</p>
      )}
    </div>
  );

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div>
      {renderProductList(
        safeProducts,
        "Safe Products",
        safePage,
        safeTotalPages,
        "safe"
      )}
      {renderProductList(
        unsafeProducts,
        "Products to Avoid",
        unsafePage,
        unsafeTotalPages,
        "unsafe"
      )}
    </div>
  );
};

export default ProductList;
