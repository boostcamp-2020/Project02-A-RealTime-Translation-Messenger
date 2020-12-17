import { useIntl } from 'react-intl';

enum InSeconds {
  YEAR = 31536000,
  MONTH = 2592000,
  DAY = 86400,
  HOUR = 3600,
  MINUTE = 60,
}

function TimeDisplay() {
  const { formatMessage } = useIntl();

  function displayConcat(intervalWithUnit: { interval: number; timeUnit: string }) {
    const flooredInterval = Math.floor(intervalWithUnit.interval);
    return flooredInterval === 1
      ? flooredInterval + formatMessage({ id: `${intervalWithUnit.timeUnit}Ago` })
      : flooredInterval + formatMessage({ id: `${intervalWithUnit.timeUnit}sAgo` });
  }

  const timeSince = (Stringdate: string) => {
    const date = new Date(Stringdate);
    let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / InSeconds.YEAR;

    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'year' });
    }
    interval = seconds / InSeconds.MONTH;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'month' });
    }
    interval = seconds / InSeconds.DAY;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'day' });
    }
    interval = seconds / InSeconds.HOUR;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'hour' });
    }
    interval = seconds / InSeconds.MINUTE;
    if (interval > 1) {
      return displayConcat({ interval, timeUnit: 'minute' });
    }
    return formatMessage({ id: 'createdNow' });
  };

  return {
    timeSince,
  };
}

export default TimeDisplay;
