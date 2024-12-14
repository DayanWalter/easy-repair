import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrderMessages() {
  return (
    <>
      <CardHeader className="pb-2">
        <CardTitle>Communication</CardTitle>
        <CardDescription>This is the communication history</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter />
    </>
  );
}
