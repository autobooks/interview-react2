import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { useStore } from '../store';
import { addActivity, setActivityDialog } from '../actions';

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    position: 'absolute',
    bottom: -100,
    right: 0
  },
}));

export default function Activity({activity}) {
  const classes = useStyles();

  const [{ addActivityDialogActive }, dispatch] = useStore();

  const handleSubmit = () => dispatch(addActivity({
    description: 'Do all the things',
    startTime: new Date(),
    duration: 240000
  }));

  console.log('dialog active:',addActivityDialogActive);

  const handleClose = () => {
      dispatch(setActivityDialog(false));
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={addActivityDialogActive}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <div>Test</div>
    </Dialog>
  );
}
