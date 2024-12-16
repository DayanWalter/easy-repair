import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SkeletonRow from "@/components/skeleton-row/skeleton-row";

export default function LoadingProductsOverview() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid xl:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <Skeleton className="h-7 w-32" />
                <CardDescription className="h-4 w-full max-w-lg"></CardDescription>
              </CardHeader>
              <CardFooter>
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="customers">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                  disabled
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>

            <TabsContent value="customers">
              <Card>
                <CardHeader className="px-7">
                  <Skeleton className="h-7 w-32" />
                  <CardDescription className="h-4 w-full max-w-lg"></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors">
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              <Skeleton className="h-4 w-16" />
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              <Skeleton className="h-4 w-16" />
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              <Skeleton className="h-4 w-16" />
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              <Skeleton className="h-4 w-16" />
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium">
                              <Skeleton className="h-4 w-16" />
                            </th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {[...Array(5)].map((_, i) => (
                            <SkeletonRow key={`skeleton-row-${i}`} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
