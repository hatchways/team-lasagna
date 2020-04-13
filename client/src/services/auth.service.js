import { BehaviorSubject } from "rxjs";
import axios from "axios";
import jwtDecode from "jwt-decode";
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("jwt"))
);
const currentUserProfileSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("profile"))
);

export const authService = {
  login,
  logout,
  authHeader,
  currentUser: currentUserSubject.asObservable(),
  currentUserProfile: currentUserProfileSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  get currentUserProfileValue() {
    return currentUserProfileSubject.value;
  },
};

async function login(email, password) {
  try {
    const res = await axios.post("/login", {
      email: email,
      password: password,
    });
    const user = res.data;
    localStorage.setItem("jwt", JSON.stringify(user));
    currentUserSubject.next(user);
    getUserProfile();
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
  localStorage.clear();
  currentUserSubject.next(null);
}
function authHeader() {
  // return authorization header with jwt token
  const currentUser = authService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}
async function getUserProfile() {
  const currentUser = authService.currentUserValue;
  if (currentUser) {
    const jwt = currentUser.token;
    const decoded = jwtDecode(jwt);
    try {
      const profileRes = await axios.get("/profile/user/" + decoded._id, {
        headers: authHeader(),
      });
      localStorage.setItem("profile", JSON.stringify(profileRes.data));
    } catch (err) {
      console.log(err);
    }
  }
}
