import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function OrderArticle({
  order,
}: {
  order: Database["public"]["Tables"]["orders"]["Row"];
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="article_device">Device</Label>
            <Input
              id="article_device"
              name="article_device"
              defaultValue={order?.article_device ?? ""}
              placeholder="Device"
            />
          </div>
          <div>
            <Label htmlFor="article_manufacturer">Manufacturer</Label>
            <Input
              id="article_manufacturer"
              name="article_manufacturer"
              defaultValue={order?.article_manufacturer ?? ""}
              placeholder="Manufacturer"
            />
          </div>
          <div>
            <Label htmlFor="article_accessory">Accessories</Label>
            <Input
              id="article_accessory"
              name="article_accessory"
              defaultValue={order?.article_accessory ?? ""}
              placeholder="Accessories"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
