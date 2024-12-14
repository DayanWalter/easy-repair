"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function OrderStatus({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  const [state, setState] = useState(order?.state || "");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Select name="state" value={state} onValueChange={setState}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Billed">Billed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Checkbox
              id="again"
              name="again"
              defaultChecked={order?.again ?? false}
            />
            <Label
              htmlFor="again"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Device returned
            </Label>
          </div>
          <Label htmlFor="old_order_id">Previous Order Number</Label>
          <Input
            name="old_order_id"
            id="old_order_id"
            defaultValue={order?.old_order_id ?? ""}
            placeholder="Previous order number"
          />
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
