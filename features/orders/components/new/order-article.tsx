import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrderArticle() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div>
            <Label htmlFor="article_device">Device</Label>
            <Input name="article_device" />
          </div>
          <div>
            <Label htmlFor="article_manufacturer">Manufacturer</Label>
            <Input name="article_manufacturer" />
          </div>
          <div>
            <Label htmlFor="article_accessory">Accessories</Label>
            <Input name="article_accessory" />
          </div>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
