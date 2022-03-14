export const apiWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    }
    return  fetch(url, requestOptions).then(handleResponse)
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader(url)
    }
    return fetch(url, requestOptions).then(handleResponse)
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: authHeader(url)
    }
    return fetch(url, requestOptions).then(handleResponse)
}

function _delete(url) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(url)
    }
    return fetch(url, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
// console.log(response, data);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // userService.logout();------------------------------------------------------------pending
            }

            const error = (data && data?.message) || response?.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}


function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    // const user = userService.userValue;
    // const isLoggedIn = user && user.token;
    // const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    // if (isLoggedIn && isApiUrl) {
    //     return { Authorization: `Bearer ${user.token}` };
    // } else {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    // }
}