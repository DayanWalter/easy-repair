import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Email() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="emailNotifications" />
          <Label htmlFor="emailNotifications">Email Notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="marketingEmails" />
          <Label htmlFor="marketingEmails">Marketing Emails</Label>
        </div>
      </div>
    </Card>
  );
}
