import { cn } from "@/utils/twMerge";
import { cva, type VariantProps } from "class-variance-authority";


const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-[#fff]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-white",
        destructive:
          "border-transparent bg-destructive hover:bg-destructive/80 bg-[#fff]  border border-[#6B778C] font-[#6B778C] text-[#fff]",
        outline: "text-foreground",
        darkblue: "bg-[#1E2B52] text-white",
        premium: "bg-[#0A1129] text-white",
        seasonA: "bg-[#B4D0F4] text-black",
        seasonB: "bg-[#FFC55B] text-black",
        presale: "bg-[#5D676F] text-white",
        general: "bg-[#EBECF0] text-black",
        kids: "bg-[#FCF6C5] text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
