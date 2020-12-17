import React, { lazy, Suspense, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

const ChatRoomPage = lazy(() => import('./pages/ChatRoomPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
import SwitchRoomLoadingPage from './pages/SwitchRoomLoadingPage';
import Background from './components/atoms/resources/Background';
import ko from './assets/locale/ko';
import en from './assets/locale/en';
import useUser from './hooks/useUser';
import LangCode from './@types/langCode';

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
  const { languageData } = useUser();

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Background>
        <IntlProvider locale={languageData} messages={languageData === LangCode.KOREAN ? ko : en}>
          <Suspense fallback={<Background />}>
            <Switch>
              <Route path="/" component={MainPage} exact />
              <Route path="/chat" component={ChatRoomPage} exact />
              <Route path="/loading" component={SwitchRoomLoadingPage} exact />
              <Redirect from="*" to="/" />
            </Switch>
          </Suspense>
        </IntlProvider>
      </Background>
    </>
  );
}

export default App;
