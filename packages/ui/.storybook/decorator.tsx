import { withThemeByClassName } from "@storybook/addon-themes";
import type { ReactRenderer } from "@storybook/react-vite";

export const ThemeDecorator = withThemeByClassName<ReactRenderer>({
  themes: {
    light: "",
    dark: "dark",
  },
  defaultTheme: "light",
});
