import 'date-fns';
import React, { FC, useContext } from 'react';
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
import useProducts from 'hooks/use-products';
import { ProductContext } from 'contexts';

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
}> = ({ handleDrawerClose, open }) => {
  const classes = useStyles();
  const { loading } = useProducts();
  const { product, setProduct } = useContext(ProductContext);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        {loading || !product ? (
          <p>loading</p>
        ) : (
          <div>
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
                    value={moment(product.beginDate)}
                    variant="inline"
                    onChange={(date: Date | null) => {
                      if (date) {
                        setProduct({
                          ...product,
                          beginDate: moment(date)
                            .startOf('day')
                            .format(),
                        });
                      }
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <InputLabel shrink>sprint term</InputLabel>
              <Select
                className={classes.termWeek}
                value={product.sprintTerm}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setProduct({
                    ...product,
                    sprintTerm: event.target.value as number,
                  });
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
                  value={product.beginTime}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setProduct({
                        ...product,
                        beginTime: moment(date).format(),
                      });
                    }
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  label="End Time"
                  minutesStep={5}
                  value={product.endTime}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setProduct({
                        ...product,
                        endTime: moment(date).format(),
                      });
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
                  value={product.dailyScrumBeginTime}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setProduct({
                        ...product,
                        dailyScrumBeginTime: moment(date).format(),
                      });
                    }
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ScrumTimerDrawer;
