import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderRepair() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Repair</CardTitle>
        <CardDescription>
          Explain what was done to fix the problem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea name="repair" />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
