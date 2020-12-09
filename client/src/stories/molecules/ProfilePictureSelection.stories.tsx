import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ProfilePictureSelection, {
  ProfilePictureSelectionPropsType,
} from '../../components/molecules/userInfoPage/ProfilePictureSelection';

export default {
  title: 'pupagoMolecule/ProfilePictureSelection',
  component: ProfilePictureSelection,
} as Meta;

const Template: Story<ProfilePictureSelectionPropsType> = (args) => <ProfilePictureSelection {...args} />;

export const Active = Template.bind({});
Active.args = {
  image: `https://i.imgur.com/O3G3HwR.jpg`,
};
