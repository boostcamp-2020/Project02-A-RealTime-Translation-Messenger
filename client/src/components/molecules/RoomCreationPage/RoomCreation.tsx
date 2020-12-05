import React from 'react';
import styled from 'styled-components';

import CheckBox from '../../atoms/boxes/CheckBox';
import Text from '../../atoms/texts/Text';
import UnderLinedInput from '../../atoms/inputs/UnderLinedInput';
import Palette from '../../../@types/Palette';

export type RoomCreationPropsType = {
  TypedWordCount: number;
  MaxWordCount: number;
  InputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RoomCreationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 348px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  margin-bottom: 32px;

  & > div {
    margin-right: 30px;
  }

  &:last-child {
    margin: 0;
  }
`;

const RightAlignedText = styled(Text)`
  display: flex;
  align-self: flex-end;
  margin-top: 4px;
`;

export const RoomCreation = ({ TypedWordCount, MaxWordCount, InputOnChange }: RoomCreationPropsType) => {
  return (
    <>
      <CheckBoxWrapper>
        <CheckBox isChecked={false}>공개</CheckBox>
        <CheckBox isChecked={false}>비공개</CheckBox>
      </CheckBoxWrapper>
      <RoomCreationWrapper>
        <UnderLinedInput placeholder={'방 제목을 입력해주세요.'} maxLength={30} onChange={InputOnChange} />
        <RightAlignedText
          size={14}
          color={Palette.PUPAGO_BLUE}
        >{`(${TypedWordCount} / ${MaxWordCount})`}</RightAlignedText>
      </RoomCreationWrapper>
    </>
  );
};

export default RoomCreation;
