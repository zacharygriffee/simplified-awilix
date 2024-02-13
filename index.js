import {isResolverObject} from "./lib/isResolverObject.js";
import {isFunction} from "./lib/isFunction.js";
import {extend} from "./lib/extend.js";
import {isContainer} from "./lib/isContainer.js";

/**
 * @namespace SimplifiedAwilix
 */

let configuration = {
    resolvedDependencies: {}, dependencies: {
        ["awilix"]: {
            get: () => configuration.importModule("awilix", () => `https://esm.run/awilix@10.0.1/lib/awilix.browser.js`)
        }
    }, importModule
}


let installed = 0;
let installing = 0;
let awilix;

/**
 * Install dependencies for simplified-awilix.
 *
 * The only dependency needed is Awilix.
 *
 * @param {object} [config] Modifications to the existing configuration.
 * @memberOf SimplifiedAwilix
 * @returns Promise<createContainer>
 *
 */
async function install(config = {}) {
    const _config = {...configuration, ...config};
    if (installed++) return createContainer;
    if (installing++) {
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (!installing) {
                    resolve(createContainer);
                    clearInterval(timer);
                }
            }, 100);
        })
    }
    const {dependencies} = _config;
    awilix = await dependencies.awilix.get();
    return createContainer;
}

/**
 * Create or wrap a container
 *
 * @example
 * await install();
 * const container = createContainer();
 * const {drinkCoffee, unregisteredValue} = container.register({
 *     howMuch: 5,
 *     drinkCoffee({howMuch}) {
 *         return "I drank " + howMuch + " cups of coffee"
 *     }
 * }, "transient").cradle;
 *
 * @property {Proxy} cradle A cradle that does not throw with undefined dependencies.
 *
 * @param {container} [existingContainer] Wrap an existing container. Default is to create a new container.
 * @param {function} [handleUnregistered] A function called with (property, container.cradle) of dependencies that don't exist
 * in the container. Default is to return undefined.
 * @param {object} [config] A configuration if this method creates a new container. Irrelevant if existing container passed.
 * @memberOf SimplifiedAwilix
 * @returns {container}
 */
function createContainer(existingContainer, handleUnregistered, config = {}) {
    /**
     * @namespace SimplifiedAwilix.container
     */

    if (!installed) {
        throw new Error("Install before using simplified-awilix");
    }
    const {
        existingContainer: _existingContainer, handleUnregistered: _handleUnregistered, config: _config
    } = parseArgs();
    return awilixHelpers({container: _existingContainer, handleUnregistered: _handleUnregistered, config: _config})

    function parseArgs() {
        return [existingContainer, handleUnregistered, config]
            .reduce((acc, o) => {
                if (isFunction(o)) {
                    acc["handleUnregistered"] = o;
                } else if (isContainer(o)) {
                    acc["existingContainer"] = o;
                } else {
                    acc["config"] = o;
                }
                return acc;
            }, {})
    }
}

export {createContainer, install, configuration};
export default createContainer;

async function importModule(urlOrModuleSpecifier, cdnFormatter = (specifier, config) => {
    return `https://esm.run/${specifier}`;
}) {
    let isUrl, isNodeLike = typeof process !== "undefined" && process?.versions?.node;

    try {
        new URL(urlOrModuleSpecifier);
        isUrl = true;
    } catch (e) {
        isUrl = false;
    }

    if (isUrl && isNodeLike) {
        throw new Error("You cannot import url modules via node.");
    }

    if (isNodeLike) {
        return await import(urlOrModuleSpecifier);
    }

    return await import(isUrl ? urlOrModuleSpecifier : cdnFormatter(urlOrModuleSpecifier, configuration));
}

function awilixHelpers(config = {}) {
    let {
        AwilixResolutionError,
        config: _config, createContainer, asFunction, asValue, aliasTo, container, handleUnregistered = () => undefined
    } = {...awilix, ...config};
    if (!container) container = createContainer?.(_config)
    let _cradle = container.cradle;
    const _createScope = container._createScope ||= container.createScope;
    const _register = container._register ||= container.register;
    /**
     * Mostly similar to vanilla container.register, except that it also accepts standard functions and values.
     * But classes still need to be wrapped in asClass. And if you want to use inject feature of Awilix, you'll have
     * to use the asFunction resolver.
     * @param {object} book A book of functions or values or resolvers
     * @param {string} [type="transient"] The lifetime of these resolvers. transient | singleton | scoped
     * @memberOf SimplifiedAwilix.container
     * @returns {container}
     */
    function register(book, type = "transient") {
        for (const [key, entry] of Object.entries(book)) {
            if (isResolverObject(entry)) {
                _register(key, entry[type]());
            } else if (isFunction(entry)) {
                _register(key, asFunction(entry)[type]());
            } else {
                // Must be a value, or anything else.
                _register(key, asValue(entry));
            }
        }

        return container;
    }

    /**
     * Register singleton functions or values or resolvers
     * @param {object} book A book of functions or values or resolvers
     * @memberOf SimplifiedAwilix.container
     * @returns {container}
     */
    function registerSingleton(book) {
        return register(book, "singleton");
    }

    /**
     * Register transient functions or values or resolvers
     * @param {object} book A book of functions or values or resolvers
     * @memberOf SimplifiedAwilix.container
     * @returns {container}
     */
    function registerTransient(book) {
        return register(book, "transient");
    }

    /**
     * Register scoped functions or values or resolvers
     * @param {object} book A book of functions or values or resolvers
     * @memberOf SimplifiedAwilix.container
     * @returns {container}
     */
    function registerScoped(book) {
        return register(book, "scoped");
    }

    function cradle() {
        return new Proxy({}, {
            get(target, prop) {
                try {
                    return _cradle[prop];
                } catch (e) {
                    if (e instanceof AwilixResolutionError) return handleUnregistered(prop, container.cradle);
                    throw e;
                }
            }
        })
    }

    /**
     * Create scope for container.
     * @param [_handleUnregistered] A function called with (property, container.cradle) of dependencies that don't exist
     * in the container.
     * @memberOf SimplifiedAwilix.container
     * @returns {container}
     */
    function createScope(_handleUnregistered = handleUnregistered) {
        return awilixHelpers({
            createContainer,
            asFunction,
            asValue,
            aliasTo,
            container: _createScope(),
            handleUnregistered: _handleUnregistered
        });
    }

    Object.defineProperty(container, "cradle", {
        get() {
            return cradle()
        }
    });

    return extend(container, {
        register, registerTransient, registerScoped, registerSingleton, createScope
    });
}
