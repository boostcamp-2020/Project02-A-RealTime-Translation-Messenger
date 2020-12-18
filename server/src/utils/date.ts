import Time from '../@types/time';

const getNow = () => {
  const date = new Date().toLocaleDateString().split(Time.DEVIDE_DATE);
  const timeIncludeMeridiem = new Date().toLocaleTimeString().split(Time.DEVIDE_MERIDIEM);
  const time = timeIncludeMeridiem[0].split(Time.DEVIDE_TIME);

  if (date[0]?.length < 2) date[0] = Time.ADD_DEFAUTL_TIME + date[0];
  if (date[1]?.length < 2) date[1] = Time.ADD_DEFAUTL_TIME + date[1];
  time[0] =
    time[0].length < 2 && timeIncludeMeridiem[1] === Time.STANDARD_MERIDIEM
      ? (time[0] = String(Time.STANDARD_TIME + Number(time[0])))
      : time[0];

  const newDate = [date[2], date[0], date[1]].join(Time.DEVIDE_DATE);
  const newTime = [time[0], time[1], time[2]].join(Time.DEVIDE_TIME);

  return newDate + Time.DEVIDE_MERIDIEM + newTime;
};

const dateUtil = {
  getNow,
};

export default dateUtil;
