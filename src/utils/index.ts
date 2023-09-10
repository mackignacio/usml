import { USMLAction, USMLVisibility, AttrMatcher, USMLMouseEvent } from "./types";
import constants from "./constants";

/**
 *
 * @param target
 * @param attr
 * @returns
 */
export function getUSMLAction(target: HTMLElement, attr: USMLAction) {
  return target.getAttribute(`${constants.USML_PRE}${attr}`);
}

/**
 *
 * @param target
 * @returns
 */
export function getElementByTarget(target: string): HTMLElement | null {
  const selector = target.includes("#") ? target.replace("#", "") : target;
  return document.getElementById(selector) ?? document.querySelector(selector);
}

/**
 *
 * @param condition
 * @returns
 */
export function showHide(condition: boolean) {
  return condition ? constants.USML_VISIBLE : constants.USML_HIDDEN;
}

/**
 *
 * @param attr
 * @returns
 */
export function parseAttr(attr: string): [string, string] | null {
  const [cmd, ...rest] = attr.split(":");
  let target = rest.join(rest.length > 0 ? ":" : "");
  target = target === "" ? attr : target;

  // Null check
  if (!target && !attr) return null;

  return [cmd, target];
}

/**
 *
 * @param event
 */
export function getUsmlEvent(event: USMLAction) {
  return constants.USML_MOUSE_EVENT.includes(event as USMLMouseEvent)
    ? constants.USML_MOUSE_EVENT_OBJ[event as USMLMouseEvent]
    : event;
}

/**
 *
 * @param selector
 * @param type
 * @returns
 */
export function regExec(selector: string, type: AttrMatcher) {
  let regex = /^[\#\.]?\w+$/;

  if (type === "fn") {
    regex = /(?<name>\w+)\((?<argvs>.*?)\)/;
  }

  if (type === "http") {
    regex =
      /^(?<protocol>https?:?\/{0,2})?(?<sub>[\w\.]*?)(?<domain>\w*?)(?<ext>\.\w*?)?(?<port>:?\d*?)(?<endpoint>[\/\w]*?)$/;
  }

  return regex.exec(selector);
}

export function matcher(attr: string, type: AttrMatcher, cb: (matched: RegExpExecArray) => void) {
  const matched = regExec(attr, type);

  if (matched) cb(matched);

  return !!matched ?? null;
}

/**
 *
 * @param keys
 * @param data
 * @returns
 */
export function traverseObj(keys: any[], data: { [x: string]: any }): any {
  if (keys.length === 0 || typeof data === "undefined") return data;
  return traverseObj(keys, data[keys.shift()]);
}

/**
 *
 * @param el
 * @param json
 * @returns
 */
export function stringInterpolation(el: Element, json: { [x: string]: any } = {}) {
  let textContent = el.textContent ?? "";

  if (!textContent) return;

  const matches = textContent.match(/(?:\{{2})(?<value>.*?)(?:\}{2})/gim);

  matches?.forEach((match) => {
    const prop = match.replace(/\{{2}|\}{2}/gm, "");
    const data = traverseObj(prop.split("."), json);
    textContent = textContent.replace(match, data);
  });

  el.textContent = textContent;

  return el;
}

/**
 *
 * @param el
 * @param attr
 * @returns
 */
export function setVisibility(el: HTMLElement, attr: USMLVisibility) {
  const visibility = attr === constants.USML_HIDDEN ? constants.USML_HIDDEN : constants.USML_VISIBLE;
  el.style.visibility = visibility;
}

function toggleVisibility(target: HTMLElement, cmd: string) {
  const isHidden = target.style.visibility === constants.USML_HIDDEN;
  const isToggled = constants.USML_TOGGLE === cmd;
  target.style.visibility = isToggled ? showHide(isToggled && isHidden) : showHide(constants.USML_SHOW === cmd);
}

/**
 *
 * @param target
 * @param cmd
 * @returns
 */
export function triggerVisibility(parent: HTMLElement | null, [cmd, selector]: [string, string]) {
  return () => {
    if (parent === null) return;

    const target = selector.includes(".") ? parent.querySelectorAll(selector) : parent.querySelector(selector);

    if (target === null) return;

    if (target instanceof NodeList) return target.forEach((el) => toggleVisibility(el as HTMLElement, cmd));

    toggleVisibility(target as HTMLElement, cmd);
  };
}

/**
 *
 * @param data
 * @returns
 */
export function stringToJSON(data: string) {
  //  https://stackoverflow.com/questions/9637517/parsing-relaxed-json-without-eval
  const replaced = data
    .replace(/['|"](\w)/g, `"$1`)
    .replace(/(\w)['|"]/g, `$1"`)
    .replace(/(\w+):/g, `"$1": `);

  return JSON.parse(replaced);
}

/**
 *
 * @param json
 */
export function jsonToArray(json: { [x: string]: any }) {
  return Array.isArray(json) ? json : [json];
}
