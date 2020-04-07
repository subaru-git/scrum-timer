import React, { FC, useContext } from 'react';
import moment from 'moment';

import ScrumTimerCountdown from 'components/Home/ScrumTimerCountdown';
import ScrumTimerDailyStepper from 'components/Home/ScrumTimerDailyStepper';
import { ProductContext } from 'contexts';
import { getSprintEndDate, toToday } from 'SprintCalculator';

import { makeStyles, createStyles } from '@material-ui/core/styles';

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

const ScrumTimerMain: FC = () => {
  const classes = useStyles();
  const { product } = useContext(ProductContext);
  const begin = toToday(moment(product?.beginTime));
  const dbegin = toToday(moment(product?.dailyScrumBeginTime));
  const end = toToday(moment(product?.endTime));
  const send = getSprintEndDate(
    moment(product?.beginDate).toDate(),
    product ? product.sprintTerm : 1,
    moment().toDate(),
    moment(product?.beginTime).toDate(),
    moment(product?.endTime).toDate(),
  );
  const events = [
    { date: begin, content: 'start working' },
    { date: dbegin, content: 'start daily scrum' },
    { date: dbegin.add(15, 'm'), content: 'end daily scrum' },
    { date: end, content: 'end working' },
  ];
  const findIndex = events.findIndex(e => e.date > moment());
  const activeStep = findIndex === -1 ? events.length : findIndex;

  return (
    <>
      {!product ? (
        <p>loading</p>
      ) : (
        <>
          <div className={classes.appMain}>
            <ScrumTimerDailyStepper events={events} activeStep={activeStep} />
            <div className={classes.mainTimer}>
              <ScrumTimerCountdown
                end={end.toDate()}
                title="end working"
                main
              />
            </div>
          </div>
          <div className={classes.subTimers}>
            <ScrumTimerCountdown end={send} title="sprint end" />
          </div>
        </>
      )}
    </>
  );
};

export default ScrumTimerMain;
