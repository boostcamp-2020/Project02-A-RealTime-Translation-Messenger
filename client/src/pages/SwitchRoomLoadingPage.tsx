import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';

import HomeLogo from '../components/atoms/logos/HomeLogo';
import useUser from '../hooks/useUser';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LogoAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const LogoWrapper = styled.div`
  opacity: 0;
  animation: ${LogoAnimation} 1.5s linear;
`;

function SwitchRoomLoadingPage() {
  const history = useHistory();
  const { nicknameData } = useUser();

  useEffect(() => {
    if (nicknameData === '') {
      return history.push('/');
    }
    new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1500);
    }).then(() => {
      history.push('/chat');
    });
  });

  return (
    <Wrapper>
      <LogoWrapper>
        <HomeLogo />
      </LogoWrapper>
    </Wrapper>
  );
}

export default SwitchRoomLoadingPage;
