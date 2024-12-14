import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrderTime({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Repair Time in Hours</CardTitle>
        <CardDescription>How long did the repair take?</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="number"
          step="0.01"
          id="repair_time"
          name="repair_time"
          defaultValue={order?.repair_time ?? ""}
          placeholder="Enter repair time"
        />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
