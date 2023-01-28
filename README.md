### Overview

TypeScript is a tool to help you write type-safe JavaScript. JavaScript is a weakly typed language which means that types are assigned implicitly as they are used at runtime. While this can be considered a feature, it can be dangerous if your code needs to be treating types precisely at all times. Enforcing type safety ensures that all usage of the properties, functions and classes are consistent within your application and as a result makes your application more robust.

### Compile The TypeScript File Into JavaScript}

Open the VSCode integrated terminal using the keys `Ctrl+Shift+`, or using the top menu `Terminal --> New Terminal`.
In the project root folder type.

`tsc ./src/test.ts --outDir ./dist`

### Adding tsconfig.json

Normally, it is best practice to create a tsconfig.json file in the base of your TypeScript source folder in your project.

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "../dist",
    "rootDir": "./",
    "moduleResolution": "node"
  },
  "include": ["**/*.ts"]
}
```

Now you can compile your test.ts into javascript by calling tsc and indicating the `tsconfig` location which is the `./src` folder.

- `"strict":true` : The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. I mainly use it to ensure that all class properties are either assigned when first declared, or in the constructor.

- `"target": "ES2015"` : ES stands for ECMAScript which is a documented JavaScript standard. TSC will produce JavaScript that matches the selected standard. Options are ES3, ES5, ES2015, ES2016, ES2017, ES2018, ES2019, ES2020 and ESNEXT. Each ES version introduces new core JavaScript functionality. I have chosen ES2015 since TSC won't compile earlier versions if the source TypeScript contains private identifiers. Visit https://en.wikipedia.org/wiki/ECMAScript for more information about the ES version differences.

- `"module": "CommonJS"` : In many of the code examples in the course, I am using ES6 import/export syntax. The `CommonJS` module setting will produce output that relies on the popular `RequireJS` module loader that Node.js supports by default. This means that any JavaScript produced from TSC will work in Node.js in case your source TypeScript code contains any ES6 import commands.

- `"outDir": "../dist"` : This is the folder where the compiled JavaScript will be placed. Note that it has 2 dots indicating to go back/down one folder, and then up into the dist folder. This is relative to the rootDir parameter discussed in the next line.

- `"rootDir": "./" `: This is the root directory of the TypeScript project containing all of the \*.ts files, and not the project root directory which was referred to earlier that contains all of the projects files including the `src`, `dist`, `node_modules`, `package.json`, etc. It is the folder that TSC should consider to be the root when compiling.

- `"moduleResolution": "node"` : Is the default, and describes the file finding resolution process in which TSC will find dependencies if and when they are referenced in any code.

- `"include": ["**/*.ts"]` : Indicates to compile all files it finds ending in .ts in this and any sub folders relative to the rootDir setting within this same tsconfig.json.

#### Compile files

`tsc -p ./src`

For documentation on all the options that you can have in a tsconfig.json file, visit https://www.typescriptlang.org/tsconfig

#### TSC Watch

`tsc -p ./src -w`

### Common Types

#### Types

In the TypeScript version I have demonstrated explicitly setting some types of

- string
- boolean
- number
- array of numbers
- tuple
- dictionary
- set

```ts
let foo: string; //string
let bar: boolean; //boolean
let baz: number; //number
let qux: string[]; //array of string
let quuz: [number, string]; //a tuple of two elements consisting of a number and a string
let corge: { [key: number]: string }; //dictionary if string where the key is a number
let grault: Set<number>; //a Set of numbers

foo = "ABC";
bar = true;
baz = 123;
qux = ["a", "b", "c"];
quuz = [1, "abc"];
corge = { 123: "abc", 456: "def" };
grault = new Set([1, 2, 3]);
```

#### String

Some more string experiments you can try are:

```ts
let foo: string;
foo = "ABC";
foo = "123";
foo = "It wasn't me";
foo = "it wasn't me";
foo = `abc ${str} def`; //abc it wasn't me def
```

#### Boolean

A boolean can either be `true` or `false`.

```ts
let bar: boolean;
bar = true;
bar = false;
```

#### Number

A number can be written in many bases or with floating point precision.

```ts
let num: number;
num = 123; //decimal
num = 123.456; //float
num = 0xffff; //hex
num = 0b10101; //binary - "0b"+num.toString(2)
num = 0o671; //octal - "0o"+num.toString(8)
```

#### Array

An array is a JavaScript object first that can contain a series of any types,
but in TypeScript you can set the types explicitly or even as unknown.

```ts
let a: string[];
a = ["a", "b", "c", "d"];
let b: number[];
b = [1, 2, 3, 4, 5];
let c: boolean[];
c = [true, false, false];
let d: unknown[] = [1, "a", true, ["even", "another", "inner", "array"]];

