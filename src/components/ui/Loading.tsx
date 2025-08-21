import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/utils/twMerge";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loading({ className, size = "md", text = "Loading..." }: LoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Spinner size={size} />
      {text && <p className="text-muted-foreground text-sm">{text}</p>}
    </div>
  );
}
