import React from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/signup' 
            render={(props) => <LandingPage {...props} pathName="signup" showSideBar={false} isAuthed={false} />}
          />
          <Route exact path='/dashboard' 
            render={(props) => <LandingPage {...props} pathName="dashboard" showSideBar={true} isAuthed={false} />}
          />
          <Route exact path='/profilephoto' 
            render={(props) => <LandingPage {...props} pathName="profilephoto" showSideBar={true} isAuthed={false} />}
          />
          <Route path='/' 
            render={(props) => <LandingPage {...props} pathName="dashboard"  showSideBar={true} isAuthed={false} />}
          />
        </Switch>
      </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
