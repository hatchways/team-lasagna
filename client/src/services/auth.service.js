import { BehaviorSubject } from "rxjs";
import axios from "axios";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("jwt"))
);

export const authenticationService = {
  login,
  logout,
  authHeader,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

async function login(email, password) {
  try {
    const res = await axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    });
    sessionStorage.setItem("jwt", JSON.stringify(res));
    currentUserSubject.next(res);
    const errMsg = "";
    return errMsg;
  } catch (err) {
    console.log(err);
    logout();
    return err.response.data.msg;
  }
}

function logout() {
  // delete the user from local storage
  localStorage.removeItem("jwt");
  currentUserSubject.next(null);
}
function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}
