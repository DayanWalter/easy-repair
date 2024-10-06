import Link from "next/link";
import { File, ListFilter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { customers } from "@/database/customers";
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import Avatar from "@/components/avatar/avatar";

export default function Customers() {
  const breadcrumbItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/customers", label: "Customers" },
  ];
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
          <div className="grid xl:grid-cols-4">
            {/* Your customers */}
            <Card className="" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Customers</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/customers/newcustomer">
                  <Button>Create New Customer</Button>
                  <span className="sr-only">Create new customer</span>
                </Link>
              </CardFooter>
            </Card>
          </div>
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
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          {/* Table */}
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Customers</CardTitle>
              <CardDescription>These are your customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Phone
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Street
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Added
                    </TableHead>
                    <TableHead className="text-right">Edit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Customer */}
                  {customers.map((customer) => (
                    <TableRow key={customer.customer_id}>
                      <TableCell>
                        <div className="font-medium">
                          {customer.customer_name}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {customer.customer_email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.customer_phone}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.customer_adress}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {customer.customer_reg_date}
                      </TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <Link href={`/customers/${customer.customer_id}`}>
                          <Button size="sm">Edit</Button>
                          <span className="sr-only">Edit</span>
                        </Link>

                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
