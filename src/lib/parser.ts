import {
  regExec,
} from "../utils";

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

  if (constants.USML_LOAD === action) {
    loadHandlers(el, parse);
  }
}

/**
 *
 * @param el
 * @param tuple
 */
function loadHandlers(el: HTMLElement, [_cmd, _target]: [string, string]) {
  const matchedFn = regExec(_target, "fn");

  if (matchedFn) {
    const { name, argvs } = (matchedFn as any).groups;
    (window[name] as any)(argvs);
  }
}
