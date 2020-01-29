import React, { FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Calendar from 'react-calendar';
import ScrumTimerAppBar from './ScrumTimerAppBar';
import ScrumTimerDrawer from './ScrumTimerDrawer';
import ScrumTimerCountdown from './ScrumTimerCountdown';
import ScrumTimerDailyStepper from './ScrumTimerDailyStepper';

const useStyles = makeStyles(() =>
  createStyles({
    appMain: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: 'calc(20px + 2vmin)',
      justifyContent: 'space-between',
      maxHeight: '80vh',
    },
    mainTimer: {
      alignSelf: 'center',
      fontSize: 'calc(40px + 2vmin)',
      marginRight: '32px',
    },
    subTimers: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  }),
);

const App: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(true);
  const [day, setDay] = useState<number>(1);
  const [sprintEndTime, setSprintEndTime] = useState<moment.Moment>(
    moment()
      .startOf('day')
      .hours(18),
  );
  const [dayStartTime, setDayStartTime] = useState<moment.Moment>(
    moment()
      .startOf('day')
      .hours(9),
  );
  const [dayEndTime, setDayEndTime] = useState<moment.Moment>(
    moment()
      .startOf('day')
      .hours(18),
  );
  const [term, setTerm] = useState<number>(1);
  const [dailyScrumTime, setDailyScrumTime] = useState<moment.Moment>(
    moment()
      .startOf('day')
      .hours(9),
  );
  const end = moment()
    .startOf('day')
    .hours(sprintEndTime.hours())
    .minutes(sprintEndTime.minutes())
    .day(day + 7 * term)
    .toDate();
  const events = [
    { date: dayStartTime, content: 'start working' },
    { date: dailyScrumTime, content: 'start daily scrum' },
    { date: moment(dailyScrumTime).add(15, 'm'), content: 'end daily scrum' },
    { date: dayEndTime, content: 'end working' },
  ];
  const findIndex = events.findIndex(e => e.date > moment());
  const activeStep = findIndex === -1 ? events.length : findIndex;

  return (
    <>
      <ScrumTimerAppBar
        handleDrawerOpen={() => {
          setOpen(true);
        }}
      />
      <ScrumTimerDrawer
        handleDrawerClose={() => {
          setOpen(false);
        }}
        open={open}
        day={day}
        setDay={setDay}
        sprintEndTime={sprintEndTime}
        setSprintEndTime={setSprintEndTime}
        term={term}
        setTerm={setTerm}
        dayStartTime={dayStartTime}
        setDayStartTime={setDayStartTime}
        dayEndTime={dayEndTime}
        setDayEndTime={setDayEndTime}
        dailyScrumTime={dailyScrumTime}
        setDailyScrumTime={setDailyScrumTime}
      />
      <div className={classes.appMain}>
        <ScrumTimerDailyStepper events={events} activeStep={activeStep} />
        {/* <Calendar /> */}
        <div className={classes.mainTimer}>
          <ScrumTimerCountdown end={end} />
        </div>
      </div>
      <div className={classes.subTimers}>
        <ScrumTimerCountdown end={end} />
        <ScrumTimerCountdown end={end} />
      </div>
    </>
  );
};

export default App;
