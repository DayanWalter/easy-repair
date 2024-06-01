"use client";
import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { format, setDate } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Metadata } from "next";
import { orders } from "@/database/orders";
import { customers } from "@/database/customers";

type Props = {
  params: {
    orderId: string;
  };
};

export default function Order({ params }: Props) {
  // Find order via params
  const initOrder = orders.find((o) => o.order_id === Number(params.orderId));
  // Search customer from initOrder via customer_id
  const comm = customers.find(
    (c) => c.customer_id === Number(initOrder?.order_customer_id),
  );
  const [order, setOrder] = React.useState(initOrder);
  // console.log(customer);
  console.log(order);

  const [getDate, setGetDate] = React.useState<Date>();
  const [doneDate, setDoneDate] = React.useState<Date>();
  const [pickupDate, setPickupDate] = React.useState<Date>();

  const handleVerifiedChange = () => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_verified: !prevOrder.order_verified,
        };
      }
      return prevOrder;
    });
  };
  const handleStateChange = (e: string) => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_state: e,
        };
      }
      return prevOrder;
    });
  };
  const handleAgainChange = () => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_again: !prevOrder.order_again,
        };
      }
      return prevOrder;
    });
  };
  const handleOldOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_old_order_id: e.target.value,
        };
      }
      return prevOrder;
    });
  };
  const handleAccountAccess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_account_access: e.target.value,
        };
      }
      return prevOrder;
    });
  };
  const handleAccountAccessMore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_account_access_more: e.target.value,
        };
      }
      return prevOrder;
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          [id]: value,
        };
      }
      return prevOrder;
    });
  };
  const handleSetGetDate = (e) => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_date_start: e,
        };
      }
      return prevOrder;
    });
  };
  const handleSetDoneDate = (e) => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_date_done: e,
        };
      }
      return prevOrder;
    });
  };
  const handleSetTakenDate = (e) => {
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          order_date_taken: e,
        };
      }
      return prevOrder;
    });
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setOrder((prevOrder) => {
      if (prevOrder) {
        return {
          ...prevOrder,
          [id]: value,
        };
      }
      return prevOrder;
    });
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              {/* Easy Repair Inc */}
              <Link
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Wrench className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Easy Repair Inc</span>
              </Link>
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              {/* Orders */}
              <Link
                href="/orders"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </Link>
              {/* Products */}
              <Link
                href="/products"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              {/* Customers */}
              <Link
                href="/customers"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
                Customers
              </Link>
              {/* Settings */}
              <Link
                href="/settings"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        {/* Breadcrumb */}
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/orders">Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/orders/${params.orderId}`}>
                  Order: {params.orderId}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              {/* Placeholder */}
              <Image
                src="/btc.png"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {/* Kunde - done*/}
            <Card className="" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Kunde</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Id: {comm?.customer_id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Input
                    type="name"
                    id="name"
                    placeholder={comm?.customer_name}
                    disabled
                  />
                  <Input
                    type="phone"
                    id="phone"
                    placeholder={comm?.customer_phone}
                    disabled
                  />
                  <Input
                    type="email"
                    id="email"
                    placeholder={comm?.customer_email}
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Auftragsnummer -done */}
            <Card className="" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Auftragsnummer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Input placeholder={String(order?.order_id)} disabled />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accepted"
                      checked={order?.order_verified}
                      onClick={handleVerifiedChange}
                    />
                    <label
                      htmlFor="accepted"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Auftrag erteilt
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Status - done*/}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Select onValueChange={handleStateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={order?.order_state} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="Annahme">Annahme</SelectItem>
                        <SelectItem value="Technik">Technik</SelectItem>
                        <SelectItem value="Technik wartend">
                          Technik wartend
                        </SelectItem>
                        <SelectItem value="Kunden anrufen">
                          Kunden anrufen
                        </SelectItem>
                        <SelectItem value="Gerät wird abgeholt">
                          Gerät wird abgeholt
                        </SelectItem>
                        <SelectItem value="Teile bestellt">
                          Teile bestellt
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="again"
                      checked={order?.order_again}
                      onClick={handleAgainChange}
                    />
                    <label
                      htmlFor="again"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Gerät erneut da
                    </label>
                  </div>
                  <Input
                    placeholder="Alte Auftragsnummer"
                    value={order?.order_old_order_id}
                    onChange={handleOldOrderId}
                  />
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Kommunikation */}
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="h-72 overflow-auto xl:col-span-2 "
            >
              <CardHeader className="pb-2">
                <CardTitle>Kommunikation</CardTitle>
                <CardDescription>
                  Dies ist der Kommunikationsverlauf
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>New message</Button>
                {/* Communication-table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead className="flex items-center justify-end">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Communication */}
                    {order?.order_communication.map((comm) => (
                      <TableRow key={comm.id}>
                        <TableCell>
                          <div className="text-sm font-medium md:inline">
                            {comm.message}
                          </div>
                          <div className="text-muted-foreground">
                            {comm.who}
                          </div>
                        </TableCell>
                        <TableCell className="flex items-center justify-end">
                          {comm.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Zugänge - done*/}
            <Card className="xl:col-span-1" x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Zugänge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <Label htmlFor="password">Passwort</Label>
                    <Input
                      id="password"
                      placeholder="Passwords"
                      value={order?.order_account_access}
                      onChange={handleAccountAccess}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accounts">Weitere</Label>
                    <Input
                      id="accounts"
                      placeholder="More"
                      value={order?.order_account_access_more}
                      onChange={handleAccountAccessMore}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Artikel - done*/}
            <Card className="xl:col-span-3" x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Artikel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div>
                    <Label htmlFor="order_article_device">Gerät</Label>
                    <Input
                      id="order_article_device"
                      onChange={handleInputChange}
                      value={order?.order_article_device}
                    />
                  </div>
                  <div>
                    <Label htmlFor="order_article_manufaturer">
                      Hersteller
                    </Label>
                    <Input
                      id="order_article_manufaturer"
                      onChange={handleInputChange}
                      value={order?.order_article_manufaturer}
                    />
                  </div>
                  <div>
                    <Label htmlFor="order_article_accessory">Zubehör</Label>
                    <Input
                      id="order_article_accessory"
                      onChange={handleInputChange}
                      value={order?.order_article_accessory}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Datum  - done*/}
            <Card className="" x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Datum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="date_start">Annahme</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !order?.order_date_start && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {order?.order_date_start ? (
                            format(order?.order_date_start, "PPP")
                          ) : (
                            <span>Angenommen am...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={order?.order_date_start}
                          onSelect={handleSetGetDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date_done">Fertiggestellt</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !order?.order_date_done && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {order?.order_date_done ? (
                            format(order?.order_date_done, "PPP")
                          ) : (
                            <span>Fertiggestellt am...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={order?.order_date_done}
                          onSelect={handleSetDoneDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date_taken">Abgeholt</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !order?.order_date_taken && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {order?.order_date_taken ? (
                            format(order?.order_date_taken, "PPP")
                          ) : (
                            <span>Abgeholt am...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={order?.order_date_taken}
                          onSelect={handleSetTakenDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Fehlerbeschreibung - done*/}
            <Card className="" x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Fehlerbeschreibung</CardTitle>
                <CardDescription>
                  Beschreiben Sie das aufgetretene Problem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="order_error_description"
                  onChange={handleTextareaChange}
                  value={order?.order_error_description}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Diagnose - done*/}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Diagnose</CardTitle>
                <CardDescription>
                  Geben Sie die Ursache des Problems an.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="order_diagnose"
                  onChange={handleTextareaChange}
                  value={order?.order_diagnose}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Angebot - done*/}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Angebot</CardTitle>
                <CardDescription>
                  Beschreiben Sie die vorgeschlagenen Maßnahmen und die Kosten.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="order_offer"
                  onChange={handleTextareaChange}
                  value={order?.order_offer}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Reparatur -done */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Reparatur</CardTitle>
                <CardDescription>
                  Erklären Sie, was zur Behebung des Problems unternommen wurde.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="order_offer"
                  onChange={handleTextareaChange}
                  value={order?.order_repair}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Anmerkungen */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Anmerkungen</CardTitle>
                <CardDescription>
                  Teilen Sie zusätzliche relevante Informationen mit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Mitarbeiter */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Mitarbeiter</CardTitle>
                <CardDescription>
                  Welcher Mitarbeiter hat den Auftrag erledigt?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Wählen Sie einen Mitarbeiter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="mitarbeiter1">Mitarbeiter1</SelectItem>
                      <SelectItem value="mitarbeiter2">Mitarbeiter2</SelectItem>
                      <SelectItem value="mitarbeiter3">Mitarbeiter3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Zeit */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Zeit</CardTitle>
                <CardDescription>
                  Wie lange hat die Reparatur gedauert?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Lohnkosten */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Lohnkosten</CardTitle>
                <CardDescription>Wie hoch sind die Lohnkosten?</CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="80.00€" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Materialkosten */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Materialkosten</CardTitle>
                <CardDescription>
                  Wie hoch sind die Materialkosten?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="120.00€" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Gesamtkosten */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Gesamtkosten</CardTitle>
                <CardDescription>
                  Wie hoch sind die Gesamtkosten?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input disabled placeholder="200.00€" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
          <Button
            size={"lg"}
            variant={"destructive"}
            className="max-w-[250px] justify-self-end"
          >
            Change order
          </Button>
        </div>
      </main>
    </div>
  );
}
