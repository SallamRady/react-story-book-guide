import type { Meta, StoryObj } from "@storybook/react";
import AvatarAtom from "./Avatar";

const meta: Meta<typeof AvatarAtom> = {
  title: "Atoms/AvatarAtom",
  component: AvatarAtom,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta; // Default export for the metadata

type Story = StoryObj<typeof meta>;

// Define the stories for AvatarAtom
export const Bordered: Story = {
  args: {
    // Define arguments or props if needed
  },
};

export const WithoutBorder: Story = {
  args: {
    // Define arguments or props if needed
    border: false,
  },
};
