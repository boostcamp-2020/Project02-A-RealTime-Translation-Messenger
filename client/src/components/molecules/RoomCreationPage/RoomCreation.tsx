import React from 'react';
import styled from 'styled-components';

import CheckBox from '../../atoms/boxes/CheckBox';
import Text from '../../atoms/texts/Text';
import UnderLinedInput from '../../atoms/inputs/UnderLinedInput';

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;

  & > div {
    margin-right: 30px;
  }

  &:last-child {
    margin: 0;
  }
`;

export const RoomCreation = () => {
  return (
    <CheckBoxWrapper>
      <CheckBox isChecked={false}>공개</CheckBox>
      <CheckBox isChecked={false}>비공개</CheckBox>
    </CheckBoxWrapper>
  );
};

export default RoomCreation;
