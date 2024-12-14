import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/features/orders/components/new";

export default function OrderDate() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Date</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="date_start">Received</Label>
            <DatePicker name="date_start" label="Received on..." />
          </div>
          <div>
            <Label htmlFor="date_done">Completed</Label>
            <DatePicker name="date_done" label="Completed on..." />
          </div>
          <div>
            <Label htmlFor="date_taken">Picked up</Label>
            <DatePicker name="date_taken" label="Picked up on..." />
          </div>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
