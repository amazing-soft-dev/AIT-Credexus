import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,color,box-shadow,border-color,transform] duration-[400ms] ease-[cubic-bezier(0.34,1.36,0.64,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_30px_-8px_rgb(90_107_255/0.7),inset_0_1px_0_rgb(255_255_255/0.25)] hover:bg-primary-strong hover:shadow-[0_8px_32px_0_rgb(14_62_255/0.45),inset_0_1px_0_rgb(255_255_255/0.25)]",
        secondary:
          "border border-border-strong bg-surface-2/70 text-foreground hover:border-accent/50 hover:bg-surface-2",
        ghost: "text-muted hover:bg-white/5 hover:text-foreground",
        link: "rounded-none px-0 text-accent underline-offset-4 hover:underline",
        // Avenna "Primary CTA" (White): hover → lavender fill + blue label, 0.4s spring.
        white:
          "bg-white text-[#0b0d26] shadow-[0_8px_32px_-12px_rgb(255_255_255/0.45)] hover:bg-[rgb(224,227,250)] hover:text-[rgb(42,75,208)]",
      },
      size: {
        sm: "h-9 px-4",
        default: "h-11 px-6",
        lg: "h-12 px-7 text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";
