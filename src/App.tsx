import React, { FC, useState, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ScrumTimerAppBar from 'containers/Home/ScrumTimerAppBar';
import ScrumTimerDrawer from 'containers/Drawer/ScrumTimerDrawer';
import ScrumTimerCountdown from 'components/Home/ScrumTimerCountdown';
import ScrumTimerDailyStepper from 'components/Home/ScrumTimerDailyStepper';
import { GetSprintEndDate } from 'SprintCalculator';

const useStyles = makeStyles(() =>
  createStyles({
    appMain: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxHeight: '80vh',
    },
    mainTimer: {
      alignSelf: 'center',
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
  const [open, setOpen] = useState<boolean>(false);
  const [productBeginDate, setProductBeginDate] = useState<moment.Moment>(
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
      .hours(9)
      .minutes(15),
  );
  const end = GetSprintEndDate(
    productBeginDate.toDate(),
    term,
    moment().toDate(),
    dayEndTime.toDate(),
  );
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
      />
      <div className={classes.appMain}>
        <ScrumTimerDailyStepper events={events} activeStep={activeStep} />
        <div className={classes.mainTimer}>
          <ScrumTimerCountdown
            end={dayEndTime.toDate()}
            title="end working"
            main
          />
        </div>
      </div>
      <div className={classes.subTimers}>
        <ScrumTimerCountdown end={end} title="sprint end" />
      </div>
    </>
  );
};

export default App;
