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

const USML_HIDDEN: USMLHidden = "hidden";
const USML_VISIBLE: USMLVisible = "visible";
const USML_VISIBILITY: USMLVisibility[] = [USML_HIDDEN, USML_VISIBLE];
const USML_ACTION: USMLAction[] = [USML_LOAD, ...USML_VISIBILITY];

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
};
const HTTP_LOW: HTTPMethodEvent[] = Object.keys(HTTP).map((method) => method.toLocaleLowerCase() as HTTPMethodEvent);


export default {
  USML_PRE,
  USML_SWAP,
  USML_MODEL,
  USML_ACTION,
  USML_LOAD,
  USML_VISIBILITY,
  USML_HIDDEN,
  USML_VISIBLE,
  DOM,
  HTTP: {
    ...HTTP,
    LOWERCASE: HTTP_LOW,
  },
};
