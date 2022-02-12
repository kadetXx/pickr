import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Pickr } from "../Pickr";

export default {
  title: "Pickr",
  component: Pickr,
} as ComponentMeta<typeof Pickr>;

const Template: ComponentStory<typeof Pickr> = (args) => <Pickr {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {};
