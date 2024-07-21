'use client';

import { useState } from 'react';
import { ProductCard } from "./ProductCard";
import { SearchBar } from "@/app/(customerFacing)/_components/SearchBar";

interface Product {
  id: string;
  name: string;
  Brand: string;
  priceInCents: number;
  imagePath: string;
  category: string;
  subcategory: string;
  quantity: number;
  isAvailableForPurchase: boolean;
}

export function ProductsList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.Brand.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}