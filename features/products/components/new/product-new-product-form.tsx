"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import createProduct from "../../api/createProduct";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import convertFormDataForProduct from "../../utils/convertFormDataForProduct";

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

export default function NewProductForm() {
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

    const { success } = await createProduct(formData);
    if (success) {
      toast({
        title: "Product Created",
        description: "Product was successfully created",
      });
      router.push("/products");
      router.refresh();
    }
  };

  return (
    <form action={handleFormAction}>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid xl:grid-cols-2">
            <Card className="" x-chunk="dashboard-05-chunk-0">
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
                  />

                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Product description"
                  />

                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    id="price"
                    step="0.01"
                    name="price"
                    placeholder="Product price"
                  />

                  <Label htmlFor="category">Category</Label>
                  <Input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Product category"
                  />

                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    type="number"
                    id="stock"
                    step="1"
                    name="stock"
                    placeholder="Product stock"
                  />

                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    type="text"
                    id="sku"
                    name="sku"
                    placeholder="Product SKU"
                  />

                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    placeholder="Product manufacturer"
                  />

                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Create Product</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </form>
  );
}
