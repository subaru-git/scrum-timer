import moment from 'moment';

export const toToday = (time: moment.Moment) => {
  return moment(time)
    .year(moment().year())
    .month(moment().month())
    .date(moment().date());
};

export const toWeekDay = (date: moment.Moment) => {
  if (date.weekday() === 0) {
    date.weekday(-2);
  } else if (date.weekday() === 6) {
    date.weekday(-1);
  }

  return moment(date);
};

export const getSprintEndDate = (
  start: Date,
  term: number,
  now: Date,
  startTime: Date,
  endTime: Date,
) => {
  const s = moment(start)
    .startOf('day')
    .hours(startTime.getHours());
  let sub = moment(now).diff(s, 'days');
  // next day patch
  let next = 0;
  if (moment(now).hours() > moment(endTime).hours()) {
    sub += 1;
    next = 1;
  }
  const sprintday = term * 7 - 1;
  const d = sprintday - (sub % (term * 7));
  const e = moment(now)
    .startOf('day')
    .add(d + next, 'days')
    .hours(endTime.getHours());

  return toWeekDay(e).toDate();
};
