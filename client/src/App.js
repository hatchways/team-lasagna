import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
            <Route
              exact
              path="/signup"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="signup"
                  showSideBar={false}
                  isAuthed={false}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="login"
                  showSideBar={false}
                  isAuthed={false}
                />
              )}
            />
            <Route
              exact
              path="/editProfile"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="editProfile"
                  showSideBar={true}
                  isAuthed={true}
                />
              )}
            />
            <Route
              exact
              path="/profilePhoto"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="profilePhoto"
                  showSideBar={true}
                  isAuthed={true}
                />
              )}
            />
            <Route
              exact
              path="/availability"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="availability"
                  showSideBar={true}
                  isAuthed={true}
                />
              )}
            />
            <Route
              exact
              path="/payment"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="payment"
                  showSideBar={true}
                  isAuthed={true}
                />
              )}
            />
            <Route
              exact
              path="/security"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="security"
                  showSideBar={true}
                  isAuthed={true}
                />
              )}
            />
            <Route
              exact
              path="/settings"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="settings"
                  showSideBar={true}
                  isAuthed={true}
                />
              )}
            />
            <Route
              exact
              path="/profile-listing"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="profile-listing"
                  showSideBar={false}
                  isAuthed={false}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="editProfile"
                  showSideBar={true}
                  isAuthed={false}
                />
              )}
            />
            <Route
              render={() => (
                <LandingPage
                  pathName="notFound"
                  showSideBar={false}
                  isAuthed={false}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
