import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrderAccess() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Zugänge</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<div>
						<Label htmlFor="account_access">Passwort</Label>
						<Input name="account_access" />
					</div>
					<div>
						<Label htmlFor="account_access_more">Weitere</Label>
						<Input name="account_access_more" />
					</div>
				</div>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
