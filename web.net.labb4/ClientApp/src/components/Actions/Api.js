const baseHeaders = () => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (localStorage["userData"]) {
        headers.Authorization = 'Bearer ' + JSON.parse(localStorage["userData"]).token;
    }
    console.log("authheaders: ", headers);
    return headers;
}
export const login = async user => fetch("api/account/login", {
    headers: baseHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(user)
});
export const register = async user => fetch("api/account/register", {
    headers: baseHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(user)
});

export const logout = async () => fetch("api/account/logout", {
    headers: baseHeaders(),
    method: 'post',
    credentials: 'include'
});

//For all items
export const get = async (controller) => fetch("api/" + controller, {
    headers: baseHeaders(),
    method: 'get',
    credentials: 'include'
});

export const put = async (controller, id, obj) => fetch("api/" + controller + '/' + id, {
    headers: baseHeaders(),
    method: 'put',
    credentials: 'include',
    body: JSON.stringify(obj)
});

export const remove = async (controller, obj) => fetch("api/" + controller + obj.id, {
    headers: baseHeaders(),
    method: 'delete',
    credentials: 'include'
});

export const post = async (controller, obj) => fetch("api/" + controller, {
    headers: baseHeaders(),
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(obj)
});

export const loggedIn = async () => {
    const response = await fetch("api/account/loggedin", {
        headers: baseHeaders(),
        method: 'get',
        credentials: 'include'
    })
        .catch(error => error.status);
    switch (response.status) {
        case 200:
            console.log();
            return true;
        default:
            console.log(response);
            return false;
    }
};