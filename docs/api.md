
### This API only document what SimplifiedAwilix changes. 
See [Awilix Readme](https://github.com/jeffijoe/awilix#readme) for thorough documentation of awilix functionality. 
<a name="SimplifiedAwilix"></a>

## SimplifiedAwilix : <code>object</code>
**Kind**: global namespace  

* [SimplifiedAwilix](#SimplifiedAwilix) : <code>object</code>
    * [.container](#SimplifiedAwilix.container) : <code>object</code>
        * [.register(book, [type])](#SimplifiedAwilix.container.register) ⇒ <code>container</code>
        * [.registerSingleton(book)](#SimplifiedAwilix.container.registerSingleton) ⇒ <code>container</code>
        * [.registerTransient(book)](#SimplifiedAwilix.container.registerTransient) ⇒ <code>container</code>
        * [.registerScoped(book)](#SimplifiedAwilix.container.registerScoped) ⇒ <code>container</code>
        * [.createScope([_handleUnregistered])](#SimplifiedAwilix.container.createScope) ⇒ <code>container</code>
    * [.install([config])](#SimplifiedAwilix.install) ⇒
    * [.createContainer([existingContainer], [handleUnregistered], [config])](#SimplifiedAwilix.createContainer) ⇒ <code>container</code>

<a name="SimplifiedAwilix.container"></a>

### SimplifiedAwilix.container : <code>object</code>
**Kind**: static namespace of [<code>SimplifiedAwilix</code>](#SimplifiedAwilix)  

* [.container](#SimplifiedAwilix.container) : <code>object</code>
    * [.register(book, [type])](#SimplifiedAwilix.container.register) ⇒ <code>container</code>
    * [.registerSingleton(book)](#SimplifiedAwilix.container.registerSingleton) ⇒ <code>container</code>
    * [.registerTransient(book)](#SimplifiedAwilix.container.registerTransient) ⇒ <code>container</code>
    * [.registerScoped(book)](#SimplifiedAwilix.container.registerScoped) ⇒ <code>container</code>
    * [.createScope([_handleUnregistered])](#SimplifiedAwilix.container.createScope) ⇒ <code>container</code>

<a name="SimplifiedAwilix.container.register"></a>

#### container.register(book, [type]) ⇒ <code>container</code>
Mostly similar to vanilla container.register, except that it also accepts standard functions and values.
But classes still need to be wrapped in asClass. And if you want to use inject feature of Awilix, you'll have
to use the asFunction resolver.

**Kind**: static method of [<code>container</code>](#SimplifiedAwilix.container)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| book | <code>object</code> |  | A book of functions or values or resolvers |
| [type] | <code>string</code> | <code>&quot;\&quot;transient\&quot;&quot;</code> | The lifetime of these resolvers. transient | singleton | scoped |

<a name="SimplifiedAwilix.container.registerSingleton"></a>

#### container.registerSingleton(book) ⇒ <code>container</code>
Register singleton functions or values or resolvers

**Kind**: static method of [<code>container</code>](#SimplifiedAwilix.container)  

| Param | Type | Description |
| --- | --- | --- |
| book | <code>object</code> | A book of functions or values or resolvers |

<a name="SimplifiedAwilix.container.registerTransient"></a>

#### container.registerTransient(book) ⇒ <code>container</code>
Register transient functions or values or resolvers

**Kind**: static method of [<code>container</code>](#SimplifiedAwilix.container)  

| Param | Type | Description |
| --- | --- | --- |
| book | <code>object</code> | A book of functions or values or resolvers |

<a name="SimplifiedAwilix.container.registerScoped"></a>

#### container.registerScoped(book) ⇒ <code>container</code>
Register scoped functions or values or resolvers

**Kind**: static method of [<code>container</code>](#SimplifiedAwilix.container)  

| Param | Type | Description |
| --- | --- | --- |
| book | <code>object</code> | A book of functions or values or resolvers |

<a name="SimplifiedAwilix.container.createScope"></a>

#### container.createScope([_handleUnregistered]) ⇒ <code>container</code>
Create scope for container.

**Kind**: static method of [<code>container</code>](#SimplifiedAwilix.container)  

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
