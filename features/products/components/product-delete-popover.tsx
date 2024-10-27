"use client";
import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types";
import { useRouter } from "next/navigation";
// import { createClient, type User } from "@supabase/auth-helpers-nextjs";

export default function ProductDeletePopover({
	product,
}: {
	product: Product;
}) {
	const [error, setError] = useState<string | null>(null);
	const [deleteText, setDeleteText] = useState("");
	const router = useRouter();
	// const supabase = createClient();
	// const [user, setUser] = useState<User | null>(null);
	// console.log(supabase);
	// console.log(user);
	// const {
	// 	data: { user },
	// } = await supabase.auth.getUser();
	// useEffect(() => {
	// 	const getUser = async () => {
	// 		const {
	// 			data: { user },
	// 		} = await supabase.auth.getUser();
	// 		setUser(user);
	// 	};
	// 	getUser();
	// }, [supabase.auth]);

	// const handleDelete = async (id: number) => {
	// 	console.log(user?.id);
	// 	console.log(id);
	// 	if (user) {
	// 		const { data, error } = await supabase
	// 			.from("products")
	// 			.delete()
	// 			.eq("id", id)
	// 			.eq("user_id", user.id)
	// 			.select();

	// 		if (error) {
	// 			setError(`Could not delete product, Reason: ${error.message}`);
	// 			return;
	// 		}
	// 		if (data) {
	// 			console.log(data);
	// 			// router.refresh();
	// 			// router.push("/products");
	// 		}
	// 	}
	// };

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="destructive">Löschen</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Produkt löschen</h4>
						<p className="text-sm text-muted-foreground">
							Geben Sie &quot;delete&quot; ein, um dieses Produkt zu löschen
						</p>
					</div>
					<div className="grid gap-2">
						<div className="grid grid-cols-3 items-center gap-4">
							<Input
								id="delete"
								value={deleteText}
								onChange={(e) => setDeleteText(e.target.value)}
								className="col-span-2 h-8"
							/>
							<Button
								onClick={() => {
									if (deleteText.toLowerCase() === "delete") {
										// handleDelete(Number(product.id));
										setDeleteText("");
									}
								}}
								variant="destructive"
								size="sm"
								disabled={deleteText.toLowerCase() !== "delete"}
							>
								LÖSCHEN
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
