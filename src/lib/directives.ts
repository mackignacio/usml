import { getElementByTarget, getUSMLAction, parseAttr, stringInterpolation, traverseObj } from "../utils";
import constants from "../utils/constants";

export function loadData(el: HTMLElement, data: any | any[]) {
  // Convert non-array data to array
  data = Array.isArray(data) ? data : [data];
  // Map all elements child
  Array.from(el.children).forEach(dataDirective(el, data));
}

export function dataDirective(parent: HTMLElement, data: any | any[]) {
  return (el: Element) => {
    const dataAttr = getUSMLAction(parent, constants.USML_DATA);

    // Null check
    if (!dataAttr) return;

    let isModified = false;

    // Loop through all data and apply it to each children
    for (const json of data) {
      // Clone current element
      const clone = el.cloneNode(true) as HTMLElement;

      // Check and perform `for` directive
      const hasItem = forDirective(parent, clone, dataAttr, json);

      // Check and perform `value` directive
      const hasValue = valueDirective(clone, dataAttr, json);

      // Check if clone element is modified
      isModified = hasItem || hasValue;

      if (isModified) {
        // Add modified clone element to parent element
        parent.appendChild(clone);
      }
    }

    if (isModified) {
      //  Remove current element to parent if modified
      parent.removeChild(el);
    }
  };
}

/**
 *
 * @param el
 * @param elements
 * @param data
 */
export function forDirective(parent: HTMLElement, el: HTMLElement, key: string, json: { [x: string]: any } = {}) {
  // Get current element `usml-for` attribute
  const forAttr = getUSMLAction(parent, constants.USML_FOR);

  // Null checks
  if (forAttr === null) return false;

  return forItemDirective(el, forAttr, key, json);
}

/**
 *
 * @param el
 * @param forKey
 * @param key
 * @param json
 * @returns
 */
function forItemDirective(el: HTMLElement, forKey: string, key: string, json: { [x: string]: any } = {}) {
  // Get current element `usml-item` attribute
  const forItem = getUSMLAction(el, constants.USML_ITEM);

  // If forItem is null we will not continue
  // If `usm-for` value is not equal to `usml-data` of current element
  // It means it is not the right data for the element to consume
  if (!forItem || forItem !== forKey) return false;

  // Replace interpolated string with json values
  stringInterpolation(el, { [key]: json });

  return true;
}

/**
 *
 * @param el
 * @param key
 * @param json
 * @returns
 */
function valueDirective(el: HTMLElement, key: string, json: { [x: string]: any } = {}) {
  // Get current element `usml-value` attribute
  const valueAttr = getUSMLAction(el, constants.USML_VALUE);

  // Null check
  if (!valueAttr) return false;

  const data = traverseObj(valueAttr.split("."), { [key]: json });

  // https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
  (el as HTMLInputElement).value = data;

  return true;
}

/**
 *
 * @param el
 * @param data
 * @returns
 */
export function swapDirective(el: HTMLElement, data: any | any[]) {
  // Get current element `usml-for` attribute
  const swapAttr = getUSMLAction(el, constants.USML_SWAP);

  // Null check
  if (!swapAttr) return;

  const parse = parseAttr(swapAttr);

  // Null check
  if (!parse) return;

  const [_cmd, _target] = parse;

  if (_target === "innerHTML") {
    el.innerHTML = data;
    return;
  }

  if (_target.includes("#")) {
    const element = getElementByTarget(_target);
    if (!element) return;

    const newEl = htmlToElements(data);
    const parent = element?.parentNode ?? document.body;

    // https://stackoverflow.com/questions/2943140/how-to-swap-html-elements-in-javascript
    parent.insertBefore(newEl, element);
    parent.removeChild(element);
  }
}

/**
 *
 * @param html
 * @returns
 */
function htmlToElements(html: string) {
  // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}
