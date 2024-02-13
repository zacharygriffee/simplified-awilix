import {isFunction} from "./isFunction.js";

export function isContainer(x) {
    return x && isFunction(x.register) && isFunction(x.createScope) && x.cradle
}