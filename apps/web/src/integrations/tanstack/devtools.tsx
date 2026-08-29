import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";

/**
 * Devtools collection for this project to be used.
 */
export function DevTools() {
  return (
    <>
      <TanStackDevtools
        config={{
          position: "bottom-right",
          hideUntilHover: false,
          defaultOpen: false,
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "Tanstack Form",
            render: <FormDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
