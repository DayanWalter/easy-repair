import { TableCell } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Table, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { readMessages } from "@/features/messages/api";

import {
	MessageDeleteSheet,
	MessageCreateSheet,
} from "@/features/messages/components";
import { useEffect, useState } from "react";

export default function Messages({
	params,
}: {
	params: { orderId: string };
}) {
	// const messages = await readMessages(Number(params.orderId));
	const [messages, setMessages] = useState<
		Database["public"]["Tables"]["messages"]["Row"][]
	>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			const fetchedMessages = await readMessages(Number(params.orderId));
			setMessages(fetchedMessages);
		};

		fetchMessages();
	}, [params.orderId]);
	return (
		<>
			<CardHeader>
				<CardTitle>Kommunikation</CardTitle>
				<CardDescription>Dies ist der Kommunikationsverlauf</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Communication-table */}
				<ScrollArea className="h-96 rounded-md border">
					<Table>
						<TableBody>
							{/* Communication */}
							{messages?.map(
								(message: Database["public"]["Tables"]["messages"]["Row"]) => (
									<TableRow key={message.id}>
										<TableCell>
											<div className="text-sm font-medium md:inline">
												{message.text}
											</div>
											<div className="text-muted-foreground">
												{message.author}
											</div>
										</TableCell>
										<TableCell className="flex items-center">
											{message.created_at
												? format(
														new Date(message.created_at),
														"dd.MM.yyyy, HH:mm",
													)
												: "N/A"}{" "}
										</TableCell>
										<TableCell>
											<MessageDeleteSheet
												orderId={Number(params.orderId)}
												messageId={message.id.toString()}
											/>
										</TableCell>
									</TableRow>
								),
							)}
						</TableBody>
					</Table>
				</ScrollArea>
				{/* <div className="py-6">
				</div> */}
			</CardContent>
			<CardFooter>
				<MessageCreateSheet orderId={Number(params.orderId)} />
			</CardFooter>
		</>
	);
}
