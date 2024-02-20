
### This API only document what SimplifiedAwilix changes. 
See [Awilix Readme](https://github.com/jeffijoe/awilix#readme) for thorough documentation of awilix functionality. 
<a name="SimplifiedAwilix"></a>

## SimplifiedAwilix : <code>object</code>
**Kind**: global namespace  

* [SimplifiedAwilix](#SimplifiedAwilix) : <code>object</code>
    * [.container](#SimplifiedAwilix.container) : <code>object</code>
        * [.registerSingletonIf](#SimplifiedAwilix.container+registerSingletonIf)
        * [.registerScopedIf](#SimplifiedAwilix.container+registerScopedIf)
        * [.registerTransientIf](#SimplifiedAwilix.container+registerTransientIf)
        * [.registerIf](#SimplifiedAwilix.container+registerIf)
        * [.registerSingletonIfNot](#SimplifiedAwilix.container+registerSingletonIfNot)
        * [.registerScopedIfNot](#SimplifiedAwilix.container+registerScopedIfNot)
        * [.registerTransientIfNot](#SimplifiedAwilix.container+registerTransientIfNot)
        * [.registerIfNot](#SimplifiedAwilix.container+registerIfNot)
        * [.register(bookOrResolverName, [typeOrResolver], [maybeType])](#SimplifiedAwilix.container+register) ⇒ <code>container</code>
        * [.registerSingleton()](#SimplifiedAwilix.container+registerSingleton) ⇒ <code>container</code>
        * [.registerTransient()](#SimplifiedAwilix.container+registerTransient) ⇒ <code>container</code>
        * [.registerScoped()](#SimplifiedAwilix.container+registerScoped) ⇒ <code>container</code>
        * [.createScope([_handleUnregistered])](#SimplifiedAwilix.container+createScope) ⇒ <code>container</code>
    * [.install([config])](#SimplifiedAwilix.install) ⇒
    * [.createContainer([existingContainer], [handleUnregistered], [config])](#SimplifiedAwilix.createContainer) ⇒ <code>container</code>

<a name="SimplifiedAwilix.container"></a>

### SimplifiedAwilix.container : <code>object</code>
**Kind**: static namespace of [<code>SimplifiedAwilix</code>](#SimplifiedAwilix)  

* [.container](#SimplifiedAwilix.container) : <code>object</code>
    * [.registerSingletonIf](#SimplifiedAwilix.container+registerSingletonIf)
    * [.registerScopedIf](#SimplifiedAwilix.container+registerScopedIf)
    * [.registerTransientIf](#SimplifiedAwilix.container+registerTransientIf)
    * [.registerIf](#SimplifiedAwilix.container+registerIf)
    * [.registerSingletonIfNot](#SimplifiedAwilix.container+registerSingletonIfNot)
    * [.registerScopedIfNot](#SimplifiedAwilix.container+registerScopedIfNot)
    * [.registerTransientIfNot](#SimplifiedAwilix.container+registerTransientIfNot)
    * [.registerIfNot](#SimplifiedAwilix.container+registerIfNot)
    * [.register(bookOrResolverName, [typeOrResolver], [maybeType])](#SimplifiedAwilix.container+register) ⇒ <code>container</code>
    * [.registerSingleton()](#SimplifiedAwilix.container+registerSingleton) ⇒ <code>container</code>
    * [.registerTransient()](#SimplifiedAwilix.container+registerTransient) ⇒ <code>container</code>
    * [.registerScoped()](#SimplifiedAwilix.container+registerScoped) ⇒ <code>container</code>
    * [.createScope([_handleUnregistered])](#SimplifiedAwilix.container+createScope) ⇒ <code>container</code>

<a name="SimplifiedAwilix.container+registerSingletonIf"></a>

#### container.registerSingletonIf
Register only if these dependencies exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+registerScopedIf"></a>

#### container.registerScopedIf
Register only if these dependencies exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+registerTransientIf"></a>

#### container.registerTransientIf
Register only if these dependencies exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+registerIf"></a>

#### container.registerIf
Register only if these dependencies exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+registerSingletonIfNot"></a>

#### container.registerSingletonIfNot
Register only if these dependencies don't exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+registerScopedIfNot"></a>

#### container.registerScopedIfNot
Register only if these dependencies don't exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+registerTransientIfNot"></a>

#### container.registerTransientIfNot
Register only if these dependencies don't exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+registerIfNot"></a>

#### container.registerIfNot
Register only if these dependencies don't exist in the container.

**Kind**: instance property of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  

| Param | Type | Description |
| --- | --- | --- |
| dependencyNames | <code>string</code> \| <code>array.&lt;string&gt;</code> | Dependency names to check if exists. |
| args |  | The argument signature of the Container.register function |

<a name="SimplifiedAwilix.container+register"></a>

#### container.register(bookOrResolverName, [typeOrResolver], [maybeType]) ⇒ <code>container</code>
Mostly similar to vanilla container.register, except that it also accepts standard functions and values.
But classes still need to be wrapped in asClass. And if you want to use inject feature of Awilix, you'll have
to use the asFunction resolver.

See Awilix documentation for varying signatures.

**Kind**: instance method of [<code>container</code>](#SimplifiedAwilix.container)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bookOrResolverName | <code>object</code> |  | A book of functions or values or resolvers |
| [typeOrResolver] | <code>string</code> | <code>&quot;\&quot;transient\&quot;&quot;</code> | The lifetime of these resolvers. |
| [maybeType] | <code>string</code> |  |  |

<a name="SimplifiedAwilix.container+registerSingleton"></a>

#### container.registerSingleton() ⇒ <code>container</code>
Register singleton functions or values or resolvers

**Kind**: instance method of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  
<a name="SimplifiedAwilix.container+registerTransient"></a>

#### container.registerTransient() ⇒ <code>container</code>
Register transient functions or values or resolvers

**Kind**: instance method of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  
<a name="SimplifiedAwilix.container+registerScoped"></a>

#### container.registerScoped() ⇒ <code>container</code>
Register scoped functions or values or resolvers

**Kind**: instance method of [<code>container</code>](#SimplifiedAwilix.container)  
**See**: SimplifiedAwilix.register for argument signature.  
<a name="SimplifiedAwilix.container+createScope"></a>

#### container.createScope([_handleUnregistered]) ⇒ <code>container</code>
Create scope for container.

**Kind**: instance method of [<code>container</code>](#SimplifiedAwilix.container)  

| Param | Description |
| --- | --- |
| [_handleUnregistered] | A function called with (property, container.cradle) of dependencies that don't exist in the container. |

<a name="SimplifiedAwilix.install"></a>

### SimplifiedAwilix.install([config]) ⇒
Install dependencies for simplified-awilix.

The only dependency needed is Awilix.

**Kind**: static method of [<code>SimplifiedAwilix</code>](#SimplifiedAwilix)  
**Returns**: Promise<createContainer>  

| Param | Type | Description |
| --- | --- | --- |
| [config] | <code>object</code> | Modifications to the existing configuration. |

<a name="SimplifiedAwilix.createContainer"></a>

### SimplifiedAwilix.createContainer([existingContainer], [handleUnregistered], [config]) ⇒ <code>container</code>
Create or wrap a container

**Kind**: static method of [<code>SimplifiedAwilix</code>](#SimplifiedAwilix)  

| Param | Type | Description |
| --- | --- | --- |
| [existingContainer] | <code>container</code> | Wrap an existing container. Default is to create a new container. |
| [handleUnregistered] | <code>function</code> | A function called with (property, container.cradle) of dependencies that don't exist in the container. Default is to return undefined. |
| [config] | <code>object</code> | A configuration if this method creates a new container. Irrelevant if existing container passed. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cradle | <code>Proxy</code> | A cradle that does not throw with undefined dependencies. |

**Example**  
```js
await install();
const container = createContainer();
const {drinkCoffee, unregisteredValue} = container.register({
    howMuch: 5,
    drinkCoffee({howMuch}) {
        return "I drank " + howMuch + " cups of coffee"
    }
}, "transient").cradle;
```
