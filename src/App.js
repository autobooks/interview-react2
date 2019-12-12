import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import ActivityLog from './components/ActivityLog';
import { StoreProvider } from "./store";
import initialState from "./store/initialState";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5FB9A6',
      transparent: 'rgba(95, 185, 166, 0.5)'
    },
    secondary: {
      main: '#C68A77'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
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

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider initialState={initialState}>
        <div className={classes.root}>
          <ActivityLog />
          <Fab color="primary" aria-label="add">
            <Icon>add</Icon>
          </Fab>
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
