import React from 'react';
import styled from 'styled-components';

import SideBarBox from '../../atoms/boxes/SideBar';
import SideBarTab from '../../atoms/buttons/SideBarTab';

const SideBarTabWrapper = styled.div`
  display: flex;
`;

const SideBarContent = styled.div`
  padding: 16px 24px;
`;

export type SideBarPropsType = {
  children: React.ReactNode;
  onClickSideBarTab?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selected: 'participants' | 'chatrooms';
};

function SideBar({ children, onClickSideBarTab, selected }: SideBarPropsType) {
  return (
    <SideBarBox>
      <SideBarTabWrapper>
        <SideBarTab
          isSelected={selected === 'participants' ? true : false}
          isTabNameParticipant={true}
          onClick={onClickSideBarTab}
        >
          참여자
        </SideBarTab>
        <SideBarTab
          isSelected={selected === 'participants' ? false : true}
          isTabNameParticipant={false}
          onClick={onClickSideBarTab}
        >
          채팅방
        </SideBarTab>
      </SideBarTabWrapper>
      <SideBarContent>{children}</SideBarContent>
    </SideBarBox>
  );
}

export default SideBar;
