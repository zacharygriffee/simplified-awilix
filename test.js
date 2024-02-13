import {test, solo} from "brittle";
import {asClass, asFunction, AwilixResolutionError} from "awilix";
import createContainer, {install} from "./index.js";

await install();

test("Basic test", t => {
    const container = createContainer();
    const {drinkCoffee, unregisteredValue} = container.register({
        howMuch: 5,
        drinkCoffee({howMuch}) {
            return "I drank " + howMuch + " cups of coffee"
        }
    }, "transient").cradle;

    t.is(drinkCoffee, "I drank 5 cups of coffee", "No asFunction or asValue necessary");
    t.absent(unregisteredValue, "Unregistered values don't throw.");
});

test("createScope using registerScoped", t => {
    const container = createContainer();
    const coffeeDrinkerBase = container.registerScoped({
        drinkCoffee({howMuch}) {
            return "I drank " + howMuch + " cups of coffee"
        }
    });
    const coffeeDrinker = coffeeDrinkerBase.createScope();
    const {drinkCoffee, unregisteredValue} = coffeeDrinker.register({
        howMuch: 10
    }).cradle;

    t.is(drinkCoffee, "I drank 10 cups of coffee", "Pulled from scope");
    t.absent(unregisteredValue, "Unregistered values don't throw.");
});

test("you could use awilix resolver functions anyway if you need class or injections", t => {
    class CoffeeDrinker {
        constructor({howMuch}) {
            this.howMuch = howMuch;
            t.is(this.howMuch, 20);
        }

        get drinkCoffee() {
            return "I drank " + this.howMuch + " cups of coffee"
        }
    }

    const container = createContainer().register({
        howMuch: 20,
        coffeeDrinker: asClass(CoffeeDrinker),
        injectable: asFunction(({howMuch}) => {
            return "I drank " + howMuch + " cups of coffee"
        }).inject(() => ({howMuch: 100})),
        justHowMuch({howMuch}) {
            return "I drank " + howMuch + " cups of coffee"
        }
    });

    const {coffeeDrinker, injectable, justHowMuch} = container.cradle;
    t.is(coffeeDrinker.drinkCoffee, "I drank 20 cups of coffee", "Got the class's property");
    t.is(injectable, "I drank 100 cups of coffee", "The injectable works if you need it");
    t.is(justHowMuch, "I drank 20 cups of coffee", "Basics")
});

test("Errors that are not AwilixResolutionError still throw cradle", async t => {
    const container = createContainer();
    container.register({
        howMuch: 6,
        drinkCoffee({howMuch}) {
            return "I drank " + howMuch + " cups of coffee"
        },
        cream() {
            throw new Error("Not today.");
        }
    });

    t.exception(() => container.cradle.cream);
    t.absent(container.cradle.unregisteredValue);
});

test("Handle unregistered stuff", async t => {
    const container = createContainer(
        (prop, {defaultEntry, howMuch}) => {
            if (prop === "cream") {
                throw new AwilixResolutionError(prop, []);
            }
            return "Maybe I drank " + howMuch / defaultEntry + " cups of coffee";
        }
    );
    const {drinkCoffee, unregisteredValue, wouldYouLikeCream} = container
        .registerTransient({
            defaultEntry: 2,
            howMuch: 1000,
            drinkCoffee({howMuch}) {
                return "I drank " + howMuch + " cups of coffee"
            }
        })
        .registerScoped({
            wouldYouLikeCream({howMuch, cream}) {
                return `I would ${cream ? "love some cream" : "hate cream"} in my ${howMuch} coffee cups`;
            }
        }).cradle;

    t.is(drinkCoffee, "I drank 1000 cups of coffee", "The basics work.");
    t.is(unregisteredValue, "Maybe I drank 500 cups of coffee", "Unregistered function handled");
    t.is(wouldYouLikeCream, "Maybe I drank 500 cups of coffee");

    const scoped = container.createScope();

    const {wouldYouLikeCream: wouldYouLikeCream2} = scoped.register({
        cream: false,
        defaultEntry: 10
    }).cradle;

    t.is(scoped.cradle.unregisteredValue, "Maybe I drank 100 cups of coffee", "Unregistered function handled scope");
    t.is(wouldYouLikeCream2, "I would hate cream in my 1000 coffee cups");

    const scoped2 = scoped.createScope((prop, {defaultEntry, howMuch}) => {
        return "Or maybe I just drank espresso";
    });

    scoped2.register({cream: true});

    t.is(scoped2.cradle.wouldYouLikeCream, "I would love some cream in my 1000 coffee cups");

    t.is(
        scoped2.cradle.unregisteredValue,
        "Or maybe I just drank espresso",
        "Unregistered function handled scope of a scope with change of unregistered handler"
    );
});