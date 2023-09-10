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

/**
 * Load element with USML attributes and values
 * @param el
 */
function loadElement(el: HTMLElement, data: any | any[]) {
  for (const action of constants.USML_ACTION) {
    const attr = getUSMLAction(el, action);

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
