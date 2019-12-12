import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Activity from './Activity';
import AddActivityButton from './AddActivityButton';
import { useStore } from '../store';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ActivityLog() {
  const classes = useStyles();

  const [{ activities }, dispatch] = useStore();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableCell align="right">Start Time</TableCell>
          <TableCell align="right">End Time</TableCell>
          <TableCell align="right">Duration</TableCell>
          <TableCell align="right">Description</TableCell>
        </TableHead>
        <TableBody>
          {activities.map(activity => (
            <Activity key={activity.id} activity={activity} />
          ))}
        </TableBody>
        </Table>
        <AddActivityButton />
    </Paper>
  );
}
