"use client";
import { PaginationContent, PaginationItem } from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import OrderDetails from "./order-details";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function OrderNavigation({
	orders,
}: { orders: Database["public"]["Tables"]["orders"]["Row"][] }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				handlePrevious();
			} else if (event.key === "ArrowRight") {
				handleNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	const handlePrevious = () => {
		setCurrentIndex((prev) => (prev > 0 ? prev - 1 : orders.length - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev < orders.length - 1 ? prev + 1 : 0));
	};

	const currentOrder = orders[currentIndex];
	const { toast } = useToast();

	return (
		<Card className="overflow-hidden">
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Order {currentOrder.id}
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
							onClick={() => {
								navigator.clipboard.writeText(currentOrder.id.toString());
								toast({
									title: "Order ID copied to clipboard",
									description: currentOrder.id.toString(),
								});
							}}
						>
							<Copy className="h-3 w-3" />
							<span className="sr-only">Copy Order ID</span>
						</Button>
					</CardTitle>
					<CardDescription>
						Date:{" "}
						{format(
							new Date(currentOrder.date_start ?? new Date()),
							"MMMM dd, yyyy",
						)}
					</CardDescription>
				</div>

				<Pagination className="ml-auto mr-0 w-auto">
					<PaginationContent>
						<PaginationItem>
							<Button
								size="icon"
								variant="outline"
								className="h-6 w-6"
								onClick={handlePrevious}
							>
								<ChevronLeft className="h-3.5 w-3.5" />
								<span className="sr-only">Previous Order</span>
							</Button>
						</PaginationItem>
						<PaginationItem>
							<Button
								size="icon"
								variant="outline"
								className="h-6 w-6"
								onClick={handleNext}
							>
								<ChevronRight className="h-3.5 w-3.5" />
								<span className="sr-only">Next Order</span>
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardHeader>

			<OrderDetails order={currentOrder} />
		</Card>
	);
}
