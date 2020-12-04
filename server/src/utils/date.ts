import moment from 'moment';

const getNow = () => moment().format('YYYY-MM-DD HH:mm:ss');

const dateUtil = {
  getNow,
};

export default dateUtil;
