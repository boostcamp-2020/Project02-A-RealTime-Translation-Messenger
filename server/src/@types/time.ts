import { TimeCreated } from 'aws-sdk/clients/support';

enum Time {
  DEVIDE_DATE = '-',
  DEVIDE_TIME = ':',
  DEVIDE_MERIDIEM = ' ',
  STANDARD_MERIDIEM = 'PM',
  STANDARD_TIME = 12,
  ADD_DEFAUTL_TIME = '0',
}

export default Time;
