import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import { useStore } from '../store';
import { setActivityDialog } from '../actions';

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    position: 'absolute',
    bottom: -100,
    right: 0
  },
}));

export default function Activity({activity}) {
  const classes = useStyles();

  const [{ activities }, dispatch] = useStore();

  const handleClick = () => {
    dispatch(setActivityDialog(true));
  };

  return (
    <div className={classes.buttonWrapper}>
      <Fab onClick={handleClick} color="primary" aria-label="add">
        <Icon>add</Icon>
      </Fab>
    </div>
  );
}
