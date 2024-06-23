export type Route = {
  name: string;
  href: string;
};

export type SocialRoute = Route & {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};
