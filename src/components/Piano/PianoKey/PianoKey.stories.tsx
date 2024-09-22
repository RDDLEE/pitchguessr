import type { Meta, StoryObj } from "@storybook/react";

import PianoKey from "./PianoKey";

const meta = {
  title: "PG/PianoKey",
  component: PianoKey,
  decorators: [
    (Story, _storyContext) => {
      return (
        <div style={{ height: "200px" }}>
          <Story />
        </div>
      );
    }
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PianoKey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    noteOctave: { note: "C", octave: 4 }
  },
};

export const BlackKey: Story = {
  args: {
    noteOctave: { note: "C#", octave: 4 }
  },
};
