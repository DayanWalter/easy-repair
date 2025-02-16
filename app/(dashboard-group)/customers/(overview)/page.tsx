import Link from "next/link";

// Global Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { readCustomers } from "@/features/customers";

import Header from "@/components/header/header";
import CustomerTableExport from "@/features/customers/components/page/customer-table-export";

export default async function Customers() {
  const breadcrumbItems = [{ href: "/customers", label: "Customers" }];

  const customers = await readCustomers();

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid xl:grid-cols-4">
            <Card x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Customers</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Here you&apos;ll find a comprehensive overview of your
                  customer data.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/customers/newcustomer">
                  <Button>Create Customer</Button>
                  <span className="sr-only">Create Customer</span>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <CustomerTableExport customers={customers} />
        </div>
      </main>
    </>
  );
}
