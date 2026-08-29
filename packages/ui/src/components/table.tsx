import { cn } from "@repo/styles/cn";
import React, { ComponentProps } from "react";

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <table
      className={cn(
        `w-full border-collapse overflow-hidden rounded-xl border border-slate-700`,
        className,
      )}
      {...props}
    />
  );
}

export function Thead({ className, ...props }: ComponentProps<"thead">) {
  return <thead className={cn(``, className)} {...props} />;
}

export function Tr({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn(``, className)} {...props} />;
}

export function Th({ className, ...props }: ComponentProps<"th">) {
  return <th className={cn(`px-6 py-4 font-semibold`, className)} {...props} />;
}

export function Tbody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn(
        `transition-colors [&>tr]:odd:bg-slate-300/70 [&>tr]:even:bg-slate-200/70 [&>tr]:odd:hover:bg-slate-300 [&>tr]:even:hover:bg-slate-200 dark:[&>tr]:odd:bg-slate-900/30 dark:[&>tr]:even:bg-slate-800/30 dark:[&>tr]:odd:hover:bg-slate-900 dark:[&>tr]:even:hover:bg-slate-800`,
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn(`px-6 py-4`, className)} {...props} />;
}
