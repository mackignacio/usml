import { HTTPMethodEvent, ResponseType, HTTPMethod, HTTPMethodFn } from "../utils/types";
import constants from "../utils/constants";

/**
 *
 * @param xhr
 * @returns
 */
function httpPromise(xhr: XMLHttpRequest) {
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const data = xhr.response;
        resolve(data);
      } else {
        reject(`HTTP Error: ${xhr.status}`);
      }
    };
  });
}

/**
 *
 * @returns
 */
function httpGET() {
  const method = constants.HTTP.GET;
  return (url: string, type: ResponseType) => httpPromise(createHttpRequest(url, method, type));
}

/**
 *
 * @returns
 */
function httpPOST() {
  const method = constants.HTTP.POST;
  return (url: string, type: ResponseType, body: any) => httpPromise(createHttpRequest(url, method, type, body));
}

/**
 *
 * @returns
 */
function httpPUT() {
  const method = constants.HTTP.PUT;
  return (url: string, type: ResponseType, body: any) => httpPromise(createHttpRequest(url, method, type, body));
}

function createHttpRequest(url: string, method: HTTPMethod, type: ResponseType, body: any = {}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  const isJSON = typeof body === "object";
  const contentType = isJSON ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded";

  xhr.setRequestHeader("Content-Type", contentType);
  xhr.responseType = type;
  xhr.send(JSON.stringify(body));

  return xhr;
}

// TODO: Create a function that dynamically create these HTTP methods function
const http = {
  get: httpGET(),
} as HTTPMethodFn<unknown>;

/**
 *
 * @param err
 */
export function httpResponseError(err: any) {
  console.error(err);
}

/**
 *
 * @param el
 * @returns
 */
function httpResponseHandler(el: HTMLElement) {
  return (data: any | any[]) => {
  };
}

/**
 *
 * @param attr
 * @param el
 * @returns
 */
export default function (el: HTMLElement, [_cmd, _target]: [string, string], payload: { [x: string]: any }) {
  if (typeof _target !== "string") return;
  const type = getUSMLAction(el, constants.USML_SWAP);

  return matcher(_target, "http", () =>
    http[_cmd as HTTPMethodEvent](_target, type ? "text" : "json", payload)
      .then(httpResponseHandler(el))
      .catch(httpResponseError)
  );
}
