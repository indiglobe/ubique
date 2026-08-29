import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";

export function GoogleSigninButton({ ...props }: ComponentProps<"button">) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        `focus-visible:ring-brand-500 focus-visible:ring-offset-background bg-background text-foreground border-foreground/20 bgred500 flex w-full max-w-80 items-center justify-center gap-3 rounded-md border px-4 py-2.5 text-sm font-medium shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
        props.className,
      )}
    >
      <span className={cn(`inline-block size-5`)}>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      </span>

      <span>Sign in with Google</span>
    </button>
  );
}
