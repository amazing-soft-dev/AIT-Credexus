import * as React from "react";
import { cn } from "~/lib/utils";

const field =
  "w-full rounded-xl border border-border bg-background/60 px-4 text-[15px] text-foreground placeholder:text-subtle transition-colors outline-none hover:border-border-strong focus-visible:border-accent/70 focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none aria-[invalid=true]:border-danger/70 disabled:opacity-50";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      field,
      "file:bg-surface-2 file:text-foreground h-12 file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:text-sm",
      type === "file" && "text-muted py-2.5 text-sm",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(field, "min-h-32 py-3 leading-relaxed", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(field, "[&>option]:bg-surface h-12 appearance-none pr-10", className)}
      {...props}
    >
      {children}
    </select>
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="text-muted pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
    >
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
));
NativeSelect.displayName = "NativeSelect";
