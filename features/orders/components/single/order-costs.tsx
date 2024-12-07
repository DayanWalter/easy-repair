"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrderCosts({
	order,
}: { order: Database["public"]["Tables"]["orders"]["Row"] }) {
	const [laborCosts, setLaborCosts] = useState(order.labor_costs || 0);
	const [materialCosts, setMaterialCosts] = useState(order.material_costs || 0);
	const [totalCosts, setTotalCosts] = useState(order.total_costs || 0);

	useEffect(() => {
		setTotalCosts(laborCosts + materialCosts);
	}, [laborCosts, materialCosts]);

	const handleLaborCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLaborCosts(Number.parseFloat(e.target.value) || 0);
	};

	const handleMaterialCostsChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setMaterialCosts(Number.parseFloat(e.target.value) || 0);
	};

	const formattedTotalCosts = `${totalCosts.toFixed(2)} €`;

	return (
		<>
			{/* Lohnkosten */}
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Lohnkosten</CardTitle>
					<CardDescription>
						Wie hoch sind die gesamten Lohnkosten?
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Input
						name="labor_costs"
						type="number"
						step="0.01"
						value={laborCosts}
						onChange={handleLaborCostsChange}
					/>
				</CardContent>
				<CardFooter />
			</Card>
			{/* Materialkosten */}
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Materialkosten</CardTitle>
					<CardDescription>Wie hoch sind die Materialkosten?</CardDescription>
				</CardHeader>
				<CardContent>
					<Input
						name="material_costs"
						type="number"
						step="0.01"
						value={materialCosts}
						onChange={handleMaterialCostsChange}
					/>
				</CardContent>
				<CardFooter />
			</Card>
			{/* Gesamtkosten */}
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Gesamtkosten</CardTitle>
					<CardDescription>
						Wie hoch sind die Gesamtkosten für diesen Auftrag?
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Input
						name="total_costs_display"
						type="text"
						value={formattedTotalCosts}
						disabled
					/>
					<input type="hidden" name="total_costs" value={totalCosts} />
				</CardContent>
				<CardFooter />
			</Card>
		</>
	);
}