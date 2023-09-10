import { HTTPMethodEvent, ResponseType, HTTPMethod, HTTPMethodFn } from "../utils/types";
import { getUSMLAction, matcher, stringToJSON } from "../utils";
import { loadData, swapDirective } from "./directives";
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

/**
 *
 * @returns
 */
function httpPATCH() {
  const method = constants.HTTP.PATCH;
  return (url: string, type: ResponseType, body: any) => httpPromise(createHttpRequest(url, method, type, body));
}

/**
 *
 * @returns
 */
function httpDELETE() {
  const method = constants.HTTP.DELETE;
  return (url: string, type: ResponseType, body: any) => httpPromise(createHttpRequest(url, method, type, body));
}

/**
 *
 * @returns
 */
function httpHEAD() {
  const method = constants.HTTP.HEAD;
  return (url: string, type: ResponseType) => httpPromise(createHttpRequest(url, method, type));
}

/**
 *
 * @returns
 */
function httpOPTIONS() {
  const method = constants.HTTP.OPTIONS;
  return (url: string, type: ResponseType) => httpPromise(createHttpRequest(url, method, type));
}

function createHttpRequest(url: string, method: HTTPMethod, type: ResponseType, body: any = {}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  const isJSON = typeof body === "object";
  const contentType = isJSON ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded";

  if (Object.keys(body).length > 0 && !isJSON) body = stringToJSON(body);

  xhr.setRequestHeader("Content-Type", contentType);
  xhr.responseType = type;
  xhr.send(JSON.stringify(body));

  return xhr;
}

// TODO: Create a function that dynamically create these HTTP methods function
const http = {
  get: httpGET(),
  post: httpPOST(),
  put: httpPUT(),
  patch: httpPATCH(),
  delete: httpDELETE(),
  head: httpHEAD(),
  options: httpOPTIONS(),
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
    // Load element with `$swap` directive
    swapDirective(el, data);

    // If no children will not proceed
    if (el.children.length === 0) return;

    // Load element with `$for` directive
    loadData(el, data);
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
  let type = getUSMLAction(el, constants.USML_SWAP);

  return matcher(_target, "http", () =>
    http[_cmd as HTTPMethodEvent](_target, type && !type?.includes("component") ? "text" : "json", payload)
      .then(httpResponseHandler(el))
      .catch(httpResponseError)
  );
}
