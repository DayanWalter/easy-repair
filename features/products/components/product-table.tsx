"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function ProductTable({
  products,
}: {
  products: Database["public"]["Tables"]["products"]["Row"][];
}) {
  const router = useRouter();
  const handleClick = (
    product: Database["public"]["Tables"]["products"]["Row"],
  ) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Description</TableHead>
          <TableHead className="hidden sm:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Stock</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow
            key={product.id}
            onClick={() => handleClick(product)}
            className="cursor-pointer transition-colors group-hover:bg-muted/50"
          >
            <TableCell>
              <div className="font-medium">{product.name}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {product.description}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {product.price?.toFixed(2)} €
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {product.stock}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {product.category}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