console.log(d.length); //4
```

#### Dictionary

A Dictionary is used as a key/value construct, where you can retrieve a value from the dictionary by using a key.

Since Dictionaries are really just objects. You can also retrieve a dictionary's value using object
notation if the keys are strings

```ts
let a: { [key: number]: string };
a = { 123: "abc", 456: "def" };
let b: { [key: string]: boolean };
b = { abc: true, def: false, ghi: true };
let c: { [id: number]: number[] };
c = { 1: [1, 2, 3], 2: [4, 5, 6], 3: [7, 8, 9], 4: [10, 11, 12] };

console.log(a[123]); // abc
console.log(b["def"]); // false
console.log(c[1]); // [ 1, 2, 3 ]

console.log(a.123); // this doesn't work when the key is a number

delete a[456];
console.log(a); // { '123': 'abc' }
```

#### Tuple

The Tuple is similar to an array, but you are explicitly indicating how many items are
in the Tuple and of which type they are when you instantiate it. The Tuple type is not
directly supported in JavaScript as a Tuple, but as an array instead. The rules of the
Tuple are enforced in TypeScript only when it is created. After the Tuple is created,
it behaves the same as an array. You can add/remove/edit items.

```ts
let a: [number, string];
a = [1, "abc"];
let b: [string, boolean, number];
b = ["abc", false, 123];

a = [1] // Type '[number]' is not assignable to type '[number, string]'.
a = [1, "abc", true]; // Type '[number, string, boolean]' is not assignable to type '[number, string]'.

console.log(a[1]); // abc
console.log(b[2]); // 123
```

#### Set
The Set object lets you store unique values of any type. Any duplicate items added to the Set won't be added.

```ts
let sa: Set<number>;
sa = new Set([1, 2, 3, 4, 2]);
let sb: Set<string>;
sb = new Set(["a", "b", "c", "d", "a"]); // the second `a` is not added
let sc: Set<unknown>;
sc = new Set([1, "b", true]);

console.log(sa); // Set(4) { 1, 2, 3, 4 }
console.log(sb); // Set(4) { 'a', 'b', 'c', 'd' }
console.log(sc); // Set(3) { 1, 'b', true }

const d: Set<string> = new Set();
d.add("cat");
d.add("dog");
d.add("bird");
console.log(d); // Set(3) { 'cat', 'dog', 'bird' }

d.delete("cat");
console.log(sd); // Set(2) { 'dog', 'bird' }

console.log(d.size); // 2
console.log(d.has('dog')); // true
```

### Classes
Simply, they are a template that can be used when creating custom objects.

```ts
class Dog {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  walk(steps: number): void {
    console.log(this.name + ' the dog has walked ' + steps + ' steps');
  }
}

const dog = new Dog('pilin');
dog.walk(5); // pilin the dog has walked 5 steps
```

### Interfaces
Interfaces in TypeScript are a useful tool that you can use for your classes to ensure that they
conform to any specific rules that you want them to. This is especially useful if there are many
people working on the same code base, and any classes need to follow any specific rules.

```ts

interface IAnimal {
  name: string;
  age: number;
  feed(food: string, amount: number): void;
}

class Lion implements IAnimal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  feed(food: string, amount: number): void {
    console.log(
      "Feeding " + this.name + " the lion " + amount + " kg of " + food
    );
  }
}

