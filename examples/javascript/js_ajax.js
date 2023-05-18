const ERROR = {
  NOT_SUPPORTED: 'XMLHttpRequest NOT SUPPORTED',
};

export function ajax({ url, header, body, params, method, responseType, timeout }, onSuccess, onError) {
  if (typeof XMLHttpRequest === 'undefined') {
    console.error(ERROR.NOT_SUPPORTED);
    onError && onError(ERROR.NOT_SUPPORTED);
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
        onSuccess && onSuccess(xhr.response);
      } else {
        onError && onError(xhr.response);
      }
    }
  };
  xhr.onerror = function () {
    onError && onError(xhr.response);
  };
  xhr.ontimeout = function () {
    onError && onError(xhr.response);
  };
  xhr.send(body);
}

export function ajaxPromise({ url, header, body, params, method, responseType, timeout }) {
  return new Promise((resolve, reject) => {
    ajax({ url, header, body, params, method, responseType, timeout }, resolve, reject);
  });
}
