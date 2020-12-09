import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Background, { BackgroundPropsType } from '../../components/atoms/resources/Background';

export default {
  title: 'pupagoAtom/Background',
  component: Background,
} as Meta;

const Template: Story<BackgroundPropsType> = (args) => <Background {...args} />;

export const Active = Template.bind({});
