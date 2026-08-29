import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/navigation-menu";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import { cn } from "@repo/styles/cn";
import type { Meta, StoryObj } from "@storybook/react-vite";

function NavigationMenuComp() {
  type NavItem =
    | { to: string; text: string }
    | {
        to: string;
        text: string;
        children?: { to: string; text: string; subtext?: string }[];
      };

  const navItems = [
    { text: "Home", to: "/" },
    {
      children: [
        {
          text: "About us",
          to: "/company/about",
          subtext: "Our story & mission",
        },
        {
          text: "Awards",
          to: "/company/awards",
          subtext: "Recognition & licenses",
        },
        { text: "News", to: "/company/news", subtext: "Latest updates" },
      ],
      text: "Company",
      to: "/company",
    },
    {
      children: [
        {
          text: "Account types",
          to: "/trading/accounts",
          subtext: "Micro. Pro. SyntX",
        },
        {
          text: "Instruments",
          to: "/trading/instruments",
          subtext: "Forex, Crypto, Stocks",
        },
        {
          text: "SyntX Indecies",
          to: "/trading/syntx",
          subtext: "Trade 24/7 synthetics",
        },
        {
          text: "MT4/MT5",
          to: "/trading/platforms",
          subtext: "Platform downloads",
        },
      ],
      text: "Trading  ",
      to: "/trading",
    },
    {
      children: [
        {
          text: "IB Program",
          to: "/partnership/ib",
          subtext: "Introduce clients",
        },
        {
          text: "Affiliate",
          to: "/partnership/affiliate",
          subtext: "Earn commissions",
        },
      ],
      text: "Pertnership",
      to: "/partnership",
    },
    {
      text: "Tool",
      to: "/tools",
    },
    {
      children: [
        {
          text: "Webinar",
          to: "/education/webinars",
          subtext: "Live & on-demand",
        },
        {
          text: "Trading guides",
          to: "/education/guides",
          subtext: "Beginner to pro",
        },
      ],
      text: "Education",
      to: "/education",
    },
    {
      text: "Promotions",
      to: "/promotions",
    },
  ] satisfies NavItem[];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map(({ text, children, to }) => {
          return (
            <NavigationMenuItem key={text} className={cn(`relative`)}>
              {children && children.length > 0 && (
                <>
                  <NavigationMenuTrigger>
                    <a href={to}> {text}</a>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      {children.map(({ text }) => {
                        return <li key={text}>{text}</li>;
                      })}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
              {!children && (
                <NavigationMenuLink asChild>
                  <a href={to}>{text}</a>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const meta: Meta<typeof NavigationMenuComp> & TypedMetaOptions = {
  component: NavigationMenuComp,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof NavigationMenuComp>;

export const NavigationMenuCompStory: Story = {
  args: {},
};
