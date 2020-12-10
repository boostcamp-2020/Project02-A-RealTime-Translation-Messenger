import React, { useState } from 'react';

import SideBarMolecule from '../../molecules/chatRoomPage/SideBar';
import ChatRoomList from './ChatRoomList';
import { SideBarStatus } from '../../../@types/types';
import ParticipantList from './ParticipantList';

function SideBar() {
  const [sideBarStatus, setSideBarStatus] = useState(SideBarStatus.PARTICIPANTS);

  return (
    <div>
      <SideBarMolecule selected={sideBarStatus} onClickSideBarTab={setSideBarStatus}>
        {sideBarStatus === SideBarStatus.PARTICIPANTS ? <ParticipantList /> : <ChatRoomList />}
      </SideBarMolecule>
    </div>
  );
}

export default SideBar;
