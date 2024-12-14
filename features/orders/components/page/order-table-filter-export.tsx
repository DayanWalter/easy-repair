"use client";

import React, { useState } from "react";
import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

import OrderTable from "@/components/order-table";
import {
  filterOrdersByState,
  type FilterState,
} from "@/utils/filterOrderByState";

import ExportButton from "@/components/export-button";

export default function OrderTableFilterExport({
  orders,
}: {
  orders: Database["public"]["Tables"]["orders"]["Row"][];
}) {
  const [filters, setFilters] = useState<FilterState>({
    open: true,
    inProgress: true,
    completed: true,
    billed: true,
  });

  return (
    <>
      <Tabs defaultValue="orders">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filters.open}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, open: checked }))
                  }
                >
                  Open
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.inProgress}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, inProgress: checked }))
                  }
                >
                  In Progress
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.completed}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, completed: checked }))
                  }
                >
                  Completed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.billed}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({ ...prev, billed: checked }))
                  }
                >
                  Billed
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ExportButton orders={filterOrdersByState(orders, filters)} />
          </div>
        </div>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Overview of your orders.</CardDescription>
            </CardHeader>
            <CardContent>
              {orders && orders.length > 0 ? (
                <OrderTable orders={filterOrdersByState(orders, filters)} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No orders found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>No orders have been created yet.</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
