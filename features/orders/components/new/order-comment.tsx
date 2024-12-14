import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderComment() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Notes</CardTitle>
        <CardDescription>
          Share additional relevant information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea name="comment" />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
