import type { MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { Header } from "~/components/layout";
import { Button, Container, Typography } from "~/components/ui";
import { loader as rootLoader } from "~/root";
import { routes } from "~/utils/constants";

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
    <>
      <Header routes={routes} theme={data?.requestInfo.userPrefs.theme} />

      <div className="h-[5000px] w-full">
        <Container>
          <Typography variant="h1" as="h1">
            Jonathan Palma
          </Typography>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="clear">Clear</Button>
        </Container>
      </div>
    </>
  );
}
