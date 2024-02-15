import {isFunction} from "./isFunction.js";

export function isResolverFunction(entry) {
    return !!entry && (isFunction(entry.resolve) && (
        isFunction(entry.setLifetime)
        && isFunction(entry.scoped)
        && isFunction(entry.transient)
        && isFunction(entry.singleton)
    ));
}

export function isResolverValue(entry) {
    return !!entry && typeof entry.isLeakSafe === "boolean"
}

export function isResolverObject(entry) {
    return isResolverFunction(entry) || isResolverValue(entry);
}