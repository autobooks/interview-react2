import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { useStore } from '../store';
import { setActivityTimeRunning, setActivityTimeSpent } from '../actions';

const useStyles = makeStyles(theme => ({
  timeRunning: {
    backgroundColor: 'rgba(76, 175, 80, 0.32)'
  },
  timePaused: {
    backgroundColor: 'rgba(255, 193, 7, 0.22)'
  },
  done: {
    backgroundColor: 'rgba(255, 193, 7, 0.60)'
  }
}));

export default function Activity({activity}) {
  const classes = useStyles();

  //set local state
  const [currentTime, setCurrentTime] = useState(new Date());

  //calculating relative time
  const startTime = new Date(activity.startTime);

  const endTime = new Date(startTime.getTime() + activity.duration);

  const timeRemaining = Math.max(0, activity.duration - activity.timeSpent);

  const durationString = daysHoursMinutes(timeRemaining);

  const timeForTask = (startTime < currentTime && currentTime < endTime);

  const timeRunning = timeForTask && !activity.paused;

  //update time count
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
      if(!activity.paused) {
        const timeSpent = activity.timeSpent + 1000;
        dispatch(setActivityTimeSpent({timeSpent, id: activity.id}))
      }
    }, 1000);
  }, []);

  //get context dispatch function
  const [{ activities }, dispatch] = useStore();

  let icon, disabledButton, activityClass;
  if(timeRunning) {
    icon = "pause";
    activityClass = classes.timeRunning;
  }
  else {
    if(timeForTask) {
      icon = "play_arrow";
      activityClass = classes.timePaused;
    }
    else if(timeRemaining === 0) {
      icon = "";
      disabledButton = true;
      activityClass = "";
    }
    else {
      icon = "";
      disabledButton = true;
      activityClass = classes.done;
    }
  }

  const handleClick = () => {
    const newValue = timeRunning ? true : false;
    dispatch(setActivityTimeRunning({paused: newValue, id: activity.id}));
  };

  return (
      <TableRow className={activityClass}>
        <TableCell align="right">{startTime.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
        <TableCell align="right">{endTime.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
        <TableCell align="right">{durationString}</TableCell>
        <TableCell align="right">{activity.description}</TableCell>
          <TableCell align="right">
            <IconButton disabled={disabledButton} onClick={handleClick}>
              <Icon>{icon}</Icon>
            </IconButton>
          </TableCell>
      </TableRow>
  );
}

function daysHoursMinutes(ms){
    let cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        days = Math.floor(ms / cd),
        hours = Math.floor( (ms - days * cd) / ch),
        minutes = Math.round( (ms - days * cd - hours * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( minutes === 60 ){
    hours += 1;
    minutes = 0;
  }
  if( hours === 24 ){
    days += 1;
    hours = 0;
  }
  return [days, pad(hours), pad(minutes)].join(':');
}
