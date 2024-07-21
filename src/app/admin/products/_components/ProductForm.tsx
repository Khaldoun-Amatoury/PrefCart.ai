"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [name, setName] = useState<string | undefined>(product?.name);
  const [brand, setBrand] = useState<string | undefined>(product?.Brand);
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );
  const [quantity, setQuantity] = useState<number | undefined>(product?.quantity);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<string | undefined>(product?.category);
  const [selectedSubcategoryValue, setSelectedSubcategoryValue] = useState<string | undefined>(product?.subcategory);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          value={name || ""}
          onChange={e => setName(e.target.value)}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents || ""}
          onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="Brand">Brand</Label>
        <Input
          type="text"
          id="Brand"
          name="Brand"
          required
          value={brand || ""}
          onChange={e => setBrand(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input 
          type="text"
          id="category"
          name="category"
          required
          value={selectedCategoryValue || ""}
          onChange={e => setSelectedCategoryValue(e.target.value)}/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subcategory">Subcategory</Label>
        <Input 
          type="text"
          id="subcategory"
          name="subcategory"
          required
          value={selectedSubcategoryValue || ""}
          onChange={e => setSelectedSubcategoryValue(e.target.value)}/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          required
          value={quantity || ""}
          onChange={(e) => setQuantity(Number(e.target.value) || undefined)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product.imagePath}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
