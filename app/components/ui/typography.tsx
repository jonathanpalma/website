import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const typographyVariants = cva("text-neutral-950 dark:text-neutral-50", {
  variants: {
    variant: {
      "body-xs": "text-2xs sm:text-xs",
      "body-sm": "text-xs sm:text-sm",
      "body-md": "text-sm sm:text-md",
      "body-lg": "text-md sm:text-lg",
      h1: "text-5xl sm:text-6xl font-bold",
      h2: "text-4xl sm:text-5xl font-bold",
      h3: "text-3xl sm:text-4xl font-bold",
      h4: "text-2xl sm:text-3xl font-bold",
      h5: "text-xl sm:text-2xl font-semibold",
      h6: "text-lg sm:text-xl font-semibold",
    },
    weight: {
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      "": "", // This allows for an empty string default
    },
  },
  defaultVariants: {
    variant: "body-md",
    weight: "",
  },
});

type TypographyProps = VariantProps<typeof typographyVariants> & {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export function Typography({
  as: Component = "span",
  variant,
  className,
  children,
}: TypographyProps) {
  return (
    <Component className={`${typographyVariants({ variant })} ${className}`}>
      {children}
    </Component>
  );
}
