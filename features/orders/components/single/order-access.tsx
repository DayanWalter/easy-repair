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

export default function OrderAccess({ order }: { order: Order }) {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Zugänge</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<div>
						<Label htmlFor="account_access">Passwort</Label>
						<Input
							id="account_access"
							name="account_access"
							defaultValue={order?.account_access}
						/>
					</div>
					<div>
						<Label htmlFor="account_access_more">Weitere</Label>
						<Input
							id="account_access_more"
							name="account_access_more"
							defaultValue={order?.account_access_more}
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</>
	);
}
