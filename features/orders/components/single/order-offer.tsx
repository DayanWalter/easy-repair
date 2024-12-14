import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderOffer({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Offer</CardTitle>
        <CardDescription>
          What services and costs does your offer include?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          id="offer"
          name="offer"
          defaultValue={order?.offer ?? ""}
          placeholder="Describe your offer"
        />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
