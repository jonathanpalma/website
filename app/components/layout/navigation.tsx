import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Link, NavLink } from "@remix-run/react";
import clsx from "clsx";
import { Route } from "~/types";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};
export type NavigationProps = {
  routes: Route[];
};
type DesktopNavigationProps = React.ComponentPropsWithoutRef<"nav"> &
  NavigationProps;
type MobileNavigationProps = React.ComponentPropsWithoutRef<typeof Popover> &
  NavigationProps;

function MobileNavItem({ href, children }: NavItemProps) {
  return (
    <li>
      <PopoverButton as={Link} to={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  );
}

function MobileNavigation({ routes, ...popoverProps }: MobileNavigationProps) {
  return (
    <Popover {...popoverProps}>
      <PopoverButton className="routes-center group flex rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-neutral-500 group-hover:stroke-neutral-700 dark:group-hover:stroke-neutral-400" />
      </PopoverButton>
      <Transition>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverOverlay className="fixed inset-0 z-50 bg-neutral-800/40 backdrop-blur-sm dark:bg-black/80" />
        </TransitionChild>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 dark:bg-neutral-900 dark:ring-neutral-800"
          >
            <div className="routes-center flex flex-row-reverse justify-between">
              <PopoverButton aria-label="Close menu" className="-m-1 p-1">
                <XMarkIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
              </PopoverButton>
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-neutral-100 text-base text-neutral-800 dark:divide-neutral-100/5 dark:text-neutral-300">
                {routes.map((route) => (
                  <MobileNavItem key={route.href} href={route.href}>
                    {route.name}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  );
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          clsx(
            "relative block px-3 py-2 transition",
            isActive
              ? "text-secondary-300 dark:text-secondary-100"
              : "hover:text-secondary-300 dark:hover:text-secondary-100",
          )
        }
      >
        {({ isActive }) => (
          <>
            {children}
            {isActive && (
              <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-secondary-300/0 via-secondary-300/40 to-secondary-300/0 dark:from-secondary-100/0 dark:via-secondary-100/40 dark:to-secondary-100/0" />
            )}
          </>
        )}
      </NavLink>
    </li>
  );
}

function DesktopNavigation({ routes, ...navProps }: DesktopNavigationProps) {
  return (
    <nav {...navProps}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10">
        {routes.map((route) => (
          <NavItem key={route.href} href={route.href}>
            {route.name}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}

export function Navigation({ routes }: NavigationProps) {
  return (
    <>
      <MobileNavigation
        className="pointer-events-auto md:hidden"
        routes={routes}
      />
      <DesktopNavigation
        className="pointer-events-auto hidden md:block"
        routes={routes}
      />
    </>
  );
}
