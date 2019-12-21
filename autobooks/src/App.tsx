import React, {Component} from 'react';
import './App.css';
import {AppHeader} from "./header/appHeader";
import {Grid} from "@material-ui/core";
import {TimerButton} from "./timer/timerButton";
import {AutoBooksTable, TimeEntry} from "./autoBooksTable/autoBooksTable";

interface TimeEntryState {
    timeEntries: TimeEntry[];
    clockedIn: boolean;
}

export default class App extends Component<{}, TimeEntryState> {
    state: TimeEntryState = {
        timeEntries: [],
        clockedIn: false
    };
    getDerivedStateFromProps(prevState: TimeEntryState) {
        alert(JSON.stringify(prevState));
        sessionStorage.setItem('clockInTimes', JSON.stringify(this.state));
    }
    private onClockInPressed = async () => {
        let newTimeEntry: TimeEntry = {
            clockInTime: Date.now()
        };
        await this.setState(prevState => ({
            timeEntries: [...prevState.timeEntries, newTimeEntry],
            clockedIn: true
        }));
        sessionStorage.setItem('clockInTimes', JSON.stringify(this.state));
    };
    private onClockOutPressed =  async () => {
        const newTimeEntries = this.state.timeEntries;
        const lastItem = newTimeEntries.length - 1;
        newTimeEntries[lastItem].clockOutTime = Date.now();
        await this.setState({
            timeEntries: newTimeEntries,
            clockedIn: false
        });
        sessionStorage.setItem('clockInTimes', JSON.stringify(this.state));
    };
    componentDidMount() {
        let sessionData = sessionStorage.getItem('clockInTimes');
        if(sessionData) {
            let sessionDataJSON: TimeEntryState = JSON.parse(sessionData);
            this.setState({
                timeEntries: sessionDataJSON.timeEntries,
                clockedIn: sessionDataJSON.clockedIn
            });
        }
    }
    render() {
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <AppHeader/>
                    <AutoBooksTable newClockInInstances={this.state.timeEntries}/>
                    <TimerButton onPressClockIn={this.onClockInPressed} onPressClockOut={this.onClockOutPressed} isClockedIn={this.state.clockedIn}/>
                </Grid>
            </div>
        )
    }

}