const lion = new Lion("Pumba", 4);
lion.feed("meat", 4); // Feeding Pumba the lion 4 kg of fish
```

### Extending clases
You can extend any existing class templates by using the `extends` keyword. The new class definition will be made up of the original class, but can optionally include its own new bespoke constructor, properties and/or methods. The new class definition is known as the derived class or subclass.
Extending a class is a different concept than implementing an interface.
With the derived class, the original class being extended is called the **base** or **super** class. It is a class that may have methods and properties that are common, but another class can be created from it that extends from this base/super class and has the option to override the constructor, methods and properties.The derived class also has the option to create additional methods and properties specific for its own needs. If the base class is using an interface, then any derived class will already comply provided that the base class was already correctly complying with its chosen interface.

```ts
class Car {
  reference: string;
  model: number;
  color: string;

  constructor(reference: string, model: number, color: string) {
    this.reference = reference;
    this.model = model;
    this.color = color;
  }

  accelerate(transmissionType: string, currentSpeed: number): void {
    console.log(
      'Accelerate', this.reference,
      'the', this.constructor.name,
      'transmission', transmissionType,
      'has current speed of', currentSpeed, 'kms/h'
    )
  }
}

class Mitsubishi extends Car {
  hasFuel: boolean;

  constructor(reference: string, model: number, color: string, hasFuel: boolean) {
    super(reference, model, color); // pointing base class
    this.hasFuel = hasFuel;
  }

  accelerate(transmissionType: string, currentSpeed: number): void { //override method
    if (this.hasFuel) {
      super.accelerate(transmissionType, currentSpeed);
    } else {
      console.log(this.reference, 'the', this.constructor.name, 'doesnt have fuel')
    }
  }
}

class Chevrolet extends Car {};

const chevrolet = new Chevrolet('Onix', 2018, 'grey');
chevrolet.accelerate('Manual', 110);
const mitsubishi = new Mitsubishi('Montero', 2018, 'grey', false);
mitsubishi.accelerate('Automatic', 180);
```

***Extending Class Example 2***
```ts
class Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  feed(food: string, amount: number): void {
    console.log(
      "Feeding " +
        this.name +
        " the " +
        this.constructor.name +
        " " +
        amount +
        " kg of " +
        food
    );
  }
}

class Pig extends Animal {
  isHungry: boolean;
  name = 'Emy' //override property
  constructor(name: string, age: number, isHungry: boolean) {
    super(name, age);
    // this.name = name;
    this.isHungry = isHungry;
  }

  feed(food: string, amount: number): void {
    if (this.isHungry) {
      super.feed(food, amount);
    } else {
      console.log(
        "Feeding " +
          this.name +
          " the " +
          this.constructor.name +
          " is not hangry"
      );
    }
  }
}

class Horse extends Animal {}

const pig = new Pig("Niño", 2, false);   // Feeding Niño the Pig is not hangry
const horse = new Horse("Galopante", 1);

pig.feed("Afrecho", 4);
horse.feed("grass", 8); // Feeding Galopante the Horse 8 kg of grass
```

### Abstract class
You can extend classes with Abstract classes. Consider an abstract class as a base class. It is a
class that may have methods and properties that are common, but another class can be created
which extends from this base class and overrides any existing methods or can add additional methods
and properties specific for itself.

It is different than an `interface` in the way that is not indicating rules that the class must follow,
but the class that is extending will already have its own copies of the base classes properties and
methods once any new object is instantiated using it.
Abstract classes are like a mixture of implementing interfaces and extending a class in one step. You can create a class with optional methods and properties, but also indicate which methods and properties must be implemented in the derived class. Note that your base class, despite enforcing abstract rules, is still able to itself implement any interfaces you desire.

Use the `abstract` keyword to indicate a class contains `abstract` methods or properties.
If any methods are marked as abstract, then they must also be implemented in the derived class.

```ts
abstract class Animal {
  abstract name: string;
  age: number;

  constructor(age: number) {
    // this.name = name; // Abstract property 'name' in class 'Animal' cannot be accessed in the constructor.
    this.age = age;
  }

  abstract feed(food: string, amount: number): void;
}

class Pig extends Animal {
  isHungry: boolean;
  name: string;
  constructor(name: string, age: number, isHungry: boolean) {
    super(age);
    this.name = name;
    this.isHungry = isHungry;
  }

  feed(food: string, amount: number): void {
    if (this.isHungry) {
      console.log(
        "Feeding " +
          this.name +
          " the " +
          this.constructor.name +
          " " +
          amount +
          " kg of " +
          food
      );
    } else {
      console.log(
        "Feeding " +
          this.name +
          " the " +
          this.constructor.name +
          " is not hangry"
      );
    }
  }
}

