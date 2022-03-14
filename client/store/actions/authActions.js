import { apiWrapper } from "../../helpers/apiWrapper";
import { AUTHENTICATE, DEAUTHENTICATE } from "../actionTypes";
import cookie from "js-cookie";

export const authenticate = (user) => (dispatch) =>
 apiWrapper.post(`/api/users/signin`, user).then((data) => {
    setCookie("token", data.id);
    // Router.push("/");
    dispatch({ type: AUTHENTICATE, payload: data.id });
  })
  .catch((err) => console.log(err));

export const signup = (user) => (dispatch) =>
 apiWrapper.post(`/api/users/signup`, user).then((data) => {
    setCookie("token", data.id);
    // Router.push("/");
    dispatch({ type: AUTHENTICATE, payload: data.id });
  })
  .catch((err) => console.log(err));

  

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
