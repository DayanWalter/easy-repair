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
import type { Message } from "@/types";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { readMessages } from "../api/read";
import MessageDeleteSheet from "./message-delete-sheet";
import MessageCreateSheet from "./message-create-sheet";

export default async function Messages({
	params,
}: {
	params: { orderId: string };
}) {
	const messages = await readMessages(Number(params.orderId));

	return (
		<>
			<CardHeader className="pb-2">
				<CardTitle>Kommunikation</CardTitle>
				<CardDescription>Dies ist der Kommunikationsverlauf</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent>
				<div className="py-2">
					<MessageCreateSheet orderId={Number(params.orderId)} />
				</div>
				{/* Communication-table */}
				<ScrollArea className="h-72 rounded-md border">
					<Table className="h-[50px]">
						<TableBody>
							{/* Communication */}
							{messages?.map((message: Message) => (
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
											messageId={message.id}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</CardContent>
			<CardFooter />
		</>
	);
}
