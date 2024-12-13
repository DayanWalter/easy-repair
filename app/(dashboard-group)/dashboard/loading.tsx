import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Header from "@/components/header/header";

export default function DashboardLoading() {
	const breadcrumbItems = [{ href: "/dashboard", label: "Dashboard" }];

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
						<Card className="sm:col-span-2">
							<CardHeader className="pb-3">
								<Skeleton className="h-6 w-[180px]" />
								<Skeleton className="h-4 w-[320px] mt-2" />
							</CardHeader>
							<CardFooter>
								<Skeleton className="h-10 w-[140px]" />
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<Skeleton className="h-4 w-[80px]" />
								<Skeleton className="h-10 w-[120px] mt-2" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-4 w-[160px]" />
							</CardContent>
							<CardFooter>
								<Skeleton className="h-2 w-full" />
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<Skeleton className="h-4 w-[80px]" />
								<Skeleton className="h-10 w-[120px] mt-2" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-4 w-[160px]" />
							</CardContent>
							<CardFooter>
								<Skeleton className="h-2 w-full" />
							</CardFooter>
						</Card>
					</div>

					{/* Table Skeleton */}
					<Card>
						<CardHeader>
							<Skeleton className="h-8 w-[200px]" />
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-8 w-full" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right sidebar skeleton */}
				<div className="hidden lg:block">
					<Card>
						<CardHeader>
							<Skeleton className="h-6 w-[140px]" />
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<Skeleton className="h-20 w-full" />
								<Skeleton className="h-20 w-full" />
								<Skeleton className="h-20 w-full" />
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</>
	);
}
