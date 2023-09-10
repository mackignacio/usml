import {
  HTTPMethodEvent,
  USMLAction,
  USMLMouseEvent,
  USMLValue,
  USMLVisibility,
  USMLVisibilityEvent,
} from "../utils/types";
import {
  getUsmlEvent,
  setVisibility,
  parseAttr,
  triggerVisibility,
  getUSMLAction,
  regExec,
  stringToJSON,
  jsonToArray,
} from "../utils";
import constants from "../utils/constants";
import http from "./http";
import { loadData } from "./directives";

/**
 *
 * @param el
 * @param action
 */
function loadStandAloneAction(el: HTMLElement, action: USMLAction) {
  // Current element only has an usml attribute name with no value i.e `usml-hidden` instead of `usml-hidden="value"`
  if (constants.USML_VISIBILITY.includes(action as USMLVisibility)) {
    setVisibility(el, action as USMLVisibility);
  }
}

/**
 *
 * @param el
 * @param action
 * @param attr
 * @param data
 * @returns
 */
function loadActionHandler(el: HTMLElement, action: USMLAction, attr: string, data: any | any[] = []) {
  const parse = parseAttr(attr);

  if (!parse) return true;

  if (constants.USML_MOUSE_EVENT.includes(action as USMLMouseEvent)) {
    loadMouseEvents(el, action, parse);
  }

  if (constants.USML_DATA === action) {
    loadDataDirective(el, parse);
  }

  if (constants.USML_LOAD === action) {
    loadHandlers(el, parse);
  }
}

/**
 *
 * @param el
 * @param tuple
 * @returns
 */
function loadDataDirective(el: HTMLElement, [_cmd, _target]: [string, string]) {
  const data = getUSMLAction(el, constants.USML_VALUE);

  // Null check
  if (!data) return;

  const parsed = stringToJSON(data);
  loadData(el, jsonToArray(parsed));
}

/**
 *
 * @param el
 * @param action
 * @param param2
 */
function loadMouseEvents(el: HTMLElement, action: USMLAction, [_cmd, _target]: [string, string]) {
  let trigger = null;

  if (constants.USML_EVENT.includes(_cmd as USMLVisibilityEvent)) {
    trigger = triggerVisibility(el.parentElement, [_cmd, _target]);
  }

  if (!trigger) {
    trigger = constants.NOOP;
  }

  el.addEventListener(getUsmlEvent(action), trigger);
}


/**
 *
 * @param children
 * @returns
 */
function getHttpPayload(children: HTMLCollection) {
  const payload: { [x: string]: any } = {};

  for (const child of children) {
    const value = (child as HTMLInputElement)?.value;
    const modelAttr = getUSMLAction(child as HTMLElement, constants.USML_MODEL);

    if (!value || !modelAttr) continue;

    payload[modelAttr] = value;
  }

  return payload;
}

/**
 *
 * @param el
 * @param tuple
 */
function loadHandlers(el: HTMLElement, [_cmd, _target]: [string, string]) {
  if (constants.HTTP.LOWERCASE.includes(_cmd as HTTPMethodEvent)) {
    const payload = constants.HTTP.PAYLOAD.includes(_cmd as HTTPMethodEvent) ? getHttpPayload(el.children) : {};
    http(el, [_cmd, _target], payload);
  }

  const matchedFn = regExec(_target, "fn");

  if (matchedFn) {
    const { name, argvs } = (matchedFn as any).groups;
    (window[name] as any)(argvs);
  }
}

/**
 * Load element with USML attributes and values
 * @param el
 */
function loadElement(el: HTMLElement, data: any | any[]) {
  for (const action of constants.USML_ACTION) {
    const attr = getUSMLAction(el, action);

    // Load stand alone action that doesn't require any handler
    // Accepts empty string but not null
    if (attr !== null) loadStandAloneAction(el, action as USMLValue);

    // Skip element if attr is null
    if (attr === null) continue;

    // Load actions with handlers
    if (loadActionHandler(el, action, attr, data)) continue;
  }
}

/**
 *
 * @param children
 */
export function loadChildren(children: HTMLCollectionOf<Element>, data: any | any[] = []) {
  // Loop through all child elements
  for (let child of children) {
    // Check for non script tag
    if (!constants.INVALID_TAG.includes(child.tagName)) {
      // Start recursion sequence
      parser(child as HTMLElement, data);
    }
  }
}

/**
 * Parse
 * @param el
 * @returns
 */
function parser(el: HTMLElement, data: any | any[] = []) {
  // load current element
  loadElement(el, data);

  // If no more children get out of recursion
  if (el.children.length === 0) return;

  // Load element's children
  loadChildren(el.children, data);
}

export default parser;
