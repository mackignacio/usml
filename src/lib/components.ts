import { getUSMLAction, stringInterpolation, stringToJSON } from "../utils";
import constants from "../utils/constants";

const components = new Map<string, HTMLElement>();

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
