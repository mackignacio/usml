import {
  USMLLoad,
  USMLVisibility,
  USMLHidden,
  USMLVisible,
} from "./types";

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

const USML_ACTION: USMLAction[] = [USML_LOAD];

export default {
  USML_ACTION,
  USML_LOAD,
  USML_VISIBILITY,
  DOM,
};
