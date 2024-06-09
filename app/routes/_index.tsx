import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Button, Container, Typography } from "~/components/ui";
import { ThemeSwitch } from "./resources+/theme-switch";
import { useRouteLoaderData } from "@remix-run/react";
import { loader as rootLoader } from "~/root";

export const links: LinksFunction = () => {
  return [{ rel: "canonical", href: "https://jonathanpalma.dev" }];
};

export const meta: MetaFunction = () => {
  return [
    { title: "Jonathan's Website | Software Engineer" },
    {
      name: "description",
      content:
        "Jonathan is a full stack software engineer with experience in SaaS and distributed applications. Explore his projects and expertise.",
    },
    { name: "robots", content: "index, follow" },
  ];
};

export default function Index() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  return (
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
  );
}
