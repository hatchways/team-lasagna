import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import { isLoggedIn } from "./utils/checkToken";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/success/:id"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="success"
                    showSideBar={false}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/bank-account/success"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="bank-account/success"
                    showSideBar={false}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="signup"
                  showSideBar={false}
                  isAuthed={isLoggedIn}
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
                  isAuthed={isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/editProfile"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="editProfile"
                    showSideBar={true}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/profilePhoto"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="profilePhoto"
                    showSideBar={true}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/availability"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="availability"
                    showSideBar={true}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/bookings"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="bookings"
                    showSideBar={false}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/upcomingJobs"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="upcomingJobs"
                    showSideBar={false}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/completedJobs"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="completedJobs"
                    showSideBar={false}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/payment"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="payment"
                    showSideBar={true}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/payment/add"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="payment/add"
                    showSideBar={false}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/security"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="security"
                    showSideBar={true}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/settings"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="settings"
                    showSideBar={true}
                    isAuthed={isLoggedIn}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/profile-listing"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="profile-listing"
                  showSideBar={false}
                  isAuthed={isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/sitter-profile"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="sitter-profile"
                  showSideBar={false}
                  isAuthed={isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <LandingPage
                  {...props}
                  pathName="profile-listing"
                  showSideBar={false}
                  isAuthed={isLoggedIn}
                />
              )}
            />
            <Route
              render={() => (
                <LandingPage
                  pathName="notFound"
                  showSideBar={false}
                  isAuthed={isLoggedIn}
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
