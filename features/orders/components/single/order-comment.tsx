import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderComment({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Notes</CardTitle>
        <CardDescription>
          Share additional relevant information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          id="comment"
          name="comment"
          defaultValue={order?.comment ?? ""}
          placeholder="Additional notes"
        />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
