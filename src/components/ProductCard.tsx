"use client";

import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  Brand: string;
  imagePath: string;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  Brand,
  imagePath,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, priceInCents, Brand, imagePath, quantity: 1 });
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:border-gray-300 bg-white">
      <div className="relative w-full h-72 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <Image
          src={imagePath}
          alt={name}
          layout="fill"
          objectFit="contain"
          quality={100}
          className="transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      </div>
      <CardHeader className="p-6 z-10">
        <CardTitle className="text-2xl font-semibold text-gray-900 tracking-tight transition-all duration-300 group-hover:text-3xl">
          {name}
        </CardTitle>
        <CardDescription className="text-xl font-medium text-gray-700 mt-2 transition-all duration-300 group-hover:text-gray-900">
          {formatCurrency(priceInCents / 100)}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-4 flex-grow">
        <p className="line-clamp-2 text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-800">
          {Brand}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          size="lg"
          className="w-full bg-customRed text-white font-medium py-3 rounded-full transition-all duration-300 transform group-hover:scale-105 group-hover:bg-red-700 relative overflow-hidden"
          onClick={handleAddToCart}
        >
          <span className="relative z-10 transition-all duration-300 group-hover:tracking-wider">
            Add to Cart
          </span>
          <span className="absolute inset-0 w-full h-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-10"></span>
        </Button>
      </CardFooter>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
