import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Wave } from 'react-animated-text';
import Countdown, { zeroPad } from 'react-countdown';

const useStyles = makeStyles(() =>
  createStyles({
    countdown: {
      margin: '16px',
    },
  }),
);

const ScrumTimerCountdown: FC<{ end: Date }> = ({ end }) => {
  const classes = useStyles();

  return (
    <div className={classes.countdown}>
      <Countdown
        date={end}
        renderer={({ days, hours, minutes, seconds, completed }) => {
          if (completed) {
            return <span>Time is over!!</span>;
          }
          const text = `${days} days ${zeroPad(hours)} : ${zeroPad(
            minutes,
          )} : ${zeroPad(seconds)}`;
          const speed = text.length - 1;

          return <Wave text={text} speed={speed} />;
        }}
      />
    </div>
  );
};

export default ScrumTimerCountdown;
