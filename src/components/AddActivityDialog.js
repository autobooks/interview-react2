import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useStore } from '../store';
import { addActivity, setActivityDialog } from '../actions';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 20
  },
}));

export default function AddActivityDialog({activity}) {
  const classes = useStyles();

  //init local state with hoooks
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [description, setDescription] = useState("");

  const [duration, setDuration] = useState(600000);

  const [{ addActivityDialogActive }, dispatch] = useStore()

  //event handlers to update state locally
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleDurationChange = e => {
    setDuration(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  //event handlers to update state globally
  const handleSubmit = () => {
      dispatch(addActivity({
      description,
      startTime: selectedDate,
      duration,
      paused: false,
      timeSpent: 0
    }));
    dispatch(setActivityDialog(false));
  }

  const handleClose = () => {
      dispatch(setActivityDialog(false));
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={addActivityDialogActive}>
      <DialogTitle >Add an Activity</DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column">
          <TextField value={description} onChange={handleDescriptionChange} label="Description" />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              margin="normal"
              label="Activity Start Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              label="Activity Start Time"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Activity Duration</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={duration}
              onChange={handleDurationChange}
            >
              <MenuItem value={600000}>10 Minutes</MenuItem>
              <MenuItem value={1800000}>30 Minutes</MenuItem>
              <MenuItem value={3600000}>60 Minutes</MenuItem>
            </Select>
          </FormControl>
          <Button className={classes.button} onClick={handleSubmit} variant="contained" color="primary">
            Add Activity
          </Button>
        </Grid>

      </DialogContent>

    </Dialog>
  );
}
