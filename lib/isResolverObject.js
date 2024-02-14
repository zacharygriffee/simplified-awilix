import {isFunction} from "./isFunction.js";

export function isResolverObject(entry) {
    return !!entry && (isFunction(entry.resolve) && (
        isFunction(entry.setLifetime)
        && isFunction(entry.scoped)
        && isFunction(entry.transient)
        && isFunction(entry.singleton)
    ) || (
        typeof entry.isLeakSafe === "boolean"
    ))
}