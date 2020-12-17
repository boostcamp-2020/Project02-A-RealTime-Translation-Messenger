const getNow = () => {
  const date = new Date().toLocaleDateString().split('-');
  const timeIncludeMeridiem = new Date().toLocaleTimeString().split(' ');
  const time = timeIncludeMeridiem[0].split(':');
  const meridiem = timeIncludeMeridiem[2]?.substring(0, 2);

  if (date[1]?.length < 2) date[1] = '0' + date[1];
  if (date[2]?.length < 2) date[2] = '0' + date[2];
  time[0] = time[0].length < 2 && meridiem === 'PM' ? (time[0] = String(12 + Number(time[0]))) : time[0];

  const newDate = [date[0], date[1], date[2]].join('-');
  const newTime = [time[0], time[1], time[2]].join(':');

  return newDate + ' ' + newTime;
};

const dateUtil = {
  getNow,
};

export default dateUtil;
