# SimplifiedAwilix

## API Documentation



### Why?

- I'm a functional programmer.
- I personally do not expose classes to the public.
- It is easy to infer function from value when not using classes.
- If I really need to expose a class. I'll use the resolver functions that awilix exposes.
- I also don't use the injection technique very often.
- I also do not have to adapt my libraries to use what I need awilix for. 
- I write my code to be as environmentally agnostic as possible. Hence, my need for handling dependencies myself.

So, with all that boiled off, all I needed was `Awilix.createContainer`.

### Changes

- No need for asFunction, asValue, unless using injections. But you could still use them (see example)
- Container.cradle doesn't throw on unregistered dependencies and by default returns undefined, but you can change 
  this behavior.
- Install dependencies yourself, in this case, Awilix.
- Then createContainer() !!!
- createScope works as expected

### Installation
```ecmascript 6
import {createContainer, install, configuration} from "simplified-awilix";
// If node, will import from your project dependencies
// if browser, will use jsdelivr to download the browser version of awilix.
await install();

// If you're bundling, or got awilix imported in other ways, or you have it in an import map, modifiy the configuration
// to include it.
import * as AwilixModule from "awilix";
import {createContainer, install, configuration} from "simplified-awilix";

configuration.dependencies.awilix = { get() { return AwilixModule } }
await install();
```

### Use
```ecmascript 6
class CoffeeDrinker {
    constructor({howMuch}) {
        this.howMuch = howMuch;
    }

    get drinkCoffee() {
        return "I drank " + this.howMuch + " cups of coffee"
    }
}

const container = createContainer()
    .register({
        howMuch: 5,
        drinkCoffee({howMuch}) {
            return "I drank " + howMuch + " cups of coffee"
        },
        // IF you really need class
        coffeeDrinker: asClass(CoffeeDrinker),
        // Or if you really need to use the inject feature
        injectable: asFunction(({howMuch}) => {
            return "I drank " + howMuch + " cups of coffee"
        }).inject(() => ({howMuch: 100})),
        // Set lifetime of the entire set of functions
    }, "transient")
    .register({
        // Maybe have some scoped dependencies
    }, "scoped")
    // Or use the added convenience functions
    .registerScoped({ })
    .registerTransient({ })
    .registerSingleton({ })

container.cradle.drinkCoffee; // 5;
container.cradle.missingFunction // undefined;
```



## Test it

```sh
npm test
```

Distributed under the MIT license. See ``LICENSE`` for more information.