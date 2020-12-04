import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { HomeLogo, HomeLogoType } from '../../components/atoms/logos/HomeLogo';

export default {
  title: 'pupago/HomeLogo',
  component: HomeLogo,
} as Meta;

const Template: Story<HomeLogoType> = (args) => <HomeLogo {...args} />;

export const Active = Template.bind({});
