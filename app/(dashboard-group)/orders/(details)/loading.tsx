import Header from "@/components/header/header";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function OrderDetailsLoading() {
  const breadcrumbItems = [
    {
      label: "Orders",
      href: "/orders",
    },
    {
      label: "Loading...",
      href: "#",
    },
  ];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* Order Form Skeleton */}
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-[120px]" />
                  <Skeleton className="h-4 w-[180px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter />
              </Card>
            ))}
          </div>
        </div>

        {/* Messages Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-[60px] w-full" />
            <Skeleton className="h-[60px] w-full" />
            <Skeleton className="h-[60px] w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-[120px]" />
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
