import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function OrderAccess({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div>
            <Label htmlFor="account_access">Password</Label>
            <Input
              id="account_access"
              name="account_access"
              defaultValue={order?.account_access ?? ""}
              placeholder="Password"
            />
          </div>
          <div>
            <Label htmlFor="account_access_more">Additional</Label>
            <Input
              id="account_access_more"
              name="account_access_more"
              defaultValue={order?.account_access_more ?? ""}
              placeholder="Additional"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
