import React from 'react';
import styled from 'styled-components';

import ChatModalBackground from '../../atoms/boxes/ChatModalBackground';
import ChatModalBox from '../../atoms/boxes/ChatModalBox';
import Text from '../../atoms/texts/Text';
import MainButton from '../../atoms/buttons/MainButton';
import Palette from '../../../@types/Palette';
import { useIntl } from 'react-intl';

type RoomSwitchModalPropsType = {
  onClickConfirm: () => void;
  onClickCancel: () => void;
  onClickBackground: () => void;
  onClickClose: () => void;
};

const ChatModalBoxWrapper = styled.div`
  position: absolute;
  left: 440px;
  top: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 240px;
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
  const { formatMessage } = useIntl();
  return (
    <div>
      <ChatModalBackground onClick={onClickBackground} />
      <ChatModalBoxWrapper>
        <ChatModalBox onClickClose={onClickClose}>
          <ModalContentWrapper>
            <Text size={14} color={Palette.DARK_GREY}>
              {formatMessage({ id: 'switchRoom' })}
            </Text>
            <MainButton disabled={false} onClickButton={onClickConfirm}>
              {formatMessage({ id: 'ok' })}
            </MainButton>
            <MainButton onClickButton={onClickCancel}>{formatMessage({ id: 'cancle' })}</MainButton>
          </ModalContentWrapper>
        </ChatModalBox>
      </ChatModalBoxWrapper>
    </div>
  );
};

export default RoomSwitchModal;
