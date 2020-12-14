import React from 'react';
import { useIntl } from 'react-intl';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import useNavigation from '../../../hooks/useNavigation';
import MainButton from '../../atoms/buttons/MainButton';

function EnterCodeButton() {
  const { onSetNavigation } = useNavigation();
  const { formatMessage } = useIntl();
  return (
    <div>
      <MainButton
        disabled={false}
        onClickButton={() => {
          onSetNavigation(MainPageNavigation.CODE_INPUT);
        }}
      >
        {formatMessage({ id: 'enterViaCode' })}
      </MainButton>
    </div>
  );
}

export default EnterCodeButton;
