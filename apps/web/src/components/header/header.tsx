import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { Navbar } from "./navbar/navbar";

export function Header({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn(
        `border-foreground/5 bg-background/85 sticky top-0 z-50 border-b backdrop-blur-xl`,
        className,
      )}
      {...props}
    >
      <Navbar />
    </header>
  );
}
