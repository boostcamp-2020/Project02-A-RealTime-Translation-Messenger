import React from 'react';
import styled from 'styled-components';

import ChatBox from '../../atoms/boxes/ChatBox';
import ProfileImage from '../../atoms/resources/ProfileImage';
import Text from '../../atoms/texts/Text';

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  margin-bottom: 4px;
`;

const Profile = styled.div<ProfileType>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.isMe ? 'auto' : '0')};
`;

type ProfileType = {
  isMe: boolean;
};

export type ChatItemPropsType = {
  leftMessage: string;
  rightMessage: string;
  isMe: boolean;
  nickname: string;
  imageLink: string;
  createdAt: string;
};

const NickName = styled(Text)`
  margin-left: 8px;
  margin-right: 20px;
`;

function ChatItem({ leftMessage, rightMessage, isMe, imageLink, nickname, createdAt }: ChatItemPropsType) {
  return (
    <div>
      <ProfileWrapper>
        <Profile isMe={isMe}>
          <ProfileImage size="size-24" isMe={isMe} image={imageLink} />
          <NickName size={14} color="black" weight="bold">
            {nickname}
          </NickName>
          <Text>{createdAt}</Text>
        </Profile>
      </ProfileWrapper>
      <ChatBox leftMessage={leftMessage} rightMessage={rightMessage} isMe={isMe} />
    </div>
  );
}

export default ChatItem;
