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
		<>
			<CardHeader className="pb-2">
				<CardTitle>Artikel</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-3">
					<div>
						<Label htmlFor="article_device">Gerät</Label>
						<Input name="article_device" />
					</div>
					<div>
						<Label htmlFor="article_manufacturer">Hersteller</Label>
						<Input name="article_manufacturer" />
					</div>
					<div>
						<Label htmlFor="article_accessory">Zubehör</Label>
						<Input name="article_accessory" />
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</>
	);
}
