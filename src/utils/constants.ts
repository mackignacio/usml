import {
  USMLLoad,
} from "./types";

const USML_LOAD: USMLLoad = "load";

const DOM = {
  LOADING: "loading",
  READY: "interactive",
  LOADED: "complete",
  EVENT: {
    READY_STATE: "readystatechange",
    CONTENT_LOADED: "DOMContentLoaded",
  },
};

const USML_ACTION: USMLAction[] = [USML_LOAD];

export default {
  USML_ACTION,
  USML_LOAD,
  DOM,
};
