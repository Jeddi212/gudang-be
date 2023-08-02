document.addEventListener('htmx:responseError', function (event) {
    const errorResponse = event.detail.xhr.response;
    const targetElement = event.detail.target;
    targetElement.innerHTML = errorResponse;
});