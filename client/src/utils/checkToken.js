import jwtDecode from "jwt-decode";
import { authService } from "../services/auth.service";

export const isLoggedIn = () => {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  // console.log(jwt);
  if (jwt) {
    const decoded = jwtDecode(jwt.token);
    const currentTime = Date.now();
    // console.log(new Date(decoded.exp * 1000).toString());
    // console.log(new Date(Date.now()));
    return currentTime < decoded.exp * 1000;
  }
  authService.logout();
  // setAuthed(false);
  return false;
};
