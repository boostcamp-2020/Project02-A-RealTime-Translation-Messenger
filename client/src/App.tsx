import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import MainPage from './pages/MainPage';

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
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/chat" component={ChatPage} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export default App;
