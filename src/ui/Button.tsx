import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility to merge tailwind classes safely */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  // Default Base Styles (Your provided CSS)
  "inline-flex items-start justify-center gap-2 flex-shrink-0 rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#00A1BF] text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-[#008ba5]",
        outline:
          "border border-[#00A1BF] text-[#00A1BF] bg-transparent hover:bg-[#f0f9fb]",
        ghost: "hover:bg-[#f0f9fb] text-[#00A1BF]",
      },
      size: {
        default: "w-[134.25px] h-[36px] px-4 pt-[9px] pb-[10px]",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-lg",
        full: "w-full h-[36px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {leftIcon && <span className="flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && (
              <span className="flex items-center">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
