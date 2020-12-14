import React, { useRef } from 'react';
import styled from 'styled-components';
import Palette from '../../../@types/Palette';

import IconButton from '../../atoms/buttons/IconButton';
import RoomCode from '../../atoms/texts/RoomCode';
import Text from '../../atoms/texts/Text';

const Wrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 72px;
  padding: 8px 0 8px 25px;
  border-radius: 30px 0 0 0;
  background: rgba(255, 255, 255, 0.6);
`;

const ExitButton = styled(IconButton)`
  margin: auto 254px auto 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 422px;
`;

const RoomTitle = styled(Text)`
  margin-bottom: 5px;
`;

const RoomCodeTextArea = styled.textarea`
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

export type ChatRoomHeaderPropsType = {
  title: string;
  roomCode: string;
  roomCodeOnClickFunc?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  leaveOnClick: () => void;
  clipBoardRef: ((instance: HTMLTextAreaElement | null) => void) | React.RefObject<HTMLTextAreaElement> | null;
};

function ChatRoomHeader({ title, roomCode, roomCodeOnClickFunc, leaveOnClick, clipBoardRef }: ChatRoomHeaderPropsType) {
  return (
    <Wrapper>
      <ExitButton iconType="Leave" color={Palette.PUPAGO_BLUE} onClick={leaveOnClick} />
      <TitleWrapper>
        <RoomTitle weight="bold" size={18} color={'black'}>
          {title}
        </RoomTitle>
        <RoomCode code={roomCode} onClick={roomCodeOnClickFunc} />
        <RoomCodeTextArea value={roomCode} ref={clipBoardRef} />
      </TitleWrapper>
    </Wrapper>
  );
}

export default ChatRoomHeader;
