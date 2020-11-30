import moment from 'moment';

const getNow = () => moment().format('YYYY-MM-DD HH:mm:ss');

const dateUtils = {
  getNow,
};

export default dateUtils;
