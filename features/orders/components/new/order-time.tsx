import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrderTime() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Time</CardTitle>
        <CardDescription>How long did the repair take?</CardDescription>
      </CardHeader>
      <CardContent>
        <Input name="repair_time" type="text" />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
