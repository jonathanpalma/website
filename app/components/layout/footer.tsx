import { Link, NavLink } from "@remix-run/react";
import clsx from "clsx";
import { Route, SocialRoute } from "~/types";

type FooterProps = {
  routes: Route[];
  socialRoutes: SocialRoute[];
};

export function Footer({ routes, socialRoutes }: FooterProps) {
  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {routes.map((item) => (
            <div key={item.name} className="pb-6">
              <NavLink
                to={item.href}
                className={(isActive) =>
                  clsx(
                    "text-sm leading-6 hover:text-neutral-500",
                    { "text-neutral-400": !isActive },
                    { "text-neutral-500": isActive },
                  )
                }
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {socialRoutes.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-neutral-400 hover:text-neutral-500"
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-neutral-500">
          &copy; {new Date().getFullYear()} Jonathan Palma, Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
