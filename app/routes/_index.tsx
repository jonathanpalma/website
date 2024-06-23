import type { MetaFunction } from "@remix-run/node";
import { Container, Typography } from "~/components/ui";

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

export default function IndexPage() {
  return (
    <Container className="w-full">
      <Typography variant="h1" as="h1">
        Jonathan Palma
      </Typography>
    </Container>
  );
}
