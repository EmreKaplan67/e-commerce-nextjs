"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";
import { Product } from "@/app/generated/prisma/client";
import Image from "next/image";

export function ProductForm({ product }: { product?: Product }) {
  const [error, action] = useActionState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <form action={action} className="w-full max-w-2xl mx-auto">
      <div className="space-y-8">
        {/* Form Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add Product
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Fill in the details below to create a new product
          </p>
        </div>

        {/* Product Name */}
        <div className="space-y-3">
          <Label
            htmlFor="name"
            className="text-base font-semibold text-gray-900 dark:text-gray-100"
          >
            Product Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            autoComplete="off"
            required
            className="h-10 px-4 py-2 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            defaultValue={product?.name || ""}
          />
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>

        {/* Price */}
        <div className="space-y-3">
          <Label
            htmlFor="priceInCents"
            className="text-base font-semibold text-gray-900 dark:text-gray-100"
          >
            Price
          </Label>
          <div className="relative">
            <Input
              type="number"
              id="priceInCents"
              name="priceInCents"
              placeholder="0"
              autoComplete="off"
              required
              value={priceInCents ?? ""}
              min={1}
              max={99999999}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isNaN(v) || v <= 0) {
                  setPriceInCents(undefined);
                } else {
                  setPriceInCents(v > 99999999 ? 99999999 : Math.floor(v));
                }
              }}
              className="h-10 px-4 py-2 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Formatted Price:
            </span>
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {formatCurrency((priceInCents || 0) / 100)}
            </span>
          </div>
          {error.priceInCents && (
            <div className="text-destructive">{error.priceInCents}</div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3">
          <Label
            htmlFor="description"
            className="text-base font-semibold text-gray-900 dark:text-gray-100"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter detailed product description"
            required
            className="min-h-32 px-4 py-2 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            defaultValue={product?.description || ""}
          />
          {error.description && (
            <div className="text-destructive">{error.description}</div>
          )}
        </div>

        {/* File & Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product File */}
          <div className="space-y-3">
            <Label
              htmlFor="file"
              className="text-base font-semibold text-gray-900 dark:text-gray-100"
            >
              Product File
            </Label>
            <div className="relative">
              <Input
                type="file"
                id="file"
                name="file"
                required={product == null}
                className="h-10 px-3 border border-gray-300 rounded-md 
             file:px-3 file:py-1 file:bg-blue-100 file:text-blue-700 
             file:border-0 file:rounded-md cursor-pointer"
              />
              {product != null && (
                <div className="text-muted-foreground">{product.filePath}</div>
              )}
              {error.file && (
                <div className="text-destructive">{error.file}</div>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload the product file (PDF, ZIP, etc.)
            </p>
          </div>

          {/* Product Image */}
          <div className="space-y-3">
            <Label
              htmlFor="image"
              className="text-base font-semibold text-gray-900 dark:text-gray-100"
            >
              Product Image
            </Label>
            <div className="relative">
              <Input
                type="file"
                id="image"
                name="image"
                required={product == null}
                className="h-10 px-3 border border-gray-300 rounded-md 
             file:px-3 file:py-1 file:bg-blue-100 file:text-blue-700 
             file:border-0 file:rounded-md cursor-pointer"
              />
              {product != null && (
                <Image
                  src={product.imagePath}
                  height="400"
                  width="400"
                  alt="Product Image"
                />
              )}
              {error.image && (
                <div className="text-destructive">{error.image}</div>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload a product image (JPG, PNG, WebP)
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex pt-6 border-t border-gray-200 dark:border-gray-800">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" type="submit" size="lg" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
