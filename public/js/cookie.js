function decodeJWT(jwt) {
    return JSON.parse(atob(jwt.split('.')[1]));
}

function getCookie(name) {
    const cookieName = encodeURIComponent(name) + "=";
    const cookieArray = document.cookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }

    return null;
}

function addAuthorizationHeader(event) {
    const jwt = getCookie('jwt');
    if (jwt) {
        event.detail.xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
    }
}

function getUser() {
    const jwtCookie = getCookie('jwt');
    if (jwtCookie) {
        const jwt = decodeJWT(jwtCookie);
        return jwt.payload;
    } else {
        return { name: "User", level: "GUEST" };
    }
}

function setUsername() {
    const usernameElement = document.getElementById('user-name');
    usernameElement.innerText = getUser().name;
}

htmx.on("htmx:beforeRequest", addAuthorizationHeader);