import moment from 'moment';
import { getSprintEndDate } from './SprintCalculator';

test('sprint calculator', () => {
  const start = moment('2020-01-01 12:34').toDate();
  const startTime = moment('2020-01-01 09:00').toDate();
  const now = moment('2020-01-14 22:33').toDate();
  const end = moment('2020-01-01 18:00').toDate();
  const start2 = moment('2020-04-03 16:06').toDate();
  const startTime2 = moment('2020-04-03 09:00').toDate();
  const now2 = moment('2020-04-03 16:06').toDate();
  const end2 = moment('2020-04-03 18:00').toDate();
  const start3 = moment('2020-01-08 09:00').toDate();
  const startTime3 = moment('2020-01-08 09:00').toDate();
  const now3 = moment('2020-04-07 11:34').toDate();
  const end3 = moment('2020-04-07 17:00').toDate();
  expect(getSprintEndDate(start, 1, now, startTime, end).getTime()).toBe(
    moment('2020-01-21 18:00')
      .toDate()
      .getTime(),
  );
  expect(getSprintEndDate(start, 2, now, startTime, end).getTime()).toBe(
    moment('2020-01-28 18:00')
      .toDate()
      .getTime(),
  );
  expect(getSprintEndDate(start, 3, now, startTime, end).getTime()).toBe(
    moment('2020-01-21 18:00')
      .toDate()
      .getTime(),
  );
  expect(getSprintEndDate(start, 4, now, startTime, end).getTime()).toBe(
    moment('2020-01-28 18:00')
      .toDate()
      .getTime(),
  );
  expect(getSprintEndDate(start2, 1, now2, startTime2, end2).getTime()).toBe(
    moment('2020-04-09 18:00')
      .toDate()
      .getTime(),
  );
  expect(getSprintEndDate(start3, 1, now3, startTime3, end3).getTime()).toBe(
    moment('2020-04-07 17:00')
      .toDate()
      .getTime(),
  );
});
