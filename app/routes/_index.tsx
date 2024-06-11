import type { MetaFunction } from "@remix-run/node";
import { Button, Container, Typography } from "~/components/ui";
import { ThemeSwitch } from "./resources+/theme-switch";
import { useRouteLoaderData } from "@remix-run/react";
import { loader as rootLoader } from "~/root";

export const meta: MetaFunction = () => [
  { title: "Jonathan's Website | Software Engineer" },
  {
    name: "description",
    content:
      "Jonathan is a full stack software engineer with experience in SaaS and distributed applications. Explore his projects and expertise.",
  },
  { name: "robots", content: "index, follow" },
  {
    tagName: "link",
    rel: "canonical",
    href: "https://jonathanpalma.dev",
  },
];

export default function Index() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  return (
    <div className="flex h-full w-full flex-1 bg-neutral-100 dark:bg-neutral-900">
      <Container>
        <ThemeSwitch userPreference={data?.requestInfo.userPrefs.theme} />
        <Typography variant="h1" as="h1">
          Jonathan Palma
        </Typography>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="clear">Clear</Button>
      </Container>
    </div>
  );
}
