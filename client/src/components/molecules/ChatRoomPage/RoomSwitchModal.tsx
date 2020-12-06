import React from 'react';
import styled from 'styled-components';

import ChatModalBackground from '../../atoms/boxes/ChatModalBackground';
import ChatModalBox from '../../atoms/boxes/ChatModalBox';
import Text from '../../atoms/texts/Text';
import MainButton from '../../atoms/buttons/MainButton';
import Palette from '../../../@types/Palette';

type RoomSwitchModalPropsType = {
  onClickConfirm?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) & (() => void);
  onClickCancel?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) & (() => void);
  onClickBackground?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const ChatModalBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  height: 720px;
  button,
  span {
    margin-bottom: 24px;
  }
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
  width: inherit;
  height: inherit;
`;

export const RoomSwitchModal = ({
  onClickConfirm,
  onClickCancel,
  onClickBackground,
  onClickClose,
}: RoomSwitchModalPropsType) => {
  return (
    <div>
      <ChatModalBackground onClick={onClickBackground}>
        <ChatModalBoxWrapper>
          <ChatModalBox onClickClose={onClickClose}>
            <ModalContentWrapper>
              <Text size={14} color={Palette.DARK_GREY}>
                다른 채팅방으로 이동하시겠습니까?
              </Text>
              <MainButton disabled={false} onClick={onClickConfirm}>
                확인
              </MainButton>
              <MainButton onClick={onClickCancel}>취소</MainButton>
            </ModalContentWrapper>
          </ChatModalBox>
        </ChatModalBoxWrapper>
      </ChatModalBackground>
    </div>
  );
};

export default RoomSwitchModal;
