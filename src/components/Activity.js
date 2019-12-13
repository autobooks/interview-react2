import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { useStore } from '../store';
import { setActivityTimeRunning, setActivityTimeSpent, setActivityFinished } from '../actions';

const useStyles = makeStyles(theme => ({
  activity: {
    position: 'relative',
    '&:after': {
      height: '81px',
      width: 'calc(var(--percent-complete) * 100%)',
      content: "''",
      position: 'absolute',
      left: 0
    }
  },
  timeRunning: {
    backgroundColor: 'rgba(76, 175, 80, 0.32)',
    '&:after': {
      backgroundColor: 'rgba(76, 175, 80, 0.2)'
    }
  },
  timePaused: {
    backgroundColor: 'rgba(255, 193, 7, 0.22)',
    '&:after': {
      backgroundColor: 'rgba(255, 193, 7, 0.2)'
    }
  },
  done: {
    backgroundColor: 'rgba(44, 119, 184, 0.97)',
    '&:after': {
      backgroundColor: 'rgba(44, 119, 184, 0)'
    }
  }
}));

export default function Activity({activity}) {
  const classes = useStyles();

  //set local state
  const [currentTime, setCurrentTime] = useState(new Date());

  //calculating relative time
  const startTime = new Date(activity.startTime);

  const timeRemaining = Math.max(0, activity.duration - activity.timeSpent);

  const durationString = msToTime(timeRemaining);

  const timeForTask = (startTime < currentTime && timeRemaining !== 0);

  const timeRunning = timeForTask && !activity.paused;

  //update time count
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
      if(!activity.paused && timeForTask) {
        const timeSpent = activity.timeSpent + 1000;
        if(!isNaN(timeSpent)) {
          console.log('setting time',timeSpent);
          dispatch(setActivityTimeSpent({timeSpent, id: activity.id}));
        }

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
    else if(activity.finished) {
      icon = "";
      disabledButton = true;
      activityClass = "";
      dispatch(setActivityFinished({
        finished: true,
        endTime:new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }),
        id: activity.id
      }));
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


  const percentComplete = (activity.timeSpent / activity.duration);
  const percentCompleteValue = percentComplete <= 1 ? percentComplete : 1;
  const endTime = activity.endTime ? activity.endTime : "";

  return (
      <TableRow className={activityClass + " " + classes.activity} style={{"--percent-complete": percentCompleteValue}}>
        <TableCell align="right">{startTime.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
        <TableCell align="right">{endTime}</TableCell>
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

function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
