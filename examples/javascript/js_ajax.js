export function ajax({ url, header, body, params, method, responseType, timeout }, success, error) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }
  const xhr = new XMLHttpRequest();
  const requestUrl = params ? `${url}?${params}` : url;
  xhr.open(method, requestUrl, true);
  xhr.responseType = responseType;
  xhr.timeout = timeout;
  if (header) {
    Object.keys(header).forEach((key) => {
      xhr.setRequestHeader(key, header[key]);
    });
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        success && success(xhr.response);
      } else {
        error && error(xhr.response);
      }
    }
  };
  xhr.onerror = function () {
    error && error(xhr.response);
  };
  xhr.ontimeout = function () {
    error && error(xhr.response);
  };
  xhr.send(body);
}

export function ajaxPromise({ url, header, body, params, method, responseType, timeout }) {
  return new Promise((resolve, reject) => {
    ajax({ url, header, body, params, method, responseType, timeout }, resolve, reject);
  });
}
