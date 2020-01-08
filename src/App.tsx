import React, { FC, useState } from 'react';
import { Wave } from 'react-animated-text';
import Countdown from 'react-countdown';
import ScrumTimerAppBar from './ScrumTimerAppBar';
import ScrumTimerDrawer from './ScrumTimerDrawer';
import './App.css';

const App: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [day, setDay] = useState<number>(1);
  const [time, setTime] = useState<Date>(
    new Date(new Date().setHours(18, 0, 0, 0)),
  );
  const end = new Date(
    new Date().setHours(time.getHours(), time.getMinutes(), 0, 0),
  );
  end.setDate(end.getDate() + ((day - 1 - end.getDay() + 7) % 7) + 1);

  return (
    <div className="App">
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
        time={time}
        setTime={setTime}
      />
      <header className="App-header">
        <Countdown
          date={end}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              return <span>Time is over!!</span>;
            }
            const text = `${days} days ${hours} : ${minutes} : ${seconds}`;
            const speed = text.length - 1;

            return <Wave text={text} speed={speed} />;
          }}
        />
      </header>
    </div>
  );
};

export default App;
