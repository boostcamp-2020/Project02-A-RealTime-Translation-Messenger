import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';

import ChatRoomPage from './pages/ChatRoomPage';
import MainPage from './pages/MainPage';
import Background from './components/atoms/resources/Background';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

  *,
	*:before,
	*:after {
	  box-sizing: border-box;
  }
  
  body {
		font-family: 'Noto Sans KR', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Background>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/chat" component={ChatRoomPage} exact />
          <Redirect from="*" to="/" />
        </Switch>
      </Background>
    </>
  );
}

export default App;
