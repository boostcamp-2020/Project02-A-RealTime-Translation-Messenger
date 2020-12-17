import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import MiniLogo from '../../components/atoms/logos/MiniLogo';

export default {
  title: 'pupagoAtom/MiniLogo',
  component: MiniLogo,
} as Meta;

const Template: Story = (args) => <MiniLogo {...args} />;

export const Active = Template.bind({});
