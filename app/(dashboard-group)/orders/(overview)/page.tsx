import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Features
import { readOrders } from "@/features/orders";
import Header from "@/components/header/header";
import OrderTableFilterExport from "@/features/orders/components/page/order-table-filter-export";

export default async function Orders() {
  const breadcrumbItems = [{ href: "/orders", label: "Orders" }];
  const orders: Database["public"]["Tables"]["orders"]["Row"][] =
    await readOrders();

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid xl:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Your Orders</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Overview of all orders. Check status or create new orders.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/orders/neworder">
                  <Button>Create Order</Button>
                  <span className="sr-only">Create Order</span>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <OrderTableFilterExport orders={orders} />
        </div>
      </main>
    </>
  );
}
