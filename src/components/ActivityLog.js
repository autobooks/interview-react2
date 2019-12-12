import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableBody';
import Activity from './Activity';

import * as store from '../store';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ActivityLog() {
  const classes = useStyles();

  const [{ activities }, dispatch] = store.useStore();

  return (
    <div className={classes.root}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
      </TableHead>
      <TableBody>
        {activities.map(activity => (
          <Activity activity={activity} />
        ))}
      </TableBody>
      </Table>
    </div>
  );
}
