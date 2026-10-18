import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";

export default function Main({ className, ...props }: ComponentProps<"main">) {
  return (
    <main
      className={cn(`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`, className)}
      {...props}
    />
  );
}
