import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import * as React from "react";
import { cn } from "~/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-border bg-surface/50 data-[state=open]:border-border-strong data-[state=open]:bg-surface rounded-2xl border px-5 transition-colors",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group text-foreground flex flex-1 items-center justify-between gap-4 py-5 text-left text-[15px] font-medium sm:text-base",
        className,
      )}
      {...props}
    >
      {children}
      <span className="border-border-strong text-accent grid size-7 shrink-0 place-items-center rounded-full border transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.36,0.64,1)] group-data-[state=open]:rotate-45">
        <Plus className="size-3.5" aria-hidden />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  // forceMount keeps answers in the HTML for SEO; .acc-content animates the height.
  <AccordionPrimitive.Content
    ref={ref}
    forceMount
    className="acc-content text-muted text-[15px] leading-relaxed"
    {...props}
  >
    <div className="acc-grid">
      <div>
        <div className={cn("pr-10 pb-5", className)}>{children}</div>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
