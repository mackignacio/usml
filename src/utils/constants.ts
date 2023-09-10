import {
  USMLLoad,
  USMLSwap,
  USMLVisibility,
  HTTPMethodKey,
  USMLHidden,
  USMLVisible,
} from "./types";

const USML_SWAP: USMLSwap = "swap";
const USML_MODEL: USMLModel = "model";

const USML_LOAD: USMLLoad = "load";
const USML_CLICK = "click";
const USML_MOUSE_ENTER = "mouse-enter";
const USML_MOUSE_LEAVE = "mouse-leave";
const USML_MOUSE_MOVE = "mouse-move";
const USML_MOUSE_OUT = "mouse-out";
const USML_MOUSE_OVER = "mouse-over";
const USML_MOUSE_EVENT: USMLMouseEvent[] = [
  USML_CLICK,
  USML_MOUSE_ENTER,
  USML_MOUSE_LEAVE,
  USML_MOUSE_MOVE,
  USML_MOUSE_OUT,
  USML_MOUSE_OVER,
];

const USML_SHOW = "show";
const USML_HIDE = "hide";
const USML_TOGGLE = "toggle";
const USML_EVENT: USMLEvent[] = [USML_SHOW, USML_HIDE, USML_TOGGLE];

const USML_HIDDEN: USMLHidden = "hidden";
const USML_VISIBLE: USMLVisible = "visible";
const USML_VISIBILITY: USMLVisibility[] = [USML_HIDDEN, USML_VISIBLE];
const USML_ACTION: USMLAction[] = [USML_LOAD, ...USML_VISIBILITY, ...USML_MOUSE_EVENT];

const DOM = {
  LOADING: "loading",
  READY: "interactive",
  LOADED: "complete",
  EVENT: {
    READY_STATE: "readystatechange",
    CONTENT_LOADED: "DOMContentLoaded",
  },
};

const HTTP: HTTPMethodKey = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  PATCH: "PATCH",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
};

const HTTP_LOW: HTTPMethodEvent[] = Object.keys(HTTP).map((method) => method.toLocaleLowerCase() as HTTPMethodEvent);
const HTTP_PAYLOAD: HTTPMethodEvent[] = ["post", "put", "patch"];


export default {
  NOOP: () => {},
  USML_PRE,
  USML_DATA,
  USML_FOR,
  USML_ITEM,
  USML_SWAP,
  USML_MODEL,
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
    LOWERCASE: HTTP_LOW,
  },
  INVALID_TAG,
};
