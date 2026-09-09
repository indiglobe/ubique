import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/resizable";
import { cn } from "@repo/styles/cn";
import { DashboardContent } from "./dashboard-content";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export function Dashboard() {
  return (
    <div
      className={cn(
        `min-h-svh bg-background text-foreground`,
      )}
    >
      {/* Desktop / Laptop */}
      <div
        className={cn(
          `hidden min-h-svh md:block`,
        )}
      >
        <ResizablePanelGroup
          orientation="horizontal"
          className={cn(
            `min-h-svh w-full @container`,
          )}
        >
          {/* Sidebar - full height from top */}
          <ResizablePanel
            defaultSize={200}
            minSize={150}
            maxSize={300}
          >
            <DashboardSidebar />
          </ResizablePanel>

          {/* Resize Handle */}
          <ResizableHandle
            withHandle
            className={cn(
              `bg-foreground/5 transition-colors duration-200 hover:bg-primary-300/30`,
            )}
          />

          {/* Right Dashboard Area */}
          <ResizablePanel
            defaultSize={82}
            minSize={60}
          >
            <div
              className={cn(
                `flex min-h-svh flex-col bg-background`,
              )}
            >
              {/* Header only on right side */}
              <DashboardHeader />

              {/* Dashboard Content */}
              <main
                className={cn(
                  `min-h-0 flex-1 overflow-y-auto bg-background`,
                )}
              >
                <DashboardContent />
              </main>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile */}
      <div
        className={cn(
          `flex min-h-svh flex-col md:hidden`,
        )}
      >
        {/* Mobile Header */}
        <DashboardHeader />

        {/* Mobile Content */}
        <main
          className={cn(
            `min-h-0 flex-1 overflow-y-auto bg-background`,
          )}
        >
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}