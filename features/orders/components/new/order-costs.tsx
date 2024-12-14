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

export default function OrderCosts() {
  const [laborCosts, setLaborCosts] = useState(0);
  const [materialCosts, setMaterialCosts] = useState(0);
  const totalCosts = laborCosts + materialCosts;

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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Labor Costs</CardTitle>
          <CardDescription>What are the labor costs?</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            name="labor_costs"
            type="number"
            step="0.01"
            onChange={handleLaborCostsChange}
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
            onChange={handleMaterialCostsChange}
          />
        </CardContent>
        <CardFooter />
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Total Costs</CardTitle>
          <CardDescription>What are the total costs?</CardDescription>
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
