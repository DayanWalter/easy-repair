import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrderCustomer({
  customer,
}: {
  customer: Database["public"]["Tables"]["customers"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Customer</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Customer No.: {customer?.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Input
            type="text"
            id="name"
            value={customer?.name || ""}
            placeholder="No name available"
            disabled
            autoComplete="off"
          />
          <Input
            type="tel"
            id="phone"
            value={customer?.phone || ""}
            placeholder="No phone number available"
            disabled
            autoComplete="off"
          />
          <Input
            type="email"
            id="email"
            value={customer?.email || ""}
            placeholder="No email available"
            disabled
            autoComplete="off"
          />
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
