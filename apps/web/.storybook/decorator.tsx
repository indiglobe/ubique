import { withThemeByClassName } from "@storybook/addon-themes";
import type { ReactRenderer } from "@storybook/tanstack-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const ThemeDecorator = withThemeByClassName<ReactRenderer>({
  themes: {
    light: "",
    dark: "dark",
  },
  defaultTheme: "dark",
});

export const QueryProviderDecorator = (Story: React.ComponentType) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);
