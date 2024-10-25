import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Order } from "@/types";

export default function OrderArticle({ order }: { order: Order }) {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Artikel</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-3">
					<div>
						<Label htmlFor="article_device">Gerät</Label>
						<Input
							id="article_device"
							name="article_device"
							defaultValue={order?.article_device}
						/>
					</div>
					<div>
						<Label htmlFor="article_manufacturer">Hersteller</Label>
						<Input
							id="article_manufacturer"
							name="article_manufacturer"
							defaultValue={order?.article_manufacturer}
						/>
					</div>
					<div>
						<Label htmlFor="article_accessory">Zubehör</Label>
						<Input
							id="article_accessory"
							name="article_accessory"
							defaultValue={order?.article_accessory}
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</>
	);
}
