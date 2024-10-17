import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonRow() {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className="h-5 w-24" />
				<Skeleton className="h-4 w-32 mt-1" />
			</TableCell>
			<TableCell className="hidden sm:table-cell">
				<Skeleton className="h-4 w-20" />
			</TableCell>
			<TableCell className="hidden sm:table-cell">
				<Skeleton className="h-5 w-16" />
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Skeleton className="h-4 w-24" />
			</TableCell>
			<TableCell className="text-right">
				<Skeleton className="h-4 w-16 ml-auto" />
			</TableCell>
			<TableCell className="flex justify-end gap-1">
				<Skeleton className="h-8 w-12" />
				<Skeleton className="h-8 w-16" />
			</TableCell>
		</TableRow>
	);
}
