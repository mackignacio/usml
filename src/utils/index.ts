export function regExec(selector: string, type: AttrMatcher) {
  let regex = /^[\#\.]?\w+$/;

  if (type === "fn") {
    regex = /(?<name>\w+)\((?<argvs>.*?)\)/;
  }

  return regex.exec(selector);
}
