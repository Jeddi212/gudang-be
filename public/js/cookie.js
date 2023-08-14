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
        return { name: "Guest", level: "GUEST" };
    }
}

function setUsername() {
    const usernameElement = document.getElementById('user-name');
    usernameElement.innerText = getUser().name;
}

function addBusyLoader(event) {
    event.target.setAttribute("aria-busy", "true");
}

function removeBusyLoader(event) {
    event.target.setAttribute("aria-busy", "false");
}

function logout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    }
}

document.addEventListener('htmx:responseError', function (event) {
    const errorResponse = event.detail.xhr.response;
    const targetElement = event.detail.target;
    targetElement.innerHTML = errorResponse;
});

htmx.on("htmx:beforeRequest", addAuthorizationHeader);
htmx.on("htmx:beforeRequest", addBusyLoader);
htmx.on("htmx:afterRequest", removeBusyLoader);