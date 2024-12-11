"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import React from "react";

export default function OrderDetails({
	order,
}: {
	order: Database["public"]["Tables"]["orders"]["Row"];
}) {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/orders/${order.id}`);
	};
	return (
		<CardContent className="p-6 text-sm">
			<div className="grid gap-3">
				<div className="flex items-center justify-between">
					<div className="font-semibold">Order Details</div>
					<Button variant="outline" size="sm" onClick={handleClick}>
						Details anzeigen
					</Button>
				</div>
				<ul className="grid gap-3">
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Lohnkosten</span>
						<span>{(order.labor_costs ?? 0).toFixed(2)}€</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Materialkosten</span>
						<span>{(order.material_costs ?? 0).toFixed(2)}€</span>
					</li>

					{/* Weitere Details hier */}
				</ul>
				<Separator className="my-2" />
				<ul className="grid gap-3">
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">Subtotal</span>
						<span>{(order.total_costs ?? 0).toFixed(2)}€</span>
					</li>
					<li className="flex items-center justify-between">
						<span className="text-muted-foreground">19% Steuern</span>
						<span>{((order.total_costs ?? 0) * 0.19).toFixed(2)}€</span>
					</li>

					<li className="flex items-center justify-between font-semibold">
						<span className="text-muted-foreground">Total</span>
						<span>{((order.total_costs ?? 0) * 1.19).toFixed(2)}€</span>
					</li>
				</ul>
			</div>
		</CardContent>
	);
}
