import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";

const buttonVariants = cva("font-semibold inline-flex items-center gap-x-1.5", {
  variants: {
    variant: {
      primary:
        "bg-secondary-600 shadow-sm text-neutral-100 hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-700",
      secondary:
        "bg-neutral-100 shadow-sm dark:bg-neutral-100/20 dark:text-neutral-100 dark:hover:bg-neutral-100/30 text-neutral-900 ring-1 ring-inset ring-neutral-500 hover:bg-neutral-300",
      soft: "bg-secondary-100 shadow-sm text-secondary-600 hover:bg-secondary-200",
      clear:
        "bg-transparent text-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-700 shadow-none hover:bg-neutral-200 hover:shadow-sm",
    },
    size: {
      xs: "rounded px-2 py-1 text-xs",
      sm: "rounded px-2 py-1 text-sm",
      md: "rounded-md px-2.5 py-1.5 text-sm",
      lg: "rounded-md px-3 py-2 text-sm",
      xl: "rounded-md px-3.5 py-2.5 text-sm",
    },
    fullWidth: {
      true: "w-full",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-70",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> &
  Omit<VariantProps<typeof buttonVariants>, "isDisabled"> & {
    /**
     * A property to provide a reason for disabling the button, particularly for assistive technologies.
     */
    disabledReason?: string;
    renderLeftIcon?: (
      iconProps: React.SVGProps<SVGSVGElement>,
    ) => React.ReactNode;
    renderRightIcon?: (
      iconProps: React.SVGProps<SVGSVGElement>,
    ) => React.ReactNode;
  };

const iconDefaultProps: React.SVGProps<SVGSVGElement> = {
  className: "-ml-0.5 h-5 w-5",
  "aria-hidden": true,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabledReason,
    fullWidth = false,
    onClick,
    onKeyDown,
    renderLeftIcon,
    renderRightIcon,
    size,
    type = "button",
    variant,
    ...buttonProps
  },
  ref,
) {
  // TODO: write a blog about why I decided to use disabledReason instead of just disabled
  const isDisabled = Boolean(disabledReason);
  const handleDisabledEvent = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const shouldShowLeftIcon = typeof renderLeftIcon === "function";
  const shouldShowRightIcon = typeof renderRightIcon === "function";

  return (
    <button
      ref={ref}
      {...buttonProps}
      type={type}
      aria-disabled={isDisabled ? true : undefined}
      onClick={isDisabled ? handleDisabledEvent : onClick}
      onKeyDown={isDisabled ? handleDisabledEvent : onKeyDown}
      className={clsx(
        buttonVariants({
          variant,
          size,
          fullWidth,
          isDisabled,
        }),
        className,
      )}
    >
      {shouldShowLeftIcon && renderLeftIcon(iconDefaultProps)}
      {children}
      {shouldShowRightIcon && renderRightIcon(iconDefaultProps)}
      <span aria-live="assertive" className="sr-only">
        {isDisabled ? disabledReason : undefined}
      </span>
    </button>
  );
});

Button.displayName = "Button";

export { Button };
