import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function OrderNumber() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Order Number</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Input value="Will be assigned automatically" readOnly />
          <div className="flex items-center gap-2">
            <Checkbox id="verified" name="verified" />
            <label
              htmlFor="verified"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Order confirmed
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
