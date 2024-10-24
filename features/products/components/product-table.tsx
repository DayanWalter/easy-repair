"use client";
import type { Product } from "@/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function ProductTable({ products }: { products: Product[] }) {
	const router = useRouter();
	const handleClick = (product: Product) => {
		router.push(`/products/${product.id}`);
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead className="hidden sm:table-cell">Beschreibung</TableHead>
					<TableHead className="hidden sm:table-cell">Preis</TableHead>
					<TableHead className="hidden md:table-cell">Lagerbestand</TableHead>
					<TableHead className="hidden md:table-cell">Kategorie</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products?.map((product) => (
					<TableRow
						key={product.id}
						onClick={() => handleClick(product)}
						className="group-hover:bg-muted/50 transition-colors cursor-pointer"
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
