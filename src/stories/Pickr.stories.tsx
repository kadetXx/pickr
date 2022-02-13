import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Pickr } from "../Pickr";

export default {
  title: "Pickr",
  component: Pickr,
} as ComponentMeta<typeof Pickr>;

const Template: ComponentStory<typeof Pickr> = (args) => <Pickr {...args} />;

export const Default = Template.bind({});

export const CloseOnBlur = Template.bind({});
CloseOnBlur.args = {
  closeOnBlur: true,
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  openByDefault: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
