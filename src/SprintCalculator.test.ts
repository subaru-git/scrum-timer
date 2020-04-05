import moment from 'moment';
import { GetEndDate } from './SprintCalculator';

test('sprint calculator', () => {
  const start = moment('2020-01-01 12:34').toDate();
  const now = moment('2020-01-14 22:33').toDate();
  const end = moment('2020-01-01 18:00').toDate();
  const start2 = moment('2020-04-03 16:06').toDate();
  const now2 = moment('2020-04-03 16:06').toDate();
  const end2 = moment('2020-04-03 18:00').toDate();
  expect(GetSprintEndDate(start, 1, now, end).getTime()).toBe(
    moment('2020-01-21 18:00')
      .toDate()
      .getTime(),
  );
  expect(GetSprintEndDate(start, 2, now, end).getTime()).toBe(
    moment('2020-01-28 18:00')
      .toDate()
      .getTime(),
  );
  expect(GetSprintEndDate(start, 3, now, end).getTime()).toBe(
    moment('2020-01-21 18:00')
      .toDate()
      .getTime(),
  );
  expect(GetSprintEndDate(start, 4, now, end).getTime()).toBe(
    moment('2020-01-28 18:00')
      .toDate()
      .getTime(),
  );
  expect(GetSprintEndDate(start2, 1, now2, end2).getTime()).toBe(
    moment('2020-04-09 18:00')
      .toDate()
      .getTime(),
  );
});
