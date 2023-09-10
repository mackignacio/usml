import {
  regExec,
} from "../utils";

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
