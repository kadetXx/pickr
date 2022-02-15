import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Pickr, PickrProps } from "../Pickr";

export default {
  title: "Pickr",
  component: Pickr,
  argTypes: {
    format: {
      options: ["ddmmyy", "mmddyy", "yymmdd"],
      control: {
        type: "radio",
      },
    },
    separator: {
      options: ["/", "-", "."],
      control: {
        type: "radio",
      },
    },
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
  toggleCalendar: false,
};
