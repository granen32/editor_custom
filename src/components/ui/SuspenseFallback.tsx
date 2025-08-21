import { Spinner } from "@/components/ui/Spinner";

export default function SuspenseFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" />
      <span className="mt-2 text-gray-500">로딩중...</span>
    </div>
  );
}
