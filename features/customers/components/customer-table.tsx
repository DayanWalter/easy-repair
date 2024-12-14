"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function CustomerTable({
  customers,
}: {
  customers: Database["public"]["Tables"]["customers"]["Row"][];
}) {
  const router = useRouter();
  const handleClick = (
    customer: Database["public"]["Tables"]["customers"]["Row"],
  ) => {
    router.push(`/customers/${customer.id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Email</TableHead>
          <TableHead className="hidden sm:table-cell">Phone</TableHead>
          <TableHead className="hidden md:table-cell">Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers?.map((customer) => (
          <TableRow
            key={customer.id}
            onClick={() => handleClick(customer)}
            className="cursor-pointer transition-colors group-hover:bg-muted/50"
          >
            <TableCell>
              <div className="font-medium">{customer.name}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {customer.email}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {customer.phone}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {customer.adress}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
