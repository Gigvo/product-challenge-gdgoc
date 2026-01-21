import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Skeleton className="h-8 w-56" />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-6 items-center justify-center">
          <Skeleton className="flex-1 h-28 rounded-[10px]" />
          <Skeleton className="flex-1 h-28 rounded-[10px]" />
        </div>

        <div className="rounded-[10px]">
          <div className="flex items-center justify-between px-6 py-4">
            <Skeleton className="w-64 h-6" />
            <Skeleton className="w-32 h-8" />
          </div>

          <div className="flex flex-col divide-y">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
