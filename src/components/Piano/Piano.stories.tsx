import type { Meta, StoryObj } from "@storybook/react";

import Piano from "./Piano";

const meta = {
  title: "PG/Piano",
  component: Piano,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Piano>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startOctave: 3,
    endOctave: 3,
  },
};

export const TwoOctaves: Story = {
  args: {
    startOctave: 3,
    endOctave: 4,
  },
};

export const FourOctaves: Story = {
  args: {
    startOctave: 3,
    endOctave: 7,
  },
};
