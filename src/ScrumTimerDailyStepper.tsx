import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepper: {
      width: '40%',
      height: '80vh',
    },
  }),
);

interface DailyEvent {
  date: moment.Moment;
  content: string;
}

const ScrumTimerDailyStepper: FC<{
  events: DailyEvent[];
  activeStep: number;
}> = ({ events, activeStep }) => {
  const classes = useStyles();

  return (
    <div className={classes.stepper}>
      <Stepper orientation="vertical" activeStep={activeStep}>
        {events.map(event => (
          <Step key={event.date.toString()}>
            <StepLabel>{event.date.format('H:mm')}</StepLabel>
            <StepContent>
              <Typography>{event.content}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ScrumTimerDailyStepper;
