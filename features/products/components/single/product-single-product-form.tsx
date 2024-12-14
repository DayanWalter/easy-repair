"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import updateProduct from "../../api/updateProduct";
import { redirect, useRouter } from "next/navigation";
import deleteProduct from "../../api/deleteProduct";
import { useToast } from "@/hooks/use-toast";
import convertFormDataForProduct from "../../utils/convertFormDataForProduct";
import { z } from "zod";
import ProductDeleteSheet from "./product-delete-sheet";
const productSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
  price: z
    .number({ message: "Price is required" })
    .min(0, "Price must be greater than or equal to 0"),
  stock: z
    .number({ message: "Stock is required" })
    .int("Stock must be a whole number")
    .min(0, "Stock must be greater than or equal to 0"),
});
export default function SingleProductForm({
  product,
  params,
}: {
  product: Database["public"]["Tables"]["products"]["Row"];
  params: { productId: string };
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleFormAction = async (formData: FormData) => {
    const productData = convertFormDataForProduct(formData);
    const result = productSchema.safeParse(productData);

    if (!result.success) {
      for (const issue of result.error.issues) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: issue.message,
        });
      }
      return;
    }
    const action = formData.get("action");

    if (action === "update") {
      const { data, error } = await updateProduct(params.productId, formData);
      if (data && data.length > 0) {
        toast({
          title: "Product Updated",
          description: "Product was successfully updated",
        });
        router.push("/products");
        router.refresh();
      }
      if ((data && data.length === 0) || error) {
        toast({
          variant: "destructive",
          title: "Product Not Updated",
          description: "Error updating product",
        });
      }
    }
  };

  return (
    <form action={handleFormAction}>
      <CardHeader className="pb-3">
        <CardTitle>Product</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Product name"
            defaultValue={product?.name}
          />

          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Product description"
            defaultValue={product?.description || ""}
          />

          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            step="0.01"
            name="price"
            placeholder="Product price"
            defaultValue={product?.price || 0}
          />

          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            id="category"
            name="category"
            placeholder="Product category"
            defaultValue={product?.category || ""}
          />

          <Label htmlFor="stock">Stock</Label>
          <Input
            type="number"
            id="stock"
            step="1"
            name="stock"
            placeholder="Product stock"
            defaultValue={product?.stock || 0}
          />

          <Label htmlFor="sku">SKU</Label>
          <Input
            type="text"
            id="sku"
            name="sku"
            placeholder="Product SKU"
            defaultValue={product?.sku || ""}
          />

          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            type="text"
            id="manufacturer"
            name="manufacturer"
            placeholder="Product manufacturer"
            defaultValue={product?.manufacturer || ""}
          />

          <Label htmlFor="image">Image URL</Label>
          <Input
            type="text"
            id="image"
            name="image"
            placeholder="https://example.com/image.jpg"
            defaultValue={product?.image || ""}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" name="action" value="update">
          Update Product
        </Button>
        <ProductDeleteSheet productId={product.id} />
      </CardFooter>
    </form>
  );
}
