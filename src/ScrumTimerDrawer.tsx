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
} from '@material-ui/pickers';

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
    endDate: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    dayOfWeek: {
      marginLeft: '8px',
      marginRight: '16px',
      marginTop: '16px',
      marginBottom: '8px',
    }
  }),
);

const ScrumTimerDrawer: FC<{
  handleDrawerClose: () => void;
  open: boolean;
  day: number;
  setDay: (day: number) => void;
  time: Date;
  setTime: (date: Date) => void;
}> = ({ handleDrawerClose, open, day, setDay, time, setTime }) => {
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
        <Typography variant="h5">Sprint end date</Typography>
        <div className={classes.endDate}>
          <div className={classes.dayOfWeek}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Day of week
            </InputLabel>
            <Select
              value={day}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setDay(event.target.value as number);
              }}
            >
              <MenuItem value={0}>Sunday</MenuItem>
              <MenuItem value={1}>Monday</MenuItem>
              <MenuItem value={2}>Tuesday</MenuItem>
              <MenuItem value={3}>Wednesday</MenuItem>
              <MenuItem value={4}>Thursday</MenuItem>
              <MenuItem value={5}>Friday</MenuItem>
              <MenuItem value={6}>Saturday</MenuItem>
            </Select>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              label="Time"
              minutesStep={5}
              value={time}
              onChange={(date: Date | null) => {
                if (date) {
                  setTime(date);
                } else {
                  setTime(new Date(new Date().setHours(18, 0, 0, 0)));
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
