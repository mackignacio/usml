import { mapStringInterpolation } from "../utils";
import { Signal } from "../utils/types";

export function createSignal(el: HTMLElement): Signal {
  // Set initial state
  const state: Signal = { el, subscribers: new Set<any>(), props: {} };

  // Create handler object
  const handler = {
    get: (target: any, prop: string) => {
      return target[prop];
    },
    set: (target: any, prop: any, value: any) => {
      target[prop] = value;

      if (prop === "props") {
        for (const effect of state.subscribers) {
          effect({ props: value });
        }
      }

      return true;
    },
  };

  // return Proxy Object
  return new Proxy(state, handler);
}

export function updateTextEffect(el: Element, text: string) {
  const textNode = document.createTextNode(text);
  el.textContent = "";
  el.appendChild(textNode);

  return (json: any) => {
    textNode.nodeValue = mapStringInterpolation(text, json);
  };
}
