import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderDiagnose({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Diagnosis</CardTitle>
        <CardDescription>What is the cause of the problem?</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          id="diagnose"
          name="diagnose"
          defaultValue={order?.diagnose ?? ""}
          placeholder="Enter diagnosis"
        />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
