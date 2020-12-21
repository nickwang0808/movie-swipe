import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import Providers from "./Providers";

export default {
  title: "Providers",
  component: Providers,
} as Meta;

const Template: Story<ComponentProps<typeof Providers>> = (args) => (
  <Providers {...args} />
);

export const Default = Template.bind({});

const provider = [
  {
    logo_path: "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
    display_priority: 2,
    provider_id: 2,
    provider_name: "Apple iTunes",
  },
  {
    logo_path: "/p3Z12gKq2qvJaUOMeKNU2mzKVI9.jpg",
    display_priority: 3,
    provider_id: 3,
    provider_name: "Google Play Movies",
  },
  {
    logo_path: "/sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg",
    display_priority: 10,
    provider_id: 10,
    provider_name: "Amazon Video",
  },
  {
    logo_path: "/vDCcryHD32b0yMeSCgBhuYavsmx.jpg",
    display_priority: 12,
    provider_id: 192,
    provider_name: "YouTube",
  },
  {
    logo_path: "/eqr1RvnDiHcM7UxmaZOIjdTmyx3.jpg",
    display_priority: 18,
    provider_id: 105,
    provider_name: "FandangoNOW",
  },
  {
    logo_path: "/pgaPsqgFh2grkcr7ROkoBajHJnf.jpg",
    display_priority: 24,
    provider_id: 7,
    provider_name: "Vudu",
  },
  {
    logo_path: "/paq2o2dIfQnxcERsVoq7Ys8KYz8.jpg",
    display_priority: 36,
    provider_id: 68,
    provider_name: "Microsoft Store",
  },
  {
    logo_path: "/nSr2IQSwc5C2QrttIWen8s06ofe.jpg",
    display_priority: 39,
    provider_id: 279,
    provider_name: "Redbox",
  },
  {
    logo_path: "/qZdEeINwQotbr1Rq15dL5G2BaAh.jpg",
    display_priority: 42,
    provider_id: 358,
    provider_name: "DIRECTV",
  },
];

Default.args = {
  providers: provider.map((elem) => elem.logo_path),
};
