import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

export function formatLocalDate(date: Date | undefined) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  dayjs.tz.guess();

  return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
}
