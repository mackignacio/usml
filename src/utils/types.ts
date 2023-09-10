export type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "HEAD" | "OPTIONS";
export type HTTPMethodKey = { [k in HTTPMethod]: HTTPMethod };
export type USMLLoad = "load";

export type USMLSwap = "swap";
