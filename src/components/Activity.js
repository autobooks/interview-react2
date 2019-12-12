import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Activity({activity}) {
  const classes = useStyles();

  console.log(activity.startTime);

  const startTime = new Date(activity.startTime);

  const endTime = new Date(startTime.getTime() + activity.duration);

  const durationString = daysHoursMinutes(activity.duration);

  return (
      <TableRow>
        <TableCell align="right">{startTime.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
        <TableCell align="right">{endTime.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</TableCell>
        <TableCell align="right">{durationString}</TableCell>
        <TableCell align="right">{activity.description}</TableCell>
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
