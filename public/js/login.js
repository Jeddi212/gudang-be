function decodeJWT(jwt) {
    return JSON.parse(atob(jwt.split('.')[1]));
}

function setCookie(name, value, expiresInSeconds) {
    const date = new Date(Date.now() + (expiresInSeconds * 1000));
    document.cookie = `${name}=${encodeURIComponent(value || '')}; expires=${date.toUTCString()}; path=/`;
}

function handleLoginResponse(event) {
    var response = JSON.parse(event.detail.xhr.response);
    const jwt = response.data;

    if (jwt) {
        const expiresInSeconds = decodeJWT(jwt).exp - Math.floor(Date.now() / 1000);
        setCookie("jwt", jwt, expiresInSeconds);
        window.location.href = "/";
    } else {
        alert(response.message);
    }
}

htmx.on("#login-form", "htmx:afterRequest", handleLoginResponse);