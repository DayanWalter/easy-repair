import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

export default function Export() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Data & Export</h2>
      <div className="space-y-4">
        <div>
          <Button variant="outline" className="mr-3">
            Export Products
          </Button>
          <Button variant="outline">Export Customers</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Export your data in CSV format for use in other applications.
        </p>
      </div>
    </Card>
  );
}
