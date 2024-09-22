import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import theme from "../src/theme/theme";
import AppSettingsProvider from "../src/components/AppSettingsProvider/AppSettingsProvider";
import NavShell from "../src/components/NavShell/NavShell";
import React from "react";

const preview: Preview = {
  decorators: [
    (Story, _storyContext) => {
      return (
        <MantineProvider theme={theme} defaultColorScheme="dark" >
          <AppSettingsProvider>
            <NavShell>
              <Story />
            </NavShell>
          </AppSettingsProvider>
        </MantineProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
