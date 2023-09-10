import parser from "./lib/parser";
import constants from "./utils/constants";

// https://stackoverflow.com/questions/52150531/is-it-possible-to-read-the-html-body-before-the-dom-ready-event
document.addEventListener(constants.DOM.EVENT.READY_STATE, function (): void {
  // document is loading, does not fire here since no change from "loading" to "loading"
  if (document.readyState === constants.DOM.LOADING) {
    // TODO: usml.init()
  }

  // document fully read. Fires before DOMContentLoaded
  if (document.readyState === constants.DOM.READY) {
    return parser(document.body);
  }

  if (document.readyState == constants.DOM.LOADED) {
    //document fully read and all resources (like images) loaded. fires after DOMContentLoaded
    // TODO: usml.afterLoad();
  }
});

// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener(constants.DOM.EVENT.CONTENT_LOADED, () => {
  // TODO: usml.contentLoad()
});
