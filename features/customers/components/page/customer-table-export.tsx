import React from "react";

// Global Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { CustomerTable } from "@/features/customers";

import ExportCustomerButton from "./export-customer-button";
export default function CustomerTableExport({
  customers,
}: {
  customers: Database["public"]["Tables"]["customers"]["Row"][];
}) {
  return (
    <Tabs defaultValue="customers">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <ExportCustomerButton customers={customers} />
        </div>
      </div>

      <TabsContent value="customers">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Customers</CardTitle>
            <CardDescription>Overview of your customers.</CardDescription>
          </CardHeader>
          <CardContent>
            {customers && customers.length > 0 ? (
              <CustomerTable customers={customers ?? []} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No customers found</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>No customers have been created yet.</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
