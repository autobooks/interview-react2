import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { useStore } from '../store';

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    position: 'absolute',
    bottom: -100,
    right: 0
  },
}));

export default function Activity({activity}) {
  const classes = useStyles();

  const [{ dialogActive }, dispatch] = useStore();

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={dialogActive}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <div>Test</div>
    </Dialog>
  );
}
