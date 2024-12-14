"use client";

import { useState } from "react";
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
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  const [laborCostsInput, setLaborCostsInput] = useState(
    order.labor_costs?.toString() ?? "",
  );
  const [materialCostsInput, setMaterialCostsInput] = useState(
    order.material_costs?.toString() ?? "",
  );

  const parseInput = (value: string) =>
    value === "" ? 0 : Number.parseFloat(value) || 0;

  const totalCosts =
    parseInput(laborCostsInput) + parseInput(materialCostsInput);

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Labor Costs</CardTitle>
          <CardDescription>What are the total labor costs?</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            name="labor_costs"
            type="number"
            step="0.01"
            value={laborCostsInput}
            onChange={(e) => setLaborCostsInput(e.target.value)}
            placeholder="Labor costs"
          />
        </CardContent>
        <CardFooter />
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Material Costs</CardTitle>
          <CardDescription>What are the material costs?</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            name="material_costs"
            type="number"
            step="0.01"
            value={materialCostsInput}
            onChange={(e) => setMaterialCostsInput(e.target.value)}
            placeholder="Material costs"
          />
        </CardContent>
        <CardFooter />
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Total Costs</CardTitle>
          <CardDescription>
            What are the total costs for this order?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            name="total_costs_display"
            type="text"
            value={`${totalCosts.toFixed(2)} €`}
            disabled
          />
          <input type="hidden" name="total_costs" value={totalCosts} />
        </CardContent>
        <CardFooter />
      </Card>
    </>
  );
}
