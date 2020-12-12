const timeSinceKorean = (Stringdate: string) => {
  const date = new Date(Stringdate);
  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' 년 전';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' 달 전';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' 일 전';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' 시간 전';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' 분 전';
  }
  return seconds < 10 ? '방금 전' : Math.floor(seconds) + ' 초 전';
};

const timeSinceEnglish = (Stringdate: string) => {
  const date = new Date(Stringdate);
  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return seconds < 10 ? 'created now' : Math.floor(seconds) + ' seconds ago';
};

const timeDisplay = {
  timeSinceEnglish,
  timeSinceKorean,
};

export default timeDisplay;
