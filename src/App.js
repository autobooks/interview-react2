import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ActivityLog from './components/ActivityLog';
import { StoreProvider } from "./store";
import initialState from "./store/initialState";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {
  return (
    <StoreProvider initialState={initialState}>
      <div className="App">
        <ActivityLog />
      </div>
    </StoreProvider>
  );
}

export default App;
