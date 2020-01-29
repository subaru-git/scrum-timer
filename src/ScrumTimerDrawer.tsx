import 'date-fns';
import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: '80%',
      flexShrink: 0,
    },
    drawerPaper: {
      width: '80%',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    term: {
      margin: '16px',
    },
    termWeek: {
      width: '200px',
    },
    endDate: {
      marginTop: '16px',
      marginBottom: '16px',
    },
    endDatePart: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    dayOfWeek: {
      marginRight: '16px',
      marginTop: '16px',
    },
    daySetting: {
      margin: '16px',
    },
    daySettingStart: {
      marginRight: '16px',
      marginTop: '16px',
    },
    dailyScrum: {
      margin: '16px',
    },
  }),
);

const ScrumTimerDrawer: FC<{
  handleDrawerClose: () => void;
  open: boolean;
  day: number;
  setDay: (day: number) => void;
  sprintEndTime: moment.Moment;
  setSprintEndTime: (date: moment.Moment) => void;
  term: number;
  setTerm: (term: number) => void;
  dayStartTime: moment.Moment;
  setDayStartTime: (date: moment.Moment) => void;
  dayEndTime: moment.Moment;
  setDayEndTime: (date: moment.Moment) => void;
  dailyScrumTime: moment.Moment;
  setDailyScrumTime: (date: moment.Moment) => void;
}> = ({
  handleDrawerClose,
  open,
  day,
  setDay,
  sprintEndTime,
  setSprintEndTime,
  term,
  setTerm,
  dayStartTime,
  setDayStartTime,
  dayEndTime,
  setDayEndTime,
  dailyScrumTime,
  setDailyScrumTime,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.term}>
          <Typography variant="subtitle2" gutterBottom>
            Product Setting
          </Typography>
          <div className={classes.endDate}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="none"
                label="product begin date"
                value={new Date()}
                variant="inline"
                onChange={(date: Date | null) => {
                  if (date) {
                    setSprintEndTime(moment(date));
                  } else {
                    setSprintEndTime(
                      moment(new Date(new Date().setHours(18, 0, 0, 0))),
                    );
                  }
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <InputLabel shrink>sprint term</InputLabel>
          <Select
            className={classes.termWeek}
            value={term}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setTerm(event.target.value as number);
            }}
          >
            <MenuItem value={1}>1 week</MenuItem>
            <MenuItem value={2}>2 week</MenuItem>
            <MenuItem value={3}>3 week</MenuItem>
            <MenuItem value={4}>4 week</MenuItem>
          </Select>
        </div>
        <Divider />
        <div className={classes.daySetting}>
          <Typography variant="subtitle2">Day Setting</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              label="begin time"
              minutesStep={5}
              value={dayStartTime}
              onChange={(date: Date | null) => {
                if (date) {
                  setDayStartTime(moment(date));
                } else {
                  setDayStartTime(
                    moment(new Date(new Date().setHours(9, 0, 0, 0))),
                  );
                }
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              label="End Time"
              minutesStep={5}
              value={dayEndTime}
              onChange={(date: Date | null) => {
                if (date) {
                  setDayEndTime(moment(date));
                } else {
                  setDayEndTime(
                    moment(new Date(new Date().setHours(18, 0, 0, 0))),
                  );
                }
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.dailyScrum}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              label="daily scrum begin time"
              minutesStep={5}
              value={dailyScrumTime}
              onChange={(date: Date | null) => {
                if (date) {
                  setDailyScrumTime(moment(date));
                } else {
                  setDailyScrumTime(
                    moment(new Date(new Date().setHours(9, 0, 0, 0))),
                  );
                }
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </Drawer>
    </div>
  );
};

export default ScrumTimerDrawer;
