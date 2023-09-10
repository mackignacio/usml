import constants from "../utils/constants";

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
