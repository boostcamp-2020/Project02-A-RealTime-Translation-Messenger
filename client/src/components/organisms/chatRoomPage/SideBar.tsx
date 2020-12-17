import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import SideBarMolecule from '../../molecules/chatRoomPage/SideBar';
import ChatRoomList from './ChatRoomList';
import { JoiningRoomType, SideBarStatus } from '../../../@types/types';
import ParticipantList from './ParticipantList';
import RoomSwitchModal from '../../molecules/chatRoomPage/RoomSwitchModal';
import useReset from '../../../hooks/useReset';
import useRoom from '../../../hooks/useRoom';
import useUser from '../../../hooks/useUser';

const SideBarWrapper = styled.div`
  position: relative;
`;

const RoomSwitchWrapper = styled.div`
  position: absolute;
  z-index: 5;
  right: 0px;
  top: 0px;
`;

function SideBar() {
  const [sideBarStatus, setSideBarStatus] = useState(SideBarStatus.PARTICIPANTS);
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchingRoom, setSwitchingRoom] = useState<JoiningRoomType>({
    roomCode: '',
    isPrivate: false,
  });
  const { onReset } = useReset();
  const { onJoinRoom } = useRoom();
  const { socketData } = useUser();
  const location = useLocation();

  useEffect(() => {
    setSideBarStatus(SideBarStatus.PARTICIPANTS);
  }, [location]);

  return (
    <SideBarWrapper>
      {isSwitching && (
        <RoomSwitchWrapper>
          <RoomSwitchModal
            onClickConfirm={() => {
              socketData?.disconnect();
              onReset();
              onJoinRoom(switchingRoom);
              setIsSwitching(false);
            }}
            onClickBackground={() => {
              setIsSwitching(false);
            }}
            onClickCancel={() => {
              setIsSwitching(false);
            }}
            onClickClose={() => {
              setIsSwitching(false);
            }}
          />
        </RoomSwitchWrapper>
      )}
      <SideBarMolecule selected={sideBarStatus} onClickSideBarTab={setSideBarStatus}>
        {sideBarStatus === SideBarStatus.PARTICIPANTS ? (
          <ParticipantList />
        ) : (
          <ChatRoomList setIsSwitching={setIsSwitching} setSwitchingRoom={setSwitchingRoom} />
        )}
      </SideBarMolecule>
    </SideBarWrapper>
  );
}

export default SideBar;
