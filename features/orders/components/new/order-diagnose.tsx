import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function OrderDiagnose() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Diagnosis</CardTitle>
        <CardDescription>Specify the cause of the problem.</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea name="diagnose" />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
