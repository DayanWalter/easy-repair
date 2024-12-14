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
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function OrderTable({
  orders,
}: {
  orders: Database["public"]["Tables"]["orders"]["Row"][];
}) {
  const router = useRouter();
  const handleClick = (
    order: Database["public"]["Tables"]["orders"]["Row"],
  ) => {
    router.push(`/orders/${order.id}`);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order No. / Customer No.</TableHead>
          <TableHead className="hidden sm:table-cell">Device</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Start Date</TableHead>
          <TableHead className="text-right">Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow
            key={order.id}
            onClick={() => handleClick(order)}
            className="cursor-pointer transition-colors group-hover:bg-muted/50"
          >
            <TableCell>
              <div className="font-medium">Order No.: {order.id}</div>
              <div className="text-sm text-muted-foreground md:inline">
                Customer No.: {order.customer_id}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {order.article_device}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge
                className="text-xs"
                variant={order.state === "Fulfilled" ? "secondary" : "outline"}
              >
                {order.state}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order.date_start
                ? format(new Date(order.date_start), "dd.MM.yyyy")
                : "N/A"}
            </TableCell>
            <TableCell className="text-right">
              {order.total_costs?.toFixed(2)} €
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
