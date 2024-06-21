import {
  Link as RemixLink,
  LinkProps as RemixLinkProps,
} from "@remix-run/react";
import { VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";
import { buttonVariants } from "./button";

type LinkButtonProps = RemixLinkProps & VariantProps<typeof buttonVariants>;

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(
    { children, className, fullWidth = false, size, variant, ...linkProps },
    ref,
  ) {
    return (
      <RemixLink
        ref={ref}
        {...linkProps}
        className={clsx(
          buttonVariants({ variant, size, fullWidth }),
          className,
        )}
      >
        {children}
      </RemixLink>
    );
  },
);

LinkButton.displayName = "LinkButton";

export { LinkButton };
