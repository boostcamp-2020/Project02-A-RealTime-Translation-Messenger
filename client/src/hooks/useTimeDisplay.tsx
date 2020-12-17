import { useIntl } from 'react-intl';

import TimeInSeconds from '../@types/TimeInSeconds';

function useTimeDisplay() {
  const { formatMessage } = useIntl();

  function displayConcat(intervalWithUnit: { interval: number; timeUnit: string }) {
    const flooredInterval = Math.floor(intervalWithUnit.interval);
    return flooredInterval === 1
      ? flooredInterval + formatMessage({ id: `${intervalWithUnit.timeUnit}Ago` })
      : flooredInterval + formatMessage({ id: `${intervalWithUnit.timeUnit}sAgo` });
  }

  const onTimeSince = (Stringdate: string) => {
    const date = new Date(Stringdate);
    const oneSecondInMilliseconds = 1000;
    let seconds = Math.floor((new Date().getTime() - date.getTime()) / oneSecondInMilliseconds);

    let interval = seconds / TimeInSeconds.YEAR;

    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'year' });
    }
    interval = seconds / TimeInSeconds.MONTH;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'month' });
    }
    interval = seconds / TimeInSeconds.DAY;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'day' });
    }
    interval = seconds / TimeInSeconds.HOUR;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'hour' });
    }
    interval = seconds / TimeInSeconds.MINUTE;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'minute' });
    }
    return formatMessage({ id: 'createdNow' });
  };

  return {
    onTimeSince,
  };
}

export default useTimeDisplay;
