import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import ActivityLog from './components/ActivityLog';
import AddActivityButton from './components/AddActivityButton';
import { StoreProvider } from "./store";
import initialState from "./store/initialState";
import reducers from "./reducers"


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
      transparent: 'rgba(95, 185, 166, 0.5)'
    },
    secondary: {
      main: '#f44336'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

function App() {

  const classes = useStyles();

  console.log(reducers);

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider reducer={reducers} initialState={initialState}>
        <div className={classes.root}>
          <ActivityLog />
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
