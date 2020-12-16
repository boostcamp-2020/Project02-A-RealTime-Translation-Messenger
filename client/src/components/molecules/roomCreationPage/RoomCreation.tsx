import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import CheckBox from '../../atoms/boxes/CheckBox';
import Text from '../../atoms/texts/Text';
import UnderLinedInput from '../../atoms/inputs/UnderLinedInput';
import Palette from '../../../@types/Palette';
import CharacterLimit from '../../../@types/characterLimit';

export type RoomCreationPropsType = {
  TypedWordCount: number;
  MaxWordCount: number;
  privateSelected?: boolean;
  InputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isPrivateOnClick: (isPrivate: boolean) => void;
};

const RoomCreationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 336px;
  margin-bottom: 96px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 336px;
  margin-bottom: 56px;

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

export const RoomCreation = ({
  TypedWordCount,
  MaxWordCount,
  privateSelected,
  InputOnChange,
  value,
  isPrivateOnClick,
}: RoomCreationPropsType) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <CheckBoxWrapper>
        <CheckBox isChecked={privateSelected ? false : true} isPrivateOnClick={isPrivateOnClick} isPrivate={false}>
          {formatMessage({ id: 'public' })}
        </CheckBox>
        <CheckBox isChecked={privateSelected ? true : false} isPrivateOnClick={isPrivateOnClick} isPrivate={true}>
          {formatMessage({ id: 'private' })}
        </CheckBox>
      </CheckBoxWrapper>
      <RoomCreationWrapper>
        <UnderLinedInput
          value={value}
          placeholder={formatMessage({ id: 'enterRoomTitle' })}
          maxLength={CharacterLimit.ROOM_NAME_MAX}
          onChange={InputOnChange}
          valid={true}
        />
        <RightAlignedText
          size={14}
          color={Palette.PUPAGO_BLUE}
        >{`${TypedWordCount} / ${MaxWordCount}`}</RightAlignedText>
      </RoomCreationWrapper>
    </>
  );
};

export default RoomCreation;
