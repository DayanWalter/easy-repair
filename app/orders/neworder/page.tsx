import Image from "next/image";
import Link from "next/link";
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
import { CommunicationTable } from "@/components/communication-table";

export default function NewOrder() {
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
                <Link href="/orders/neworder">New Order</Link>
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
                src="/placeholder-user.jpg"
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
            {/* Kunde */}
            <Card className="xl:row-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Kunde</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Id: 123456
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Input
                    type="name"
                    id="name"
                    placeholder="John Doe"
                    disabled
                  />
                  <Input type="phone" id="phone" placeholder="65865" disabled />
                  <Input
                    type="email"
                    id="email"
                    placeholder="John@Doe.com"
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Kunden suchen</Button>
              </CardFooter>
            </Card>
            {/* Auftraggeber */}
            <Card className="" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Auftraggeber</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Input />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Auftrag erteilt
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Status */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Wählen Sie einen Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="status1">Status1</SelectItem>
                        <SelectItem value="status2">Status2</SelectItem>
                        <SelectItem value="status3">Status3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Gerät erneut da
                    </label>
                  </div>
                  <Input placeholder="Alte Auftragsnummer" />
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Kommunikation */}
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="xl:col-span-2 xl:row-span-2"
            >
              <CardHeader className="pb-2">
                <CardTitle>Kommunikation</CardTitle>
                <CardDescription>
                  Dies ist der Kommunikationsverlauf
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommunicationTable />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Artikel */}
            <Card className="xl:col-span-2" x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Artikel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="device">Gerät</Label>
                    <Input id="device" />
                  </div>
                  <div>
                    <Label htmlFor="manufacturer">Hersteller</Label>
                    <Input id="manufacturer" />
                  </div>
                  <div>
                    <Label htmlFor="accessory">Zubehör</Label>
                    <Input id="accessory" />
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Zugänge */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Zugänge</CardTitle>
                <CardDescription>This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            {/* Datum */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Datum</CardTitle>
                <CardDescription>This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            {/* Fehlerbeschreibung */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Fehlerbeschreibung</CardTitle>
                <CardDescription>
                  Beschreiben Sie das aufgetretene Problem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Diagnose */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Diagnose</CardTitle>
                <CardDescription>
                  Geben Sie die Ursache des Problems an.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Angebot */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Angebot</CardTitle>
                <CardDescription>
                  Beschreiben Sie die vorgeschlagenen Maßnahmen und die Kosten.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            {/* Reparatur */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Reparatur</CardTitle>
                <CardDescription>
                  Erklären Sie, was zur Behebung des Problems unternommen wurde.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea />
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
                <CardDescription>This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            {/* Zeit */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Zeit</CardTitle>
                <CardDescription>This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            {/* Lohnkosten */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Lohnkosten</CardTitle>
                <CardDescription>This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            {/* Materialkosten */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Materialkosten</CardTitle>
                <CardDescription>This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            {/* Gesamtkosten */}
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardTitle>Gesamtkosten</CardTitle>
                <CardDescription>This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
