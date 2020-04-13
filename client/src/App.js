import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import { authService } from "./services/auth.service";

import "./App.css";

function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isLoggedIn());
  }, []);

  const isLoggedIn = () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    console.log(jwt);
    if (jwt) {
      const decoded = jwtDecode(jwt.token);
      const currentTime = Date.now() / 1000;
      console.log(new Date(decoded.exp * 1000).toString());
      console.log(new Date(Date.now()));
      return currentTime < decoded.exp;
    }
    authService.logout();
    return false;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/payment"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="payment"
                    showSideBar={false}
                    isAuthed={authed}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/success/:id"
              render={(props) =>
                isLoggedIn() ? (
                  <LandingPage
                    {...props}
                    pathName="success"
                    showSideBar={false}
                    isAuthed={authed}
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
                  isAuthed={authed}
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
                  isAuthed={authed}
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
                    isAuthed={authed}
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
                    isAuthed={authed}
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
                    isAuthed={authed}
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
                    isAuthed={authed}
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
                    isAuthed={authed}
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
                    isAuthed={authed}
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
                  isAuthed={authed}
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
                  isAuthed={authed}
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
                  isAuthed={authed}
                />
              )}
            />
            <Route
              render={() => (
                <LandingPage
                  pathName="notFound"
                  showSideBar={false}
                  isAuthed={authed}
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