class Horse extends Animal {
  name: string;
  constructor(name: string, age:number) {
    super(age);
    this.name = name;
  }

  feed(food: string, amount: number): void {
    console.log(
      "Feeding " +
        this.name +
        " the " +
        this.constructor.name +
        " " +
        amount +
        " kg of " +
        food
    );
  }
}

const pig = new Pig("Niño", 2, false);
const horse = new Horse("Galopante", 1);

pig.feed("Afrecho", 4);
horse.feed("grass", 8);
```

### Access Modifiers
TypeScript supports access modifiers for your class properties and methods.

#### Public
In JavaScript, all class properties are public by default so there is no need to write
the public keyword in your TypeScript files.

```ts
class Device {
  public name: string;

  constructor(name:string) {
    this.name = name;
  }

}

const device = new Device('Tv');
console.log(device.name)
```

#### Private
TypeScript also has its own way to declare a member as being marked private, it cannot be accessed
from outside of its containing class.

```ts
class Device {
  private name: string;

  constructor(name:string) {
    this.name = name;
  }
}

class TV extends Device {
  constructor(name: string) {
    super(name)
    console.log(this.name); // Property 'name' is private and only accessible within class 'Device'.
  }
}

const device = new Device('Tv');
console.log(device.name) //Property 'name' is private and only accessible within class 'Device'
```

#### Protected
The protected modifier acts much like the private modifier with the exception that members declared
protected can also be accessed within subclasses.

```ts
class Device {
  protected name: string;

  constructor(name:string) {
    this.name = name;
  }

}

class TV extends Device {
  constructor(name: string) {
    super(name)
  }
}

const device = new Device('Tv');
console.log(device.name) // Property 'name' is protected and only accessible within class 'Device' and its subclasses
```

### Static Members
Now it's possible to make objects that were instantiated from classes share the same methods and properties behind the scenes, and that is using the `static` keyword.

The code below shows some examples of the `static` keyword and how the `static` properties and methods are referred to.

```ts
class ClassWithProperty {
    abc = 123
}

class ClassWithStaticProperty {
    static abc = 123
}

class ClassWithMethod {
    method() {
        return 123
    }
}

class ClassWithStaticMethod {
    static method() {
        return 123
    }
}

const classWithProperty = new ClassWithProperty();
console.log(classWithProperty.abc); // 123

// const classWithStaticProperty = new ClassWithStaticProperty();
// console.log(classWithStaticProperty.abc); // Property 'abc' does not exist on type 'ClassWithStaticProperty'.
console.log(ClassWithStaticProperty.abc); // 123

const classWithMethod = new ClassWithMethod();
console.log(classWithMethod.method());

// const classWithStaticMethod = new ClassWithStaticMethod();
// console.log(classWithStaticMethod.method()); // Property 'method' does not exist on type 'ClassWithStaticMethod'
console.log(ClassWithStaticMethod.method());
```

One particular example where a static property may be useful is in the example below where the property `PI` doesn't need to be recreated across each new instance of the Circle class, but all instances of the `circle` can point to the same value stored at the class level instead.

```ts
class Circle {
  radius: number;
  static PI = 3.14;

  constructor(radius: number) {
    this.radius = radius
  }
}

console.log('Circle.PI = ' + Circle.PI);
const CIRCLE1 = new Circle(1);
const CIRCLE2 = new Circle(2);
console.log('CIRCLE1 Area = ' + Circle.PI * CIRCLE1.radius ** 2);
console.log('CIRCLE2 Area = ' + Circle.PI * CIRCLE2.radius ** 2);
```

### ES6 Modules
On larger projects, it is common to split up your code into separate files. When doing this, you will need to tell each file which other file it needs to reference in case it is using objects, classes, types or interfaces from the other files.

`./src/test.ts`
```ts
import { Cat, Dog } from './animals'

const CAT = new Cat('Cosmo', 8)
console.log(CAT.name)
const DOG = new Dog('Rusty', 12)
console.log(DOG.name)
```
`./src/animals.ts`
```ts
import Animal from './animal'

