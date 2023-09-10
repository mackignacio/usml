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
