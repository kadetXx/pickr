import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Pickr } from "@/Pickr";

export default {
  title: "Pickr",
  component: Pickr,
  argTypes: {
    // todo - figure out why types are not automatically applied here
    format: {
      defaultValue: "ddmmyy",
      control: {
        type: "radio",
      },
    },
    separator: {
      defaultValue: "/",
      control: {
        type: "inline-radio",
      },
    },
    closeOnBlur: { defaultValue: false },
    disabled: { defaultValue: false },
    openByDefault: { defaultValue: false },
  },
} as ComponentMeta<typeof Pickr>;

const Template: ComponentStory<typeof Pickr> = (args) => <Pickr {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const CloseOnBlur = Template.bind({});
CloseOnBlur.args = {
  closeOnBlur: true,
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  openByDefault: true,
};

export const CustomToggle = Template.bind({});
CustomToggle.args = {
  visible: false,
};
