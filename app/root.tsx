import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useRouteLoaderData,
} from "@remix-run/react";
import tailwindStyleSheetUrl from "~/tailwind.css?url";
import { ClientHintCheck, getHints } from "./utils/client-hints";
import { getDomainUrl } from "./utils/misc";
import { getTheme } from "./utils/theme.server";
import { getEnv } from "./utils/env.server";
import { useTheme } from "./routes/resources+/theme-switch";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyleSheetUrl },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
    ENV: getEnv(),
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  const theme = useTheme();
  return (
    <html lang="en" className={`${theme} h-full overflow-x-hidden`}>
      <head>
        <ClientHintCheck />
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body>
        {children}
        <script
          // TODO: add nonce
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
