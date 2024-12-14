import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderErrorDescription({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Error Description</CardTitle>
        <CardDescription>
          What error occurred? Please describe briefly.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <Textarea
          id="error_description"
          name="error_description"
          defaultValue={order?.error_description ?? ""}
          placeholder="Describe the error"
        />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
