import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export default function Main({ className, ...props }: ComponentProps<"main">) {
  return (
    <main
      className={cn(`px-4 md:px-10 lg:px-16 xl:px-20`, className)}
      {...props}
    />
  );
}
