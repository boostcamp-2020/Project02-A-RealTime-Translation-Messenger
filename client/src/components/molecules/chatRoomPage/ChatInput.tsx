import React from 'react';
import styled from 'styled-components';

import ChatInputAtom from '../../atoms/inputs/ChatInput';
import Palette from '../../../@types/Palette';
import IconButton from '../../atoms/buttons/IconButton';
import Text from '../../atoms/texts/Text';

const IconWrapper = styled.div`
  display: flex;
  width: 476px;
  height: 32px;
  padding: 4px 20px;
  border-radius: 0 0 0 30px;
  background-color: ${Palette.LIGHT_PUPAGO_BLUE};
  box-sizing: border-box;
`;

const Icons = styled.div`
  display: flex;
  margin-left: auto;
`;

const MicButton = styled(IconButton)`
  margin-right: 8px;
`;

const InputLength = styled(Text)`
  position: relative;
  left: 60px;
  bottom: 22px;
`;

export type ChatInputPropsType = {
  value: string;
  onChangeInput?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  clickMicFunc?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  clickSendFunc?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function ChatInput({ value, onChangeInput, clickMicFunc, clickSendFunc }: ChatInputPropsType) {
  return (
    <div>
      <ChatInputAtom value={value} onChangeInput={onChangeInput}></ChatInputAtom>
      <IconWrapper>
        <Icons>
          <InputLength>{value.length}</InputLength>
          <MicButton iconType="Mic" color={Palette.PUPAGO_BLUE} onClick={clickMicFunc} />
          <IconButton iconType="Send" color={Palette.PUPAGO_BLUE} onClick={clickSendFunc} />
        </Icons>
      </IconWrapper>
    </div>
  );
}

export default ChatInput;
