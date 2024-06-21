import { Link } from "@remix-run/react";
import clsx from "clsx";

export function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx(
        className,
        "h-10 w-10 rounded-full p-0.5 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-neutral-50/10",
      )}
      {...props}
    />
  );
}

export function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "to"> & {
  large?: boolean;
}) {
  return (
    <Link
      to="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto")}
      {...props}
    >
      <img
        src=""
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        className={clsx(
          "rounded-full bg-white object-cover dark:bg-neutral-800",
          large ? "h-16 w-16" : "h-9 w-9",
        )}
      />
    </Link>
  );
}
