import { createSignal, updateTextEffect } from "./signal";
import { getUSMLAction, stringToJSON } from "../utils";
import constants from "../utils/constants";
import { Signal } from "../utils/types";

const components = new Map<string, Signal>();

export function registerComponent(el: HTMLElement) {
  const name = getUSMLAction(el, constants.USML_COMPONENT);

  // Null check
  if (!name) return;

  // Create signal object
  const signal = createSignal(el);

  for (const child of el.children) {
    // Get element text
    const text = child.textContent ?? "";

    // Register text effect in signal subscribers
    signal.subscribers.add(updateTextEffect(child, text));
  }

  // Set current element in component Map
  components.set(name, signal);

  loadComponent(name);
}

/**
 *
 * @param el
 */
export function loadComponent(id: string, data?: { [x: string]: string }) {
  const component = components.get(id);

  // Null check
  if (!component) return;

  // Get component props
  let props = data ?? getUSMLAction(component.el, constants.USML_PROPS);

  // Convert to json if props is string
  props = typeof props === "string" ? stringToJSON(props) : props;

  // Null check and check if component has children
  if (!props || typeof props === "string" || component.el.children.length === 0) return;

  // Update component props
  component.props = props;
}

export default components;
