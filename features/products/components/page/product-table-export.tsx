import React from "react";
import Link from "next/link";
import { File, ListFilter } from "lucide-react";

// Global Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import ProductTable from "@/features/products/components/product-table";
import { readProducts } from "@/features/products";
import Header from "@/components/header/header";
import ExportProductButton from "./export-product-button";

export default function ProductTableExport({
  products,
}: {
  products: Database["public"]["Tables"]["products"]["Row"][];
}) {
  return (
    <Tabs defaultValue="products">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <ExportProductButton products={products} />
        </div>
      </div>
      <TabsContent value="products">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Your product catalog at a glance. Easily add, edit, and organize
              your items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {products && products.length > 0 ? (
              <ProductTable products={products ?? []} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No products found</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>No products have been created yet.</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
