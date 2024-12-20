"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function OrderFindCustomer() {
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [customersLoading, setCustomersLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<
    Database["public"]["Tables"]["customers"]["Row"][]
  >([]);
  const selectedCustomer = customers.find(
    (customer) => customer.name === customerName,
  );
  const supabase = createClient();
  useEffect(() => {
    const fetchCustomers = async () => {
      setCustomersLoading(true);
      const { data, error } = await supabase.from("customers").select("*");
      if (error) {
        setError(`Could not fetch customers, Reason: ${error.message}`);
        setCustomers([]);
        return;
      }
      if (data) {
        setCustomers(data);
        setError(null);
      }
      setCustomersLoading(false);
    };
    fetchCustomers();
  }, [supabase]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Customer</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Customer No.: {selectedCustomer?.id || "-"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {customerName
                  ? customers.find((customer) => customer.name === customerName)
                      ?.name
                  : "Select customer..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[252px] p-0">
              <Command>
                <CommandInput placeholder="Search customers..." />
                <CommandList>
                  <CommandEmpty>No customer found.</CommandEmpty>
                  <CommandGroup>
                    {customers.map((customer) => (
                      <CommandItem
                        key={customer.name}
                        value={customer.name ?? ""}
                        onSelect={(currentCustomerName) => {
                          setCustomerName(
                            currentCustomerName === customerName
                              ? ""
                              : currentCustomerName,
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            customerName === customer.name
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {customer.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Input
            type="tel"
            id="phone"
            value={selectedCustomer?.phone ?? ""}
            placeholder="No customer selected"
            disabled
          />
          <Input
            type="email"
            id="email"
            value={selectedCustomer?.email ?? ""}
            placeholder="No customer selected"
            disabled
          />
        </div>
      </CardContent>
      <CardFooter>
        <input
          type="hidden"
          name="customer_id"
          value={selectedCustomer?.id ?? ""}
        />
      </CardFooter>
    </Card>
  );
}
