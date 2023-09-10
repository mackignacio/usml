import { USMLAction, USMLVisibility } from "./types";
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
 * @param selector
 * @param type
 * @returns
 */
export function regExec(selector: string, type: AttrMatcher) {
  let regex = /^[\#\.]?\w+$/;

  if (type === "fn") {
    regex = /(?<name>\w+)\((?<argvs>.*?)\)/;
  }

  return regex.exec(selector);
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