export class Cat extends Animal {
    constructor(name: string, age: number) {
        super(name, age)
    }
}

export class Dog extends Animal {}
```
`./src/animal.ts`
```ts
export default class Animal {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
```

### UML Diagram
Unified Modeling Language (UML) Diagrams are used throughout the course to help describe the patterns. [UML Diagram](https://sbcode.net/typescript/uml_diagrams/)

* `Directed Association`: A filled arrow with a line.

***ClassA*** uses ***ClassB*** or an object of ***ClassB***.

ClassA calls a static class method, a static abstract method or a method/property/field from an object of type ClassB. e.g., The ***Person*** starts the ***Car*** engine.

* `A Class That Extends/Inherits A Class`: An unfilled arrow, with a line pointing to the class that is being extended/inherited.

***ClassA*** extends ***ClassB***.

The extended class contains all the attributes/fields and methods of the inherited class, including its own extra methods, attributes/fields, overrides and overloads.

* `A Class That Implements an Interface`* : An unfilled arrow, with a dashed line pointing to the interface that is being implemented.

***ClassA*** implements ***ClassB***.

A class that implements an interface must implement all the methods declared in the interface.

* `Aggregates`: An unfilled diamond with a line and arrow head.

***ClassA*** aggregates ***ClassB***.

`Library` aggregates `Books`. Books and Library can exist independently of each other. Books can exist without the Library.

* `Composition`: A filled diamond with a line and arrow head.

***ClassA*** is composed of ***ClassB***

***Aeroplane*** can be composed of ***Wings*** and other parts. But an aero plane is no longer really an aero plane without its wings.

* `Pseudocode Annotation`: A box with a dashed line and a circle placed near a class method.

Pseudocode is a plain language description of the steps in an algorithm and used to portray a concept without needing to write long lines of code.

## Creational
### Factory Design Pattern
When developing code, you may instantiate objects directly in methods or in classes. While this is quite normal, you may want to add an extra abstraction between the creation of the object and where it is used in your project.

You can use the Factory pattern to add that extra abstraction. The Factory pattern is one of the easiest patterns to understand and implement.

Adding an extra abstraction will also allow you to dynamically choose classes to instantiate based on some kind of logic.

This separation also makes your code easier to read and document.

The Factory pattern is really about adding that extra abstraction between the object creation and where it is used. This gives you extra options that you can more easily extend in the future.

#### Terminology

***Concrete Creator***: The client application, class or method that calls the Creator (Factory method).

***Product Interface***: The interface describing the attributes and methods that the Factory will require in order to create the final product/object.

***Creator***: The Factory class. Declares the Factory method that will return the object requested from it.

***Concrete Product***: The object returned from the Factory. The object implements the Product interface.

```ts
interface IProduct {
  name: string;
}

class ConcreteProduct implements IProduct {
  name = '';
}

class ConcreteProductA extends ConcreteProduct {
  constructor() {
    super();
    this.name = 'ConcreteProductA';
  }
}

class ConcreteProductB extends ConcreteProduct {
  constructor() {
    super();
    this.name = 'ConcreteProductB';
  }
}

class ConcreteProductC extends ConcreteProduct {
  constructor() {
    super();
    this.name = 'ConcreteProductC';
  }
}

class Creator {
  static creatorObject(someProperty: string) {
    if (someProperty === 'a') {
      return new ConcreteProductA();
    } else if (someProperty === 'b') {
      return new ConcreteProductB();
    } else {
      return new ConcreteProductC();
    }
  }
}

const PRODUCT = Creator.creatorObject('b');
console.log(PRODUCT.name); // 'ConcreteProductB'
```

#### Summary

* The Factory Pattern defers the creation of the final object to a subclass.
* The Factory pattern is about inserting another layer/abstraction between instantiating an object and where in your code it is actually used.
* It is unknown what or how many objects you will need to be created until runtime.
* You want to localize knowledge of the specifics of instantiating a particular object to the subclass so that the client doesn't need to be concerned about the details.
* You want to create an external framework, that an application can import/reference, and hide the details of the specifics involved in creating the final object/product.
* The unique factor that defines the Factory pattern, is that your project now defers the creation of objects to the subclass that the factory had delegated it to.