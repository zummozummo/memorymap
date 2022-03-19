import { apiWrapper } from "../../helpers/apiWrapper";
import { AUTHENTICATE, DEAUTHENTICATE, SIGNIN_AUTH, SIGNUP_AUTH, SIGNOUT_AUTH } from "../actionTypes";
import cookie from "js-cookie";

export const authenticate = (user) => (dispatch) =>
 apiWrapper.post(`/api/users/signin`, user).then((data) => {
    setCookie("token", data.id);
    localStorage.setItem("token", data.id);
    dispatch({ type: SIGNIN_AUTH, payload: data.id });
  })
  .catch((err) => console.log(err));

export const signup = (user) => (dispatch) =>
 apiWrapper.post(`/api/users/signup`, user).then((data) => {
    setCookie("token", data.id);
    localStorage.setItem("token", data.id);

    dispatch({ type: SIGNUP_AUTH, payload: data.id });
  })
  .catch((err) => console.log(err));

  export const logout = () => (dispatch) =>
  apiWrapper.get(`/api/users/signout`).then((data) => {
     setCookie("token", null);
     localStorage.setItem("token", null);
 
     dispatch({ type: SIGNOUT_AUTH });
   })
   .catch((err) => console.log(err));



  //  export const logout = () => (dispatch) =>
  // console.log("llllllllllllllllllllllllllll");
  // apiWrapper.get(`/api/users/signout`).then(() => {
  //    setCookie("token", null);
  //    localStorage.setItem("token", null);
 
  //    dispatch({ type: SIGNOUT_AUTH });
  //  })
  //  .catch((err) => console.log(err));
   
  
// export const login = (credentials) => async (dispatch) => {
//     const response = await (useRequest({
//         url: '/api/users/signin',
//         method: 'post',
//         body: {
            
//         }
//     }))()
//     if (response.errors) {
//         this.setState({ errors: response.errors })
//     } else {
//         console.log(response)
//         Router.push('/getting-started')
//     }
// }


export const setCookie = (key, value) => {
  
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};
