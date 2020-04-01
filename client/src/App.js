import React from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Register from "./Components/Register/Register"

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Register} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
