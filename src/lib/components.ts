import { getUSMLAction, stringInterpolation, stringToJSON } from "../utils";
import constants from "../utils/constants";

const components = new Map<string, HTMLElement>();

/**
 *
 * @param el
 */
export function loadComponent(el: HTMLElement) {
  const name = getUSMLAction(el, constants.USML_COMPONENT);

  // Null check
  if (!name) return;

  // Set current element in component Map
  components.set(name, el);

  // Get component props
  const props = getUSMLAction(el, constants.USML_PROPS);

  // Null check
  if (!props) return;

  const json = stringToJSON(props);

  for (const child of el.children) {
    // Replace interpolated string with json values
    stringInterpolation(child, { props: json });
  }
}

export default components;
