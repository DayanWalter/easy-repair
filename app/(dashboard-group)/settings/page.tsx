"use client";

import { Card } from "@/components/ui/card";
import Avatar from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const [email, setEmail] = useState("user@example.com");
  const [name, setName] = useState("Max Mustermann");

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Profile</h2>
          <div className="mb-6 flex items-center gap-4">
            <Avatar />
            <Button variant="outline">Change Profile Picture</Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-md"
              />
            </div>
          </div>
        </Card>

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
      </div>
    </div>
  );
}
