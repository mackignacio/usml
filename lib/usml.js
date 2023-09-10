"use strict";
(() => {
  // src/utils/constants.ts
  var USML_PRE = "$";
  var USML_DATA = "data";
  var USML_FOR = "for";
  var USML_ITEM = "item";
  var USML_SWAP = "swap";
  var USML_VALUE = "value";
  var USML_MODEL = "model";
  var USML_SUBMIT = "submit";
  var USML_COMPONENT = "component";
  var USML_PROPS = "props";
  var USML_DIRECTIVES = [
    USML_DATA,
    USML_FOR,
    USML_ITEM,
    USML_SWAP,
    USML_VALUE,
    USML_MODEL,
    USML_SUBMIT,
    USML_COMPONENT,
    USML_PROPS
  ];
  var USML_LOAD = "load";
  var USML_CLICK = "click";
  var USML_MOUSE_ENTER = "mouse-enter";
  var USML_MOUSE_LEAVE = "mouse-leave";
  var USML_MOUSE_MOVE = "mouse-move";
  var USML_MOUSE_OUT = "mouse-out";
  var USML_MOUSE_OVER = "mouse-over";
  var USML_MOUSE_EVENT = [
    USML_CLICK,
    USML_MOUSE_ENTER,
    USML_MOUSE_LEAVE,
    USML_MOUSE_MOVE,
    USML_MOUSE_OUT,
    USML_MOUSE_OVER
  ];
  var USML_MOUSE_EVENT_OBJ = USML_MOUSE_EVENT.reduce((acc, cur) => {
    acc[cur] = cur.replace("-", "");
    return acc;
  }, {});
  var USML_SHOW = "show";
  var USML_HIDE = "hide";
  var USML_TOGGLE = "toggle";
  var USML_EVENT = [USML_SHOW, USML_HIDE, USML_TOGGLE];
  var USML_HIDDEN = "hidden";
  var USML_VISIBLE = "visible";
  var USML_VISIBILITY = [USML_HIDDEN, USML_VISIBLE];
  var USML_ACTION = [USML_LOAD, ...USML_VISIBILITY, ...USML_MOUSE_EVENT, ...USML_DIRECTIVES];
  var DOM = {
    LOADING: "loading",
    READY: "interactive",
    LOADED: "complete",
    EVENT: {
      READY_STATE: "readystatechange",
      CONTENT_LOADED: "DOMContentLoaded"
    }
  };
  var HTTP = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH",
    HEAD: "HEAD",
    OPTIONS: "OPTIONS"
  };
  var HTTP_LOW = Object.keys(HTTP).map((method) => method.toLocaleLowerCase());
  var HTTP_PAYLOAD = ["post", "put", "patch"];
  var INVALID_TAG = ["SCRIPT", "META", "TITLE"];
  var constants_default = {
    NOOP: () => {
    },
    USML_PRE,
    USML_DATA,
    USML_FOR,
    USML_ITEM,
    USML_SWAP,
    USML_MODEL,
    USML_SUBMIT,
    USML_COMPONENT,
    USML_PROPS,
    USML_ACTION,
    USML_MOUSE_EVENT,
    USML_MOUSE_EVENT_OBJ,
    USML_LOAD,
    USML_SHOW,
    USML_TOGGLE,
    USML_VISIBILITY,
    USML_VALUE,
    USML_HIDDEN,
    USML_VISIBLE,
    USML_EVENT,
    DOM,
    HTTP: {
      ...HTTP,
      PAYLOAD: HTTP_PAYLOAD,
      LOWERCASE: HTTP_LOW
    },
    INVALID_TAG
  };

  // src/utils/index.ts
  function getUSMLAction(target, attr) {
    return target.getAttribute(`${constants_default.USML_PRE}${attr}`);
  }
  function getElementByTarget(target) {
    const selector = target.includes("#") ? target.replace("#", "") : target;
    return document.getElementById(selector) ?? document.querySelector(selector);
  }
  function showHide(condition) {
    return condition ? constants_default.USML_VISIBLE : constants_default.USML_HIDDEN;
  }
  function parseAttr(attr) {
    const [cmd, ...rest] = attr.split(":");
    let target = rest.join(rest.length > 0 ? ":" : "");
    target = target === "" ? attr : target;
    if (!target && !attr)
      return null;
    return [cmd, target];
  }
  function getUsmlEvent(event) {
    return constants_default.USML_MOUSE_EVENT.includes(event) ? constants_default.USML_MOUSE_EVENT_OBJ[event] : event;
  }
  function regExec(selector, type) {
    let regex = /^[\#\.]?\w+$/;
    if (type === "fn") {
      regex = /(?<name>\w+)\((?<argvs>.*?)\)/;
    }
    if (type === "http") {
      regex = /^(?<protocol>https?:?\/{0,2})?(?<sub>[\w\.]*?)(?<domain>\w*?)(?<ext>\.\w*?)?(?<port>:?\d*?)(?<endpoint>[\/\w]*?)$/;
    }
    return regex.exec(selector);
  }
  function matcher(attr, type, cb) {
    const matched = regExec(attr, type);
    if (matched)
      cb(matched);
    return !!matched;
  }
  function traverseObj(keys, data) {
    if (keys.length === 0 || typeof data === "undefined")
      return data;
    return traverseObj(keys, data[keys.shift()]);
  }
  function stringInterpolation(el, json = {}) {
    let textContent = el.textContent ?? "";
    if (!textContent)
      return;
    const matches = textContent.match(/(?:\{{2})(?<value>.*?)(?:\}{2})/gim);
    matches?.forEach((match) => {
      const prop = match.replace(/\{{2}|\}{2}/gm, "");
      const data = traverseObj(prop.split("."), json);
      textContent = textContent.replace(match, data);
    });
    el.textContent = textContent;
    return el;
  }
  function setVisibility(el, attr) {
    const visibility = attr === constants_default.USML_HIDDEN ? constants_default.USML_HIDDEN : constants_default.USML_VISIBLE;
    el.style.visibility = visibility;
  }
  function toggleVisibility(target, cmd) {
    const isHidden = target.style.visibility === constants_default.USML_HIDDEN;
    const isToggled = constants_default.USML_TOGGLE === cmd;
    target.style.visibility = isToggled ? showHide(isToggled && isHidden) : showHide(constants_default.USML_SHOW === cmd);
  }
  function triggerVisibility(parent, [cmd, selector]) {
    return () => {
      if (parent === null)
        return;
      const target = selector.includes(".") ? parent.querySelectorAll(selector) : parent.querySelector(selector);
      if (target === null)
        return;
      if (target instanceof NodeList)
        return target.forEach((el) => toggleVisibility(el, cmd));
      toggleVisibility(target, cmd);
    };
  }
  function stringToJSON(data) {
    const replaced = data.replace(/['|"](\w)/g, `"$1`).replace(/(\w)['|"]/g, `$1"`).replace(/(\w+):/g, `"$1": `);
    return JSON.parse(replaced);
  }
  function jsonToArray(json) {
    return Array.isArray(json) ? json : [json];
  }

  // src/lib/directives.ts
  function loadData(el, data) {
    data = Array.isArray(data) ? data : [data];
    Array.from(el.children).forEach(dataDirective(el, data));
  }
  function dataDirective(parent, data) {
    return (el) => {
      const dataAttr = getUSMLAction(parent, constants_default.USML_DATA);
      if (!dataAttr)
        return;
      let isModified = false;
      for (const json of data) {
        const clone = el.cloneNode(true);
        const hasItem = forDirective(parent, clone, dataAttr, json);
        const hasValue = valueDirective(clone, dataAttr, json);
        isModified = hasItem || hasValue;
        if (isModified) {
          parent.appendChild(clone);
        }
      }
      if (isModified) {
        parent.removeChild(el);
      }
    };
  }
  function forDirective(parent, el, key, json = {}) {
    const forAttr = getUSMLAction(parent, constants_default.USML_FOR);
    if (forAttr === null)
      return false;
    return forItemDirective(el, forAttr, key, json);
  }
  function forItemDirective(el, forKey, key, json = {}) {
    const forItem = getUSMLAction(el, constants_default.USML_ITEM);
    if (!forItem || forItem !== forKey)
      return false;
    stringInterpolation(el, { [key]: json });
    return true;
  }
  function valueDirective(el, key, json = {}) {
    const valueAttr = getUSMLAction(el, constants_default.USML_VALUE);
    if (!valueAttr)
      return false;
    const data = traverseObj(valueAttr.split("."), { [key]: json });
    el.value = data;
    return true;
  }
  function swapDirective(el, data) {
    const swapAttr = getUSMLAction(el, constants_default.USML_SWAP);
    if (!swapAttr)
      return;
    const parse = parseAttr(swapAttr);
    if (!parse)
      return;
    const [_cmd, _target] = parse;
    if (_target === "innerHTML") {
      el.innerHTML = data;
      return;
    }
    if (_target.includes("#")) {
      const element = getElementByTarget(_target);
      if (!element)
        return;
      const newEl = htmlToElements(data);
      const parent = element?.parentNode ?? document.body;
      parent.insertBefore(newEl, element);
      parent.removeChild(element);
    }
  }
  function htmlToElements(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }

  // src/lib/http.ts
  function httpPromise(xhr) {
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
  function httpGET() {
    const method = constants_default.HTTP.GET;
    return (url, type) => httpPromise(createHttpRequest(url, method, type));
  }
  function httpPOST() {
    const method = constants_default.HTTP.POST;
    return (url, type, body) => httpPromise(createHttpRequest(url, method, type, body));
  }
  function httpPUT() {
    const method = constants_default.HTTP.PUT;
    return (url, type, body) => httpPromise(createHttpRequest(url, method, type, body));
  }
  function httpPATCH() {
    const method = constants_default.HTTP.PATCH;
    return (url, type, body) => httpPromise(createHttpRequest(url, method, type, body));
  }
  function httpDELETE() {
    const method = constants_default.HTTP.DELETE;
    return (url, type, body) => httpPromise(createHttpRequest(url, method, type, body));
  }
  function httpHEAD() {
    const method = constants_default.HTTP.HEAD;
    return (url, type) => httpPromise(createHttpRequest(url, method, type));
  }
  function httpOPTIONS() {
    const method = constants_default.HTTP.OPTIONS;
    return (url, type) => httpPromise(createHttpRequest(url, method, type));
  }
  function createHttpRequest(url, method, type, body = {}) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    const isJSON = typeof body === "object";
    const contentType = isJSON ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded";
    if (Object.keys(body).length > 0 && !isJSON)
      body = stringToJSON(body);
    xhr.setRequestHeader("Content-Type", contentType);
    xhr.responseType = type;
    xhr.send(JSON.stringify(body));
    return xhr;
  }
  var http = {
    get: httpGET(),
    post: httpPOST(),
    put: httpPUT(),
    patch: httpPATCH(),
    delete: httpDELETE(),
    head: httpHEAD(),
    options: httpOPTIONS()
  };
  function httpResponseError(err) {
    console.error(err);
  }
  function httpResponseHandler(el) {
    return (data) => {
      swapDirective(el, data);
      if (el.children.length === 0)
        return;
      loadData(el, data);
    };
  }
  function http_default(el, [_cmd, _target], payload) {
    if (typeof _target !== "string")
      return;
    const type = getUSMLAction(el, constants_default.USML_SWAP);
    return matcher(
      _target,
      "http",
      () => http[_cmd](_target, type ? "text" : "json", payload).then(httpResponseHandler(el)).catch(httpResponseError)
    );
  }

  // src/lib/components.ts
  var components = /* @__PURE__ */ new Map();
  function loadComponent(el) {
    const name = getUSMLAction(el, constants_default.USML_COMPONENT);
    if (!name)
      return;
    components.set(name, el);
    const props = getUSMLAction(el, constants_default.USML_PROPS);
    if (!props)
      return;
    const json = stringToJSON(props);
    for (const child of el.children) {
      stringInterpolation(child, { props: json });
    }
  }

  // src/lib/parser.ts
  function loadStandAloneAction(el, action) {
    if (constants_default.USML_VISIBILITY.includes(action)) {
      setVisibility(el, action);
    }
  }
  function loadActionHandler(el, action, attr, data = []) {
    const parse = parseAttr(attr);
    if (!parse)
      return true;
    if (constants_default.USML_MOUSE_EVENT.includes(action)) {
      loadMouseEvents(el, action, parse);
    }
    if (constants_default.USML_DATA === action) {
      loadDataDirective(el, parse);
    }
    if (constants_default.USML_COMPONENT === action) {
      loadComponent(el);
    }
    if (constants_default.USML_LOAD === action) {
      loadHandlers(el, parse);
    }
  }
  function loadDataDirective(el, [_cmd, _target]) {
    const data = getUSMLAction(el, constants_default.USML_VALUE);
    if (!data)
      return;
    const parsed = stringToJSON(data);
    loadData(el, jsonToArray(parsed));
  }
  function loadMouseEvents(el, action, [_cmd, _target]) {
    let trigger = null;
    if (constants_default.USML_EVENT.includes(_cmd)) {
      trigger = triggerVisibility(el.parentElement, [_cmd, _target]);
    }
    if (constants_default.USML_SUBMIT === _cmd) {
      trigger = () => triggerSubmit([_cmd, _target]);
    }
    if (!trigger && constants_default.USML_MOUSE_EVENT.includes(action)) {
      trigger = () => loadHandlers(el, [_cmd, _target]);
    }
    if (!trigger) {
      trigger = constants_default.NOOP;
    }
    el.addEventListener(getUsmlEvent(action), trigger);
  }
  function triggerSubmit([_cmd, _target]) {
    const element = getElementByTarget(_target);
    if (!element)
      return;
    const submitAttr = getUSMLAction(element, constants_default.USML_SUBMIT);
    if (!submitAttr)
      return;
    const parse = parseAttr(submitAttr);
    if (!parse)
      return;
    loadHandlers(element, parse);
  }
  function getHttpPayload(children) {
    const payload = {};
    for (const child of children) {
      const value = child?.value;
      const modelAttr = getUSMLAction(child, constants_default.USML_MODEL);
      if (!value || !modelAttr)
        continue;
      payload[modelAttr] = value;
    }
    return payload;
  }
  function loadHandlers(el, [_cmd, _target]) {
    if (constants_default.HTTP.LOWERCASE.includes(_cmd)) {
      const payload = constants_default.HTTP.PAYLOAD.includes(_cmd) ? getHttpPayload(el.children) : {};
      http_default(el, [_cmd, _target], payload);
    }
    const matchedFn = regExec(_target, "fn");
    if (matchedFn) {
      const { name, argvs } = matchedFn.groups;
      window[name](argvs);
    }
  }
  function loadElement(el, data) {
    for (const action of constants_default.USML_ACTION) {
      const attr = getUSMLAction(el, action);
      if (attr !== null)
        loadStandAloneAction(el, action);
      if (attr === null)
        continue;
      if (loadActionHandler(el, action, attr, data))
        continue;
    }
  }
  function loadChildren(children, data = []) {
    for (let child of children) {
      if (!constants_default.INVALID_TAG.includes(child.tagName)) {
        parser(child, data);
      }
    }
  }
  function parser(el, data = []) {
    loadElement(el, data);
    if (el.children.length === 0)
      return;
    loadChildren(el.children, data);
  }
  var parser_default = parser;

  // src/usml.ts
  document.addEventListener(constants_default.DOM.EVENT.READY_STATE, function() {
    if (document.readyState === constants_default.DOM.LOADING) {
    }
    if (document.readyState === constants_default.DOM.READY) {
      return parser_default(document.body);
    }
    if (document.readyState == constants_default.DOM.LOADED) {
    }
  });
  document.addEventListener(constants_default.DOM.EVENT.CONTENT_LOADED, () => {
  });
})();
