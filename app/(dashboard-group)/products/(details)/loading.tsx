import { Card } from "@/components/ui/card";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProductDetails() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid xl:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <Skeleton className="h-7 w-32" />
                <CardDescription>
                  <Skeleton className="h-4 w-24" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />

                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />

                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />

                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-10 w-36" />
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
