export type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "HEAD" | "OPTIONS";
export type HTTPMethodEvent = "get" | "post" | "delete" | "put" | "patch" | "head" | "options";
export type HTTPResponse<T> = Promise<T>;
export type HTTPFunction<T> = (url: string, type: string, body: any) => HTTPResponse<T>;
export type HTTPMethodObject = { [k in HTTPMethodEvent]: HTTPMethod };
export type HTTPMethodKey = { [k in HTTPMethod]: HTTPMethod };
export type HTTPMethodFn<T> = { [k in HTTPMethodEvent]: HTTPFunction<T> };

export type USMLMouseEvent = "click" | "mouse-enter" | "mouse-leave" | "mouse-move" | "mouse-out" | "mouse-over";
export type MouseEventObject = { [k in USMLMouseEvent]: string };

export type USMLVisibilityEvent = "show" | "hide" | "toggle";

export type USMLEvent = USMLVisibilityEvent | HTTPMethodEvent;

export type USMLHidden = "hidden";

export type USMLVisible = "visible";

export type USMLVisibility = USMLHidden | USMLVisible;

export type USMLLoad = "load";

export type USMLSwap = "swap";

export type USMLModel = "model";


export type USMLAction = USMLLoad | USMLMouseEvent | USMLDirective | USMLVisibility;

export type AttrMatcher = "html" | "fn" | "http";

export type ResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text";
