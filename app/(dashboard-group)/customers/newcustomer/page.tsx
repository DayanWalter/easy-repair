"use client";
import * as React from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { customers } from "@/database/customers";
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import Avatar from "@/components/avatar/avatar";

export default function NewCustomer() {
  const customerId = customers.length;

  const [newCustomer, setNewCustomer] = React.useState({
    customer_id: customerId,
    customer_name: "",
    customer_adress: "",
    customer_phone: "",
    customer_email: "",
    customer_reg_date: Date.now(),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewCustomer((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  console.log(newCustomer);
  const breadcrumbItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/customers", label: "Customers" },
    { href: "/customers/newcustomer", label: "New Customer" },
  ];
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* Sheet */}

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Search */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        {/* Avatar and dropdown */}
        <Avatar />
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid xl:grid-cols-2">
            {/* Kunde */}
            <Card className="" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Customer</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Id: {customerId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="customer_name">Name</Label>
                  <Input
                    type="text"
                    id="customer_name"
                    placeholder="John Doe"
                    defaultValue={newCustomer.customer_name}
                    onChange={handleChange}
                  />

                  <Label htmlFor="customer_phone">Phone</Label>
                  <Input
                    type="text"
                    id="customer_phone"
                    placeholder="65865"
                    defaultValue={newCustomer.customer_phone}
                    onChange={handleChange}
                  />

                  <Label htmlFor="customer_adress">Adress</Label>
                  <Input
                    type="text"
                    id="customer_adress"
                    placeholder="Eberwaldstr. 78"
                    defaultValue={newCustomer.customer_adress}
                    onChange={handleChange}
                  />

                  <Label htmlFor="customer_email">Email</Label>
                  <Input
                    type="email"
                    id="customer_email"
                    placeholder="John@Doe.com"
                    defaultValue={newCustomer.customer_email}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Create Customer</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
