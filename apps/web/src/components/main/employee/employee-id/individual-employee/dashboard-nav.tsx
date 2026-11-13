import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps } from "react";

export function DashboardNav({ className, ...props }: ComponentProps<"nav">) {
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        `mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8`,
        className,
      )}
      {...props}
    >
      <Button
        className={cn(``)}
        variant={"primary"}
        appearance={"ghost"}
        onClick={() => navigate({ to: "/dashboard" })}
      >
        <span>
          <ArrowLeft />
        </span>
        <span>Back to dashboard</span>
      </Button>
    </nav>
  );
}
