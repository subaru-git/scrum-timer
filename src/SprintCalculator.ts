import moment from 'moment';

export const GetEndDate = (start: Date, term: number, now: Date, end: Date) => {
  const s = moment(start)
    .startOf('day')
    .subtract(1, 'days')
    .hours(end.getHours());
  const n = moment(now);
  const sub = n.diff(s, 'days');
  const e = n
    .startOf('day')
    .add(term * 7 - (sub % (term * 7)), 'days')
    .hours(end.getHours());

  return e.toDate();
};
