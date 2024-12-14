import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderError() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Error Description</CardTitle>
        <CardDescription>Describe the problem that occurred.</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea name="error_description" />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
