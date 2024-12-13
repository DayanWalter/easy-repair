import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="space-y-6">
        <Card className="p-6">
          <Skeleton className="mb-4 h-7 w-32" />
          <div className="mb-6 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="space-y-4">
            <div>
              <Skeleton className="mb-2 h-5 w-16" />
              <Skeleton className="h-10 max-w-md" />
            </div>
            <div>
              <Skeleton className="mb-2 h-5 w-16" />
              <Skeleton className="h-10 max-w-md" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="mb-4 h-7 w-48" />
          <div className="space-y-4">
            <div>
              <Skeleton className="mr-3 inline-block h-10 w-40" />
              <Skeleton className="inline-block h-10 w-40" />
            </div>
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="mb-4 h-7 w-48" />
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
