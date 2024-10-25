"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function OrderStatus() {
	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Status</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Select name="state">
						<SelectTrigger>
							<SelectValue placeholder="Wählen Sie einen Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="Annahme">Annahme</SelectItem>
								<SelectItem value="Technik">Technik</SelectItem>
								<SelectItem value="Technik wartend">Technik wartend</SelectItem>
								<SelectItem value="Kunden anrufen">Kunden anrufen</SelectItem>
								<SelectItem value="Gerät wird abgeholt">
									Gerät wird abgeholt
								</SelectItem>
								<SelectItem value="Teile bestellt">Teile bestellt</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="flex items-center space-x-2">
						<Checkbox name="again" />
						<label
							htmlFor="again"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Gerät erneut da
						</label>
					</div>
					<Label htmlFor="old_order_id">Alte Auftragsnummer</Label>
					<Input name="old_order_id" />
				</div>
			</CardContent>
			<CardFooter />
		</>
	);
}
