import { addDecorator } from '@storybook/react';
import { GlobalStyle } from '../src/App';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

addDecorator((story) => (
  <>
    <GlobalStyle />
    {story()}
  </>
));
