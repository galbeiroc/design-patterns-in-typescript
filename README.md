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

<img src='./assets/factory.png' alt="Factory UML Diagram" />

#### Source Code

```ts
// dimension.ts
export type dimension = {
  height: number;
  width: number;
  depth: number;
}

// chair.ts
import { dimension } from "./dimension";

// A Chair Interface
export interface IChair {
  height: number;
  width: number;
  depth: number;
  getDimension: () => dimension;
}

// Chair Base Class
export default class Chair implements IChair {
  height = 0;
  width = 0;
  depth = 0;

  getDimension(): dimension {
    return {
      height: this.height,
      width: this.width,
      depth: this.depth
    }
  }
}

// smallChair.ts
import Chair from "./chair";

export default class SmallChair extends Chair {
  constructor() {
    super();
    this.height = 40;
    this.width = 40;
    this.depth = 40;
  }
}

// mediumChair.ts
import Chair from "./chair";

export default class MediumChair extends Chair {
  constructor() {
    super();
    this.height = 60;
    this.width = 60;
    this.depth = 60;
  }
}

// bigChair.ts
import Chair from "./chair";

export default class BigChair extends Chair {
  constructor() {
    super();
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}

// chairFactory.ts
import BigChair from "./bigChair";
import { IChair } from "./chair";
import MediumChair from "./mediumChair";
import SmallChair from "./smallChair";

export default class ChairFactory {
  static getChair(chair: string): IChair {
    if (chair === 'BigChair') {
      return new BigChair();
    } else if (chair === 'MediumChair') {
      return new MediumChair();
    } else {
      return new SmallChair();
    }
  }
}

// Factory use case - example code
import ChairFactory from './chairFactory';

const CHAIR = ChairFactory.getChair('SmallChair');
console.log(CHAIR.getDimension());
```

#### Summary

* The Factory Pattern defers the creation of the final object to a subclass.
* The Factory pattern is about inserting another layer/abstraction between instantiating an object and where in your code it is actually used.
* It is unknown what or how many objects you will need to be created until runtime.
* You want to localize knowledge of the specifics of instantiating a particular object to the subclass so that the client doesn't need to be concerned about the details.
* You want to create an external framework, that an application can import/reference, and hide the details of the specifics involved in creating the final object/product.
* The unique factor that defines the Factory pattern, is that your project now defers the creation of objects to the subclass that the factory had delegated it to.

### Abstract Factory Design Pattern

The Abstract Factory Pattern adds an abstraction layer over multiple other creational pattern implementations.

To begin with, in simple terms, think if it as a Factory that can return Factories. Although you will find examples of it also being used to return Builder, Prototypes, Singletons or other design pattern implementations.

#### Terminology

***Client***: The client application that calls the Abstract Factory. It's the same process as the *Concrete Creator* in the Factory design pattern.

***Abstract Factory***: A common interface over all the sub factories.

***Concrete Factory***: The sub factory of the Abstract Factory and contains method(s) to allow creating the Concrete Product.

***Abstract Product***: The interface and/or abstraction for the product that the sub factory returns.

***Concrete Product***: The object that is finally returned.

#### Abstract Factory Example Use Case

An example use case may be that you have a furniture shopfront. You sell many kinds of furniture. You sell chairs and tables. And they are manufactured at different factories using different unrelated processes that are not important for your concern. You only need the factory to deliver.

You can create an extra module called FurnitureFactory, to handle the chair and table factories, thus removing the implementation details from the client.

<img src='./assets/abstract-factory.png' alt="Abstract Factory UML Diagram" />

#### Source Code

```ts
// dimension.ts
export type dimension = {
  height: number;
  width: number;
  depth: number;
}

// chair.ts
import { dimension } from "./dimension";

export interface IChair {
  name: string;
  height: number;
  width: number;
  depth: number;

  getDimension(): dimension;
}

export class Chair implements IChair {
  name = '';
  height = 0;
  width = 0;
  depth = 0;

  getDimension(): dimension {
    return {
      width: this.width,
      height: this.height,
      depth: this.depth
    }
  }
}

// smallChair.ts
import { Chair } from "./chair";

export class SmallChair extends Chair {
  constructor() {
    super();
    this.name = 'Small Chair';
    this.height = 40;
    this.width = 40;
    this.depth = 40;
  }
}

// mediumChair.ts
import { Chair } from "./chair";

export class MediumChair extends Chair {
  constructor() {
    super();
    this.name = 'Medium Chair';
    this.height = 60;
    this.width = 60;
    this.depth = 60;
  }
}

// bigChair.ts
import { Chair } from "./chair";

export class BigChair extends Chair {
  constructor() {
    super();
    this.name = 'Big Chair';
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}

// chairFactory.ts
import { BigChair } from "./bigChair";
import { Chair, IChair } from "./chair";
import { MediumChair } from "./mediumChair";
import { SmallChair } from "./smallChair";

enum ChairsType {
  SmallChair = 'SmallChair',
  MediumChair = 'MediumChair',
  BigChair = 'BigChair'
}

export class ChairFactory {
  static getChair(chairType: string): IChair {
    try {
      if(chairType === ChairsType.SmallChair) {
        return new SmallChair();
      } else if(chairType === ChairsType.MediumChair) {
        return new MediumChair();
      } else if (chairType === ChairsType.BigChair) {
        return new BigChair();
      } else {
        throw new Error('Class not found');
      }
    } catch(e) {
      console.log(e)
    }
    return new Chair();
  }
}

// table.ts
import { dimension } from "./dimension";

export interface ITable {
  name: string;
  height: number;
  width: number;
  depth: number;

  getDimension(): dimension;
}

export class Table implements ITable {
  name = '';
  height = 0;
  width = 0;
  depth = 0;

  getDimension(): dimension {
    return {
      width: this.width,
      height: this.height,
      depth: this.depth
    }
  }
}

// smallTable.ts
import { Table } from "./table";

export class SmallTable extends Table {
  constructor() {
    super();
    this.name = 'Small Table';
    this.height = 50;
    this.width = 50;
    this.depth = 50;
  }
}

// mediumTable.ts
import { Table } from "./table";

export class MediumTable extends Table {
  constructor() {
    super();
    this.name = 'Medium Table';
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}

// bigTable.ts
import { Table } from "./table";

export class BigTable extends Table {
  constructor() {
    super();
    this.name = 'Big Table';
    this.height = 100;
    this.width = 100;
    this.depth = 100;
  }
}

// tableFactory.ts
import { BigTable } from "./bigTable";
import { MediumTable } from "./mediumTable";
import { SmallTable } from "./smallTable";
import { ITable, Table } from "./table";

enum TablesType {
  SmallTable = 'SmallTable',
  MediumTable = 'MediumTable',
  BigTable = 'BigTable'
}

export class TableFactory {
  static getTable(tableType: string): ITable {
    try {
      if (tableType === TablesType.SmallTable) {
        return new SmallTable();
      } else if (tableType === TablesType.MediumTable) {
        return new MediumTable();
      } else if(tableType === TablesType.BigTable) {
        return new BigTable();
      } else {
        throw new Error('Class not found');
      }
    } catch(e) {
      console.log(e);
    }
    return new Table();
  }
}

// fornitureFactory.ts
import { IChair } from "./chair";
import { ChairFactory } from "./chairFactory";
import { ITable } from "./table";
import { TableFactory } from "./TableFactory";

export interface IForniture extends IChair, ITable {};

const chairs = ['SmallChair', 'MediumChair', 'BigChair'];
const tables = ['SmallTable', 'MediumTable', 'BigTable'];

export class FornitureFactory {
  static getFurniture(forniture: string): IForniture | undefined {
    try {
      if (chairs.indexOf(forniture) > -1) {
        return ChairFactory.getChair(forniture);
      }
      if (tables.indexOf(forniture) > -1) {
        return TableFactory.getTable(forniture);
      }
      throw new Error('Factory not Found');
    } catch(e) {
      console.log(e)
    }
  }
}

// client.ts
import { FornitureFactory } from "./furnitureFactory";

let FORNITURE = FornitureFactory.getFurniture('SmallChair');
console.log(FORNITURE?.name);
console.log(FORNITURE?.getDimension());

FORNITURE = FornitureFactory.getFurniture('BigTable');
console.log(FORNITURE?.name);
console.log(FORNITURE?.getDimension());
```

### Builder Design Pattern
The Builder Pattern is a creational pattern whose intent is to separate the construction of a complex object from its representation so that you can use the same construction process to create different representations.

The Builder Pattern tries to solve,

* How can a class create different representations of a complex object?
* How can a class that includes creating a complex object be simplified?

The Builder and Factory patterns are very similar in the fact they both instantiate new objects at runtime. The difference is when the process of creating the object is more complex, so rather than the Factory returning a new instance of `ObjectA`, it calls the builders' director constructor method `ObjectA.construct()` that goes through a more complex construction process involving several steps. Both return an Object/Product.

#### Terminology
***Product***: The Product being built.

***Builder Interface***: The Interface that the Concrete builder should implement.

***Builder***: Provides methods to build and retrieve the concrete product. Implements the Builder Interface.

***Director***: Has a construct() method that when called creates a customized product using the methods of the Builder.

#### Builder Use Case
Using the Builder Pattern in the context of a House Builder.
There are multiple directors that can create their own complex objects.
Note that in the `IglooDirector` class, not all the methods of the HouseBuilder were called.
The builder can construct complex objects in any order and include/exclude whichever parts it likes.

<img src='./assets/builder.png' alt="Builder UML Diagram" />

```ts
// house.ts
export default class House {
  doors: number = 0;
  windows: number = 0;
  wallMaterial: string = '';
  buildingType: string = '';

  construction(){
    return `This is a ${this.wallMaterial} ${this.buildingType} with ${this.doors} door(s) and ${this.windows} window(s).`;
  }
}

// houseBuilder.ts
import House from "./house";

interface IHouseBuilder {
  house: House;
  setBuildingType(buildingType: string): this;
  setWallMaterial(wallMaterial: string): this;
  setNumberDoors(doors: number): this;
  setNumberWindows(windows: number): this;
  getResult(): House
}

export default class HouseBuilder implements IHouseBuilder {
  house: House;

  constructor() {
    this.house = new House();
  }

  setBuildingType(buildingType: string): this {
    this.house.buildingType = buildingType;
    return this;
  }

  setNumberDoors(doors: number): this {
    this.house.doors = doors;
    return this;
  }

  setWallMaterial(wallMaterial: string): this {
    this.house.wallMaterial = wallMaterial;
    return this;
  }

  setNumberWindows(windows: number): this {
    this.house.windows = windows;
    return this;
  }

  getResult(): House {
    return this.house
  }
}

// directorBoat.ts
import House from "./house";
import HouseBuilder from "./houseBuilder";

export default class DirectorBoat {
  static contruct(): House {
    return new HouseBuilder()
      .setBuildingType('House Boat')
      .setWallMaterial('Wood')
      .setNumberDoors(6)
      .setNumberWindows(4)
      .getResult();
  }
}

// directorCastle.ts
import House from "./house";
import HouseBuilder from "./houseBuilder";

export default class DirectorCastle {
  static contruct(): House {
    return new HouseBuilder()
      .setBuildingType('Castle')
      .setWallMaterial('Sandstone')
      .setNumberDoors(10)
      .setNumberWindows(14)
      .getResult();
  }
}

// directorIgloo.ts
import House from "./house";
import HouseBuilder from "./houseBuilder";

export default class DirectorIgloo {
  static construct(): House {
    return new HouseBuilder()
      .setBuildingType('Igloo')
      .setWallMaterial('Ice')
      .setNumberDoors(1)
      .getResult()
  }
}

// client.ts
import DirectorBoat from "./directorBoat";
import DirectorCastle from "./directorCastle";
import DirectorIgloo from "./directorIgloo";

const IGLOO = DirectorIgloo.construct();
const CASTLE = DirectorCastle.contruct();
const BOAT = DirectorBoat.contruct();

console.log(IGLOO.construction()); // This is a Ice Igloo with 1 door(s) and 0 window(s).
console.log(CASTLE.construction()); // This is a Sandstone Castle with 10 door(s) and 14 window(s).
console.log(BOAT.construction()); // This is a Wood House Boat with 6 door(s) and 4 window(s).
```
#### Summary
The Builder pattern is a creational pattern that is used to create more complex objects than you'd expect from a factory.
The Builder pattern should be able to construct complex objects in any order and include/exclude whichever available components it likes.
For different combinations of products than can be returned from a Builder, use a specific Director to create the bespoke combination.
You can use an `Abstract Factory` to add an abstraction between the client and Director.

### Prototype Design Pattern
The Prototype design pattern is good for when creating new objects requires more resources than you want to use or have available. You can save resources by just creating a copy of any existing object that is already in memory.
In the Prototype patterns interface, you create a clone method that should be implemented by all classes that use the interface. How the clone method is implemented in the concrete class is up to you. You will need to decide whether a shallow or deep copy is required.

* A shallow copy, copies and creates new references one level deep,
* A deep copy, copies and creates new references for all levels.


#### Terminology

***Prototype Interface***: The interface that describes the clone() method.

***Prototype***: The Object/Product that implements the Prototype interface.

***Client***: The client application that uses and creates the ProtoType.

#### Prototype Use Case
In this example, an object called document is cloned using shallow and deep methods.

I clone the documents instance properties and methods.

The object contains an array of two arrays. Three copies are created, and each time some part of the array is changed on the clone, and depending on the method used, it can affect the original object.

When cloning an object, it is good to understand the deep versus shallow concept of copying and whether you also want the clone to contain the classes methods.

<img src='./assets/prototype.png' alt="Prototype UML Diagram" />

#### Prototype Use Case
In this example, an object called document is cloned using shallow and deep methods.
I clone the documents instance properties and methods.
The object contains an array of two arrays. Three copies are created, and each time some part of the array is changed on the clone, and depending on the method used, it can affect the original object.
When cloning an object, it is good to understand the deep versus shallow concept of copying and whether you also want the clone to contain the classes methods.

```ts
// iprototype.ts
// Prototype concept sample code
import Document from "./document";

export default interface IPrototype {
  clone(mode: number): Document;
}

// document.ts
import ProtoType from './iPrototype';

export default class Document implements ProtoType {
  name: string;
  array: [number[], number[]];

  constructor(name: string, array:[number[], number[]]) {
    this.name = name;
    this.array = array;
  }

  clone(mode: number): Document {
    // This clone method uses different copy techniques
    let array;
    if(mode === 2) {
      // results in a deep copy of the Document
      array = JSON.parse(JSON.stringify(this.array));
    } else {
      // default, results in a shallow copy of the Document
      array = Object.assign([], this.array);
    }
    return new Document(this.name, array);
  }
}

// client.ts
import Document from "./document";

// Creating a document containing an array of two arrays
const ORIGINAL_DOCUMENT = new Document('Original', [
  [1, 2, 3, 4],
  [5, 6, 7, 8]
]);
console.log(ORIGINAL_DOCUMENT);

const DOCUMENT_COPY_1 = ORIGINAL_DOCUMENT.clone(1); // shallow copy
DOCUMENT_COPY_1.name = 'Copy 1';
// This also modified ORIGINAL_DOCUMENT because of the shallow copy
// when using mode 1
DOCUMENT_COPY_1.array[1][1] = 200;
console.log(DOCUMENT_COPY_1);
console.log(ORIGINAL_DOCUMENT);

const DOCUMENT_COPY_2 = ORIGINAL_DOCUMENT.clone(1) // shallow copy
DOCUMENT_COPY_2.name = 'Copy 2'
// This does NOT modify ORIGINAL_DOCUMENT because it changes the
// complete array[1] reference that was shallow copied when using mode 1
DOCUMENT_COPY_2.array[1] = [9, 10, 11, 12];
console.log(DOCUMENT_COPY_2);
console.log(ORIGINAL_DOCUMENT);

const DOCUMENT_COPY_3 = ORIGINAL_DOCUMENT.clone(2); // deep copy
DOCUMENT_COPY_3.name = 'Copy 3';
// This does modify ORIGINAL_DOCUMENT because it changes the element of
// array[1][0] that was deep copied recursively when using mode 2
DOCUMENT_COPY_3.array[1][0] = 1234;
console.log(DOCUMENT_COPY_3);
console.log(ORIGINAL_DOCUMENT);
```

#### Summary
* Just like the other creational patterns, a Prototype is used to create an object at runtime.
* A Prototype is created from an object that is already instantiated. Imagine using the existing object as the class template to create a new object, rather than calling a specific class. Note that, the clone method used in the concept video demonstrated didn't copy the class methods to the new object. The clones only contained copies of the instance properties. If you want your new clone to have the same methods of the original class, then use the classes' constructor when returning the clone as I did in the `clone(mode)` method in `document.ts`.
* The ability to create a Prototype means that you don't need to create many classes for specific combinations of objects. You can create one object, that has a specific configuration, then clone it and alter some factor of it, then create another clone from this altered configuration, and keep continuing to create many objects which are all slightly different from each other.
* New Prototypes can be created at runtime, without knowing what kind of attributes the prototype may eventually have. E.g., You have a sophisticated object that was randomly created from many factors, and you want to clone it rather than adding all those same factors over and over again until the new object matches the one that could have just been cloned.
* A prototype is also useful for when you want to create a copy of an object, but creating that copy may be very resource intensive. E.g., you can either create a new houseboat from the builder example, or clone an existing houseboat from one already in memory.
When designing your clone() method, you should consider which elements will be shallow copied or deep copied.

### Singleton Design Pattern
Sometimes you need an object in an application where there is only one instance.
You don't want there to be many versions, for example, you have a game with a score, and you want to adjust it. You may have accidentally created several instances of the class holding the score object. Or, you may be opening a database connection, there is no need to create many, when you can use the existing one that is already in memory. You may want a logging component, and you want to ensure all classes use the same instance. So, every class could declare their own logger component, but behind the scenes, they all point to the same memory address.
By creating a class and following the *Singleton* pattern, you can enforce that even if any number of instances were created, they will still refer to the original class.
The Singleton can be accessible globally, but it is not a global variable. The Singleton class can be instanced at any time, but after it is first instanced, any new instances will point to the same instance as the first.

<img src='./assets/singleton.png' alt="Singleton UML Diagram" />

#### Singleton Use Case
In the example, there are three games created. They are all independent instances created from their own class, but they all share the same leaderboard. The leaderboard is a Singleton.

It doesn't matter how the Games where created, or how they reference the leaderboard, it is always a Singleton.

Each game independently adds a winner, and all games can read the altered leaderboard regardless of which game updated it.

```ts
// igame.ts
// A Game interface
export default interface IGame {
  addWinner(position: number, name: string): void
}

// leaderboard.ts
// A Leaderboard Singleton class
export default class Leaderboard {
  static instance: Leaderboard;
  #table: { [id: number]: string } = {}

  constructor() {
    if(Leaderboard.instance) {
      return Leaderboard.instance;
    }
    Leaderboard.instance = this;
  }

  public addWinner(position: number, name: string) {
    this.#table[position] = name;
  }

  public print() {
    console.log('-------Leaderboard-------');
    for (const key in this.#table) {
      console.log(`|\t${key}\t${this.#table[key]}\t|`);
    }
  }
}

// game1.ts
// A Game Class that uses the leaderboard Singleton
import Leaderboard from "./leaderboard";
import Game from './igame';

export default class Game1 implements Game {
  leaderBoard: Leaderboard;

  constructor() {
    this.leaderBoard = new Leaderboard();
  }

  addWinner(position: number, name: string): void {
    this.leaderBoard.addWinner(position, name);
  }
}

// game2.ts
// A Game Class that uses the leaderboard Singleton
import Leaderboard from "./leaderboard";
import Game from './igame';

export default class Game2 implements Game {
  leaderBoard: Leaderboard;

  constructor() {
    this.leaderBoard = new Leaderboard();
  }

  addWinner(position: number, name: string): void {
    this.leaderBoard.addWinner(position, name);
  }
}

// game3.ts
// A Game Class that uses the leaderboard Singleton
import Leaderboard from "./leaderboard";
import Game from './igame';

export default class Game3 implements Game {
  leaderBoard: Leaderboard;

  constructor() {
    this.leaderBoard = new Leaderboard()
  }

  addWinner(position: number, name: string): void {
      this.leaderBoard.addWinner(position, name);
  }
}

// cleint.ts
import Game1 from "./game1";
import Game2 from "./game2";
import Game3 from "./game3";

// The Client
// Despite all games instantiating a leaderboard, they all point
// to the same memory object since the leaderboard is a singleton.
const GAME1 = new Game1();
const GAME11 = new Game1();
GAME1.addWinner(3, 'Cosmo');
GAME11.addWinner(7, 'Susan');

const GAME2 = new Game2();
GAME2.addWinner(2, 'Sean');

const GAME3 = new Game3();
GAME3.addWinner(4, 'Emmy');

GAME1.leaderBoard.print();
GAME2.leaderBoard.print();
GAME3.leaderBoard.print();
/*
-------Leaderboard-------
|       2       Sean    |
|       3       Cosmo   |
|       4       Emmy    |
|       7       Susan   |
-------Leaderboard-------
|       2       Sean    |
|       3       Cosmo   |
|       4       Emmy    |
|       7       Susan   |
-------Leaderboard-------
|       2       Sean    |
|       3       Cosmo   |
|       4       Emmy    |
|       7       Susan   |
*/
```

#### Summary
* To be a Singleton, there must only be one copy of the Singleton, no matter how many times, or in which class it was instantiated.
* You want the attributes or methods to be globally accessible across your application, so that other classes may be able to use the Singleton.
* You can use Singletons in other classes, as I did with the leaderboard, and they will all use the same Singleton instance regardless.
* You want controlled access to a sole instance.
* A singleton differs from a class containing just static methods and properties in the way that you can make your Singleton implement an interface and/or extend a base class. You also create an instance of a Singleton at runtime using the `new` keyword.

## Structural
### Decorator Design Pattern
The `decorator pattern` is a structural pattern, that allows you to attach additional responsibilities to an object at runtime.

The decorator pattern is used in both the Object-Oriented and Functional paradigms.
The decorator pattern adds extensibility without modifying the original object.
The decorator forwards requests to the enclosed object and can perform extra actions.
You can nest decorators recursively.

#### Terminology
***Component Interface***: An interface for objects.
***Component***: The object that may be decorated.
***Decorator***: The class that applies the extra responsibilities to the component being decorated. It also implements the same component interface.

<img src='./assets/decorator.png' alt="Decorator UML Diagram" />

#### Decorator Use Case
Let's create a custom class called `Value` that will hold a number.

Then add decorators that allow addition (`Add`) and subtraction (`Sub`) to a number (`Value`).

The `Add` and `Sub` decorators can accept numbers directly, a custom Value object or other Add and Sub decorators.

`Add`, `Sub` and `Value` all implement the `IValue` interface and can be used recursively.

Note that in this example use case, I have created the `Add`, `Sub` and `Value` as functions that return new instances of classes `_Add`, `_Sub` and `_Value`. This was not necessary, but it means that I can use the `Add`, `Sub` and `Value` in a recursive manner without needing to prefix the `new` keyword in front of each usage all the time.

E.g,
```js
console.log(Add(Sub(Add(C, B), A), 100).value);
```
Alternatively, I could have named my classes as Add, Sub and Value and then used them recursively directly as
```js
console.log(new Add(new Sub(new Add(C, B), A), 100).value);
```

```ts
// value.ts
export interface IValue {
  value: number;
}

class _Value implements IValue {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

export default function Value(value: number): IValue {
  return new _Value(value);
}

// add.ts
import { IValue } from './value';

class _Add implements IValue {
  value: number;

  constructor(val1: IValue | number, val2: IValue | number) {
    const left = Object.prototype.hasOwnProperty.call(val1, 'value')
      ? (val1 as IValue).value
      : (val1 as number);
    const right = Object.prototype.hasOwnProperty.call(val2, 'value')
      ? (val2 as IValue).value
      : (val2 as number);

    this.value = left + right;
  }
}

export default function Add(
  val1: IValue | number,
  val2: IValue | number
): IValue {
  return new _Add(val1, val2);
}

// sub.ts
import { IValue } from './value';

class _Sub implements IValue {
  value: number;

  constructor(val1: IValue | number, val2: IValue | number) {
    const left = Object.prototype.hasOwnProperty.call(val1, 'value')
      ? (val1 as IValue).value
      : (val1 as number);
    const right = Object.prototype.hasOwnProperty.call(val2, 'value')
      ? (val2 as IValue).value
      : (val2 as number)
    
    this.value = left - right;
  }
}

export default function Sub(
  val1: IValue | number,
  val2: IValue | number
) : IValue {
  return new _Sub(val1, val2);
}

// client.ts
// Decorator Use Case Example Code
import Add from "./add";
import Sub from "./sub";
import Value from "./value";

const A = Value(1);
const B = Value(2);
const C = Value(5);

console.log(Add(A, B).value); // 3
console.log(Add(A, 100).value); // 101
console.log(Sub(C, A).value); // 4
console.log(Sub(Add(C, B), A).value) // 6
console.log(Sub(100, 101).value) // -1
console.log(Add(Sub(Add(C, B), A), 100).value); // 106
console.log(A.value, B.value, C.value); // 1 2 5
```

#### Summary

* Use the decorator when you want to add responsibilities to objects dynamically without affecting the inner object.
* You want the option to later remove the decorator from an object in case you no longer need it.
* It is an alternative method to creating multiple combinations of subclasses. I.e., Instead of creating a subclass with all combinations of objects A, B, C in any order, and including/excluding objects, you could create 3 objects that can decorate each other in any order you want. E.g., (C(A(C))) or (B(C)) or (A(B(A(C))))
* The decorator, compared to extending, is more flexible since you can easily add/remove the decorators at runtime. E.g., use in a recursive function.
* A decorator supports recursive composition. E.g., halve(halve(number))
* A decorator shouldn't modify the internal objects data or references. This allows the original object to stay intact if the decorator is later removed.

### Adapter Design Pattern
Sometimes classes have been written, and you don't have the option of modifying their interface to suit your needs. This happens if the method you are calling is on a different system across a network, a library that you may import or generally something that is not viable to modify directly for your particular needs.

The ***Adapter*** design pattern solves these problems:

* How can a class be reused that does not have an interface that a client requires?
* How can classes that have incompatible interfaces work together?
* How can an alternative interface be provided for a class?

You may have two classes that are similar, but they have different method signatures, so you create an Adapter over top of one of the method signatures so that it is easier to implement and extend in the client.

An adapter is similar to the `Decorator` in the way that it also acts like a wrapper to an object. It is also used at runtime; however, it is not designed to be used recursively.

It is an alternative interface over an existing interface. Furthermore, it can also provide extra functionality that the interface being adapted may not already provide.

The adapter is similar to the `Facade`, but you are modifying the method signature, combining other methods and/or transforming data that is exchanged between the existing interface and the client.

The Adapter is used when you have an existing interface that doesn't directly map to an interface that the client requires. So, then you create the Adapter that has a similar functional role, but with a new compatible interface.

#### Terminology
***Target***: The domain specific interface or class that needs to be adapted.
***Adapter***: The concrete adapter class containing the adaption process.
***Adapter Interface***: The interface that the adapter will need to implement in order to make the target compatible with the client.
***Client***: The client application that will use the Adapter.

#### Adapter Use Case
The example client can manufacture a *Cube* using different tools. Each solution is invented by a different company. The client user interface manages the Cube product by indicating the *width*, *height* and *depth*. This is compatible with the company A that produces the Cube tool, but not the company B that produces their own version of the Cube tool that uses a different interface with different parameters.

In this example, the client will re-use the interface for company A's Cube and create a compatible Cube from company B.

An adapter will be needed so that the same method signature can be used by the client without the need to ask company B to modify their Cube tool for our specific domains use case.

My imaginary company needs to use both cube suppliers since there is a large demand for cubes and when one supplier is busy, I can then ask the other supplier.

<img src='./assets/adapter.png' alt="Adapter UML Diagram" />

```ts
// cubeA.ts
// A hypotetical Cube tool from company A
export interface ICubeA {
  manufacture(width: number, height: number, depth: number): boolean
}

export default class CubeA implements ICubeA {
  static lastTime = Date.now();

  manufacture(width: number, height: number, depth: number): boolean {
    // if nor busy, then manufacture a cube with dimensiones
    const now = Date.now();
    if (now > CubeA.lastTime + 1500) {
      console.log(
        `Company A built Cube with dimensions ${width}x${height}x${depth}`
      );
      CubeA.lastTime = now;
      return true;
    }

    return false; // busy
  }
}

// cubeB.ts
// A hypotetical Cube tool from Company B
export interface ICubeB {
  create(
    topLeftFront: [number, number, number],
    bottomRightBack: [number, number, number]
  ): boolean;
}

export default class CubeB implements ICubeB {
  static lastTime = Date.now();

  create(topLeftFront: [number, number, number], bottomRightBack: [number, number, number]): boolean {
    // if not busy, then manufacture a cube with coords
    const now = Date.now();
    if (now > CubeB.lastTime + 3000) {
      console.log(
        `Company B built Cube with coords [${topLeftFront[0]},${topLeftFront[1]},${topLeftFront[2]},${bottomRightBack[0]},${bottomRightBack[1]},${bottomRightBack[2]}]`
      );
      CubeB.lastTime = now;
      return true
    }

    return false // busy
  }
}

// cubeBAdapter.ts
// Adapter for CubeB that implements ICubeA
import { ICubeA } from './cubeA';
import CubeB from './cubeB';

export default class CubeBAdapter implements ICubeA {
  #cube: CubeB;

  constructor() {
    this.#cube = new CubeB();
  }

  manufacture(width: number, height: number, depth: number): boolean {
    const success = this.#cube.create(
      [0 - width / 2, 0 - height / 2, 0 - depth / 2],
      [0 + width / 2, 0 + height / 2, 0 + depth / 2]
    );

    return success;
  }
}

// client.ts
// Adapter example use case
import CubeA from "./cubeA";
import CubeBAdapter from "./cuboBAdapter";

const totalCubes = 5;
let counter = 0;

const manufactureCube = () => {
  // produce 5 cubes from which ever supplier can manufacture it first
  const width = Math.floor(Math.random() * 10) + 1;
  const height = Math.floor(Math.random() * 10) + 1;
  const depth = Math.floor(Math.random() * 10) + 1;
  let cube = new CubeA();
  let success = cube.manufacture(width, height, depth);
  if (success) {
    counter += 1;
  } else {
    // try other manufacturer
    console.log('Company A was busy, so trying company B');
    cube = new CubeBAdapter();
    success = cube.manufacture(width, height, depth);
    if (success) {
      counter += 1;
    } else {
      console.log('Company B was busy, so trying company A');
    }
  }
}

// wait some time between manufacturing
const interval = setInterval(() => {
  manufactureCube();
  if (counter >= totalCubes) {
    clearInterval(interval);
    console.log(`${totalCubes} cubes have been manufactured`);
  }
}, 1000);
```

#### Summary
* Use the Adapter when you want to use an existing class, but its interface does not match what you need.
* The adapter adapts to the interface of its parent class for those situations when it is not viable to modify the parent class to be domain-specific for your use case.
* Adapters will most likely provide an alternative interface over an existing object, class or interface, but it can also provide extra functionality that the object being adapted may not already provide.
* An adapter is similar to a `Decorator` except that it changes the interface to the object, whereas the decorator adds responsibility without changing the interface. This also allows the Decorator to be used recursively.
* An adapter is similar to the `Bridge` pattern and may look identical after the refactoring has been completed. However, the intent of creating the Adapter is different. The Bridge is a result of refactoring existing interfaces, whereas the Adapter is about adapting over existing interfaces that are not viable to modify due to many existing constraints. E.g., you don't have access to the original code, or it may have dependencies that already use it and modifying it would affect those dependencies negatively.

### Facade Design Pattern
Sometimes you have a system that becomes quite complex over time as more features are added or modified. It may be useful to provide a simplified API over it. This is the Facade pattern.

The Facade pattern essentially is an alternative, reduced or simplified interface to a set of other interfaces, abstractions and implementations within a system that may be full of complexity and/or tightly coupled.

It can also be considered as a higher-level interface that shields the consumer from the unnecessary low-level complications of integrating into many subsystems.

#### Facade Use Case
This is an example of a game engine API. The facade layer is creating one streamlined interface consisting of several methods from several larger API backend systems.

The client could connect directly to each subsystem's API and implement its authentication protocols, specific methods, etc. While it is possible, it would be quite a lot of consideration for each of the development teams, so the facade API unifies the common methods that becomes much less overwhelming for each new client developer to integrate into.

<img src='./assets/facade.png' alt="Facade UML Diagram" />

```ts
// gameEngine.ts
import Reports from "./reports";
import Wallets from "./wallets";

// The Game Engine
export interface GameState {
  clock: number;
  gameOpen: boolean;
  entries: [string, number][];
}

export default class GameEngine {
  static instance: GameEngine;
  #startTime = 0;
  #clock = 0;
  #entries: [string, number][] = [];
  #gameOpen = true;
  #wallets = new Wallets();
  #reports = new Reports();


  constructor() {
    if (GameEngine.instance) {
      return GameEngine.instance;
    }
    this.#startTime = Math.floor(Date.now() / 1000);
    this.#clock = 60;
    GameEngine.instance = this;
  }

  getGameState(): GameState {
    // Get a snapshot of the current game state
    const now = Math.floor(Date.now() / 1000);
    let timeRemaining = this.#startTime - now + this.#clock;

    if (timeRemaining < 0) {
      timeRemaining = 0;
    }
    this.#gameOpen = false;

    return {
      clock: timeRemaining,
      gameOpen: this.#gameOpen,
      entries: this.#entries
    } as GameState;
  }

  submitEntry(userId: string, entry: number): boolean {
    // Submit a new entry for the user in this game
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = this.#startTime - now + this.#clock;
    if (timeRemaining > 0) {
      if (this.#wallets.getBalance(userId) > 1) {
        if (this.#wallets.adjustBalance(userId, -1)) {
          this.#entries.push([userId, entry]);
          this.#reports.logEvent(
            `New entry '${entry}' submmitted by '${userId}'`
          );

          return true;
        }
        this.#reports.logEvent(
          `Problem adjusting balance for '${userId}'`
        );

        return false;
      }
      this.#reports.logEvent(`User balance for '${userId}'`);

      return false;
    }
    this.#reports.logEvent('Game closed');

    return false;
  }
}

// reports.ts
// A Singleton Dictionary of Report Events
export default class Reports {
  static instance: Reports;
  #reports: {[id: string]: [number, string] } = {};
  #rowId = 0;

  constructor() {
    if(Reports.instance) {
      return Reports.instance;
    }
    Reports.instance = this;
  }

  getHistory(): { [id: string]: [number, string] } {
    return this.#reports;
  }

  logEvent(event: string) {
    this.#reports[this.#rowId] = [Date.now(), event];
    this.#rowId += 1;
    return true;
  }
}

// wallets.ts
// A Singleton Dictionary of User Wallets
import Reports from "./reports";

export default class Wallets {
  static instance: Wallets;
  #wallets: { [id: string]: number } = {};
  #reports = new Reports();

  constructor() {
    if (Wallets.instance) {
      return Wallets.instance;
    }
    Wallets.instance = this;
  }

  createWallet(userId: string) {
    // A method to initialize a users wallet
    if(!(userId in this.#wallets)) {
      this.#wallets[userId] = 0;
      this.#reports.logEvent(
        `Wallet for ${userId} created and set to 0`
      );
      return true;
    }

    return false;
  }

  getBalance(userId: string): number {
    // A method to check a users balance
    this.#reports.logEvent(
      `Balance check for '${userId}' = ${this.#wallets[userId]}`
    );

    return this.#wallets[userId];
  }

  adjustBalance(userId: string, amount: number): number {
    // A method to adjust a user balance up or down
    this.#wallets[userId] = this.#wallets[userId] + amount;
    this.#reports.logEvent(
      `Balance adjustment for '${userId}'. New balance = ${this.#wallets[userId]}`
    );

    return this.#wallets[userId];
  }
}

// users.ts
// A Singleton Dictionary of Users
import Reports from "./reports";
import Wallets from "./wallets";

export default class Users {
  static instance: Users;
  #users: { [id: string]: { [id: string]: string } } = {};
  #reports = new Reports();
  #wallets = new Wallets();

  constructor() {
    if (Users.instance) {
      return Users.instance;
    }
    Users.instance = this;
  }

  registerUser(newUser: { [id: string]: string }): string {
    // Register user
    if (!(newUser['userName'] in this.#users)) {
      // Generate really complicated unique user_id.
      // Using the existing user_name as the id for simplicity
      const userId = newUser['userName'];
      this.#users[userId] = newUser;
      this.#reports.logEvent(`New user '${userId}' created`);
      // Greate a wallet for the new user
      this.#wallets.createWallet(userId);
      // Give new user a sign up bonus
      this.#reports.logEvent(
        `Give new user '${userId}' sign up bonus of 10`
      );
      this.#wallets.adjustBalance(userId, 10);

      return userId;
    }

    return '';
  }

  editUser(userId: string, user: { [id: string]: string }): boolean {
    // do nothing. Not implemented yet
    console.log(userId);
    console.log(user);
    return false;
  }

  changePassword(userId: string, password: string): boolean {
    // do nothing. Not implemented yet
    console.log(userId);
    console.log(password);
    return false;
  }
}

// gameApi.ts
// The Game API Facade
import GameEngine, { GameState } from "./gameEngine";
import Reports from "./reports";
import Users from "./users";
import Wallets from "./wallets";

export default class GameAPI {
  #wallets: Wallets;
  #reports: Reports;
  #users: Users;
  #gameEngine: GameEngine;

  constructor() {
    this.#wallets = new Wallets();
    this.#reports = new Reports();
    this.#users = new Users();
    this.#gameEngine = new GameEngine();
  }

  getBalance(userId: string) {
    // Get a players balance
    return this.#wallets.getBalance(userId);
  }

  gameState(): GameState {
    // Get the Current Game State
    return this.#gameEngine.getGameState();
  }

  getHistory(): { [id: string]: [number, string ] } {
    // Get the Game history
    return this.#reports.getHistory();
  }

  changePassword(userId: string, password: string): boolean {
    // Change users password
    return this.#users.changePassword(userId, password);
  }

  submitEntry(userId: string, entry: number): boolean {
    // Submit a bet
    return this.#gameEngine.submitEntry(userId, entry);
  }

  registerUser(value: { [id: string]: string }): string {
    // Register a new user and returns the new id
    return this.#users.registerUser(value);
  }
}

// client.ts
// The Facade Example Use Case
import GameAPI from "./gameApi";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function facadeExample() {
  const gameAPI = new GameAPI();

  const user = { userName: 'Jhon' };
  const userId = gameAPI.registerUser(user);
  console.log(userId);

  await sleep(500);

  gameAPI.submitEntry(userId, 5);

  await sleep(500);

  console.log('---- GameState Snapshot ----');
  console.log(gameAPI.gameState());

  await sleep(1000);

  const HISTORY = gameAPI.getHistory();
  
  console.log('---- Reports History ----');
  Object.keys(HISTORY).forEach((key) => {
    console.log(`${key} : ${HISTORY[key][0]} : ${HISTORY[key][1]}`);
  });

  await sleep(1000);

  console.log('---- User Balance ----');
  console.log(user.userName, ' : ', gameAPI.getBalance(userId));

  await sleep(1000);
  console.log('---- User Balance ----');
  console.log(gameAPI.gameState());
}

facadeExample();
```

#### Summary

* Use when you want to provide a simple interface to a complex subsystem.
* You want to layer your subsystems into an abstraction that is easier to understand.
* `Abstract Factory` and Facade can be considered very similar. An Abstract Factory is about creating in interface over several creational classes of similar objects, whereas the Facade is more like an API layer over many creational, structural and/or behavioral patterns.
* The `Mediator` is similar to the Facade in the way that it abstracts existing classes. The Facade is not intended to modify, load balance or apply any extra logic. A subsystem does not need to consider that existence of the facade, it would still work without it.
* A Facade is a minimal interface that could also be implemented as a Singleton.
* A Facade is an optional layer that does not alter the subsystem. The subsystem does not need to know about the Facade, and could even be used by many other facades created for different audiences.



### Bridge Design Pattern
The *Bridge pattern* is similar to the `Adapter` except in the intent that you developed it.

The Bridge is an approach to refactor already existing code, whereas the Adapter creates an interface on top of existing code through existing available means without refactoring any existing code or interfaces.

The motivation for converting your code to the Bridge pattern is that it may be tightly coupled. There is logic and abstraction close together that is limiting your choices in how you can extend your solution in the way that you need.

E.g., you may have one Car class, that produces a very nice car.

```ts
const CAR = new Car()
> Car has wheels and engine and windows and everything else.
```

But you would like to delegate the engine dynamically from a separate set of classes or solutions.

```ts
const ENGINE = new EngineA()
const CAR = new Car(ENGINE)
```

The Bridge pattern is a process about separating abstraction and implementation, so this will allow you more ways of using your classes.

A Bridge didn't exist before, but since after the separation of interface and logic, each side can be extended independently of each other.

The Bridge pattern should use composition instead of inheritance. This means that you assign the relationship when the object is created at runtime rather than hard coded in the class definition.

I.e., `CAR = new Car(EngineA)` rather than `class Car extends EngineA`

A Bridge implementation will generally be cleaner than an Adapter solution that was bolted on. Since it involved refactoring existing code, rather than layering on top of legacy or third-party solutions that may not have been intended for your particular use case.

#### Terminology
* ***Abstraction Interface***: An interface implemented by the refined abstraction describing the common methods to implement.
* ***Refined Abstraction***: A refinement of an idea into another class or two. The classes should implement the Abstraction Interface and assign which concrete implementer.
* ***Implementer Interface***: The implementer interface that concrete implementers implement.
* ***Concrete Implementer***: The implementation logic that the refined abstraction will use.

#### Source Code
In the concept demonstration code, imagine that the classes were tightly coupled. The concrete class would print out some text to the console.

After abstracting the class along a common ground, it is now more versatile. The implementation has been separated from the abstraction, and now it can print out the same text in two different ways.

The benefit now is that each refined abstraction and implementer can now be worked on independently without affecting the other implementations.

#### Use Case
In this example, I draw a square and a circle. Both of these can be categorized as shapes.

The shape is set up as the abstraction interface. The refined abstractions, `Square` and `Circle`, implement the `IShape` interface.

When the Square and Circle objects are created, they are also assigned their appropriate implementers being `SquareImplementer` and `CircleImplementer`.

When each shape's `draw` method is called, the equivalent method within their implementer is called.

The Square and Circle are bridged and each implementer and abstraction can be worked on independently.

<img src='./assets/bridge.png' alt="Bridge UML Diagram" />

```ts
// ishape.ts
// The Shape Abstraction Interface
export default interface IShape {
  draw(): void;
}

// IshapeImplementor.ts
// The Shape Implementor interface
export default interface IShapeImplementor {
  drawImplementor(): void;
}

// square.ts
// A Square Abstraction
import IShape from './ishape';
import  IShapeImplementor from './ishapeImplementer';

export default class Square implements IShape {
  #implementer: IShapeImplementor;

  constructor(implementer: IShapeImplementor) {
    this.#implementer = implementer;
  }

  draw(): void {
    this.#implementer.drawImplementor();
  }
}

// circle.ts
// A Circle Abstraction
import IShape from './ishape';
import IShapeImplementor from './ishapeImplementer';

export default class Circle implements IShape {
  #implementer: IShapeImplementor;

  constructor(implementer: IShapeImplementor) {
    this.#implementer = implementer;
  }

  draw(): void {
    this.#implementer.drawImplementor();
  }
}

// squareImplementor.ts
import IShapeImplementor from "./ishapeImplementer";

export default class SquareImplementer implements IShapeImplementor {
  drawImplementor(): void {
    console.log('********');
    console.log('*      *');
    console.log('*      *');
    console.log('*      *');
    console.log('********');
  }
}

// circleImplementor.ts
import IShapeImplementor from "./ishapeImplementer";

export default class CircleImplementer implements IShapeImplementor {
  drawImplementor(): void {
    console.log('   *****')
    console.log(' *        *')
    console.log('*          *')
    console.log('*          *')
    console.log(' *        *')
    console.log('    *****')
  }
}

// client.ts
// Bridge Pattern Concept Sample Case
import Circle from "./circle";
import CircleImplementer from "./circleImplementor";
import Square from "./square";
import SquareImplementer from "./squareImplementor";

const SQUARE = new Square(new SquareImplementer());
SQUARE.draw();

const CIRCLE = new Circle(new CircleImplementer());
CIRCLE.draw();
```

#### Summary
* Use when you want to separate a solution where the abstraction and implementation may be tightly coupled, and you want to break it up into smaller conceptual parts.
* Once you have added the bridge abstraction, you should be able to extend each side of it separately without breaking the other.
* Also, once the bridge abstraction exists, you can more easily create extra concrete implementations for other similar products that may also happen to be split across similar conceptual lines.
* The Bridge pattern is similar to the adapter pattern except in the intent that you developed it. The bridge is an approach to refactor already existing code, whereas the adapter adapts to the existing code through its existing interfaces and methods without changing the internals.

### Composite Design Pattern
The *Composite* design pattern is a structural pattern useful for hierarchical management.

The Composite design pattern,

* Allows you to represent individual entities(leaves) and groups of leaves as the same.
* Is a structural design pattern that lets you compose objects into a changeable tree structure.
* Is great if you need the option of swapping hierarchical relationships around.
* Allows you to add/remove components to the hierarchy.
* Provides flexibility of structure

Examples of using the Composite Design Pattern can be seen in a file system directory structure where you can swap the hierarchy of files and folders, and also in a drawing program where you can group, ungroup, transform objects and change multiple objects at the same time.

#### Terminology
* ***Component Interface***: The interface that all leaves and composites should implement.
* ***Leaf***: A single object that can exist inside or outside a composite.
* ***Composite***: A collection of leaves and/or other composites.

#### Source Code
In this concept code, two leaves are created, `LEAF_A` and `LEAF_B`, and two composites are created, `COMPOSITE_1` and `COMPOSITE_2`.

`LEAF_A` is attached to `COMPOSITE_1`.

Then I change my mind and attach `LEAF_A` to `COMPOSITE_2`.

I then attach `COMPOSITE_1` to `COMPOSITE_2`.

`LEAF_B` is not attached to composites.

#### Use Case
Demonstration of a simple in memory hierarchical file system.
A root object is created that is a composite.
Several files (leaves) are created and added to the root folder.
More folders (composites) are created, and more files are added, and then the hierarchy is reordered.

<img src='./assets/composite.png' alt="Bridge UML Diagram" />

```ts
// icomponents.ts
import Folder from "./folder";

export default interface IComponent {
  // A Component interface describing the common fields and methods of leaves and composites
  referenceToParent?: Folder;
  dir(indent: string): void;
  // A method each Leaf and composite container should implement

  detach(): void;
}

// folder.ts
import IComponent from "./icomponents";

export default class Folder implements IComponent {
  // A composite can contain leaves and composites
  referenceToParent?: Folder;
  name: string;
  components: IComponent[];

  constructor(name: string) {
    this.name = name;
    this.components = [];
  }

  dir(indent: string): void {
    console.log(`${indent}<DIR> ${this.name}`);

    this.components.forEach((component) => {
      component.dir(indent + '..');
    });
  }

  attach(component: IComponent): void {
    // Detach leaf / composite from any current parent reference and then set the parent reference to this composite
    component.detach();
    component.referenceToParent = this;
    this.components.push(component);
  }

  delete(component: IComponent) {
    // Removes leaf / composite from this composite this.components
    const index = this.components.indexOf(component);
    if (index) {
      this.components.splice(index, 1);
    }
  }

  detach(): void {
    // Detaching this composite from its parent composite
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
      this.referenceToParent = undefined;
    }
  }
}

// file.ts
import IComponent from "./icomponents";
import Folder from "./folder";

export default class File implements IComponent {
  // The File class. The files are leaves

  name: string;
  referenceToParent?: Folder = undefined;

  constructor(name: string) {
    this.name = name;
  }

  dir(indent: string): void {
    console.log(`${indent}<FILE> ${this.name}`);
  }

  detach(): void {
    'Detaching this leaf from its parent composite'
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
    }
  }
}

// client.ts
import File from "./file";
import Folder from "./folder";

const FILESYSTEM = new Folder('root');
const FILE_1 = new File('abc.txt');
const FILE_2 = new File('123.txt');
FILESYSTEM.attach(FILE_1);
FILESYSTEM.attach(FILE_2);

const FOLDER_A = new Folder('folder_a');
FILESYSTEM.attach(FOLDER_A);
const FILE_3 = new File('xyz.txt');
FOLDER_A.attach(FILE_3);

const FOLDER_B = new Folder('folder_b');
const FILE_4 = new File('456.txt');
FOLDER_B.attach(FILE_4);
FILESYSTEM.attach(FOLDER_B);
FILESYSTEM.dir('');

FOLDER_B.attach(FOLDER_A);
FILESYSTEM.dir('');
```

#### Summary
* The Composite design pattern allows you to structure components in a manageable hierarchical order.
* It provides flexibility of structure since you can add/remove and reorder components.
* File explorer on Windows is a very good example of the composite design pattern in use.
* Any system where you need to offer at runtime the ability to group, ungroup, modify multiple objects at the same time, would benefit from the composite design pattern structure. Programs that allow you to draw shapes and graphics will often also use this structure as well.

### Flyweight Design Pattern
*Fly* in the term *Flyweight* means light/not heavy.

Instead of creating thousands of objects that share common attributes, and result in a situation where a large amount of memory or other resources are used, you can modify your classes to share multiple instances simultaneously by using some kind of reference to the shared object instead.

The best example to describe this is a document containing many words and sentences and made up of many letters. Rather than storing a new object for each individual letter describing its font, position, color, padding and many other potential things. You can store just a lookup ID of a character in a collection of some sort and then dynamically create the object with its proper formatting etc., only as you need to.

This approach saves a lot of memory at the expense of using some extra CPU instead to create the object at presentation time.

The Flyweight pattern, describes how you can share objects rather than creating thousands of almost repeated objects unnecessarily.

A Flyweight acts as an independent object in any number of contexts. A context can be a cell in a table, or a div on an HTML page. A context is using the Flyweight.

You can have many contexts, and when they ask for a Flyweight, they will get an object that may already be shared amongst other contexts, or already within itself somewhere else.

When describing flyweights, it is useful to describe it in terms of intrinsic and extrinsic attributes.

***Intrinsic*** (in or including) are the attributes of a flyweight that are internal and unique from the other flyweights. E.g., a new flyweight for every letter of the alphabet. Each letter is intrinsic to the flyweight.

***Extrinsic*** (outside or external) are the attributes that are used to present the flyweight in terms of the context where it will be used. E.g., many letters in a string can be right aligned with each other. The extrinsic property of each letter is the new positioning of its X and Y on a grid.

#### Terminology
* ***Flyweight Interface***: An interface that describes the intrinsic properties of the flyweight.
* ***Concrete Flyweight***: The actual flyweight object that stores the intrinsic attributes and is instantiated when needed by the factory.
* ***Flyweight Factory***: Creates and manages the flyweights at runtime. It reuses flyweights or creates a new one on demand.
* ***Context***: Any object(s) within your application that will use the Flyweight Factory.
* ***Client***: The client application that contains contexts.

#### Source Code
A context is created using the string `abracadabra`.

As it is output, it asks the Flyweight factory for the next character. The Flyweight factory will either return an existing Flyweight, or create a new one before returning it.

abracadabra has many re-used characters, so only 5 flyweights needed to be created.

<img src='./assets/flyweight.png' alt="Flyweight UML Diagram" />

#### Use Case
In this example, I create a dynamic table with 3 rows and 3 columns each. The columns are then filled with some kind of text, and also chosen to be left, right or center aligned.

The letters are the flyweights and only a code indicating the letter is stored. The letters and numbers are shared many times.

The column cells are the contexts, and they pass the extrinsic vales describing the combination of letters, the justification left, right or center, and the width of the table column that is then used for the space padding.

```ts
// flyweight.ts
export default class Flyweight {
  // The concrete Flyweight
  code: number;

  constructor(code: number) {
    this.code = code;
  }
}

// flyweightFactory.ts
import Flyweight from "./flyweight";

export default class FlyweightFactory {
  // Creating the FlyweightFactory as a static class
  static flyweights: { [id: number]: Flyweight } = {};

  static getFlyweight(code: number): Flyweight {
    // A static method to get a flyweight based on code
    if(!(code in FlyweightFactory.flyweights)) {
      FlyweightFactory.flyweights[code] = new Flyweight(code);
    }

    return FlyweightFactory.flyweights[code];
  }

  static getCount(): number {
    // Returns the number of flyweights in the cache
    return Object.keys(FlyweightFactory.flyweights).length;
  }
}

// columns.ts
import FlyweightFactory from "./flyweightFactory";

// A Column that is used in a row
export default class Column {
  /**
   * The columns are the contexts.
   * They will share the Flyweights via the FlyweightsFactory.
   * `data`, `width` and `justify` are extrinsic values. They are outside of the flyweights
   */
  data: string = '';
  width: number = 10;
  justify: number = 0;

  getData(): string {
    // Get the Flyweight value from factory, and apply the extrinsec values
    const codes = [];
    for(let i = 0; i < this.data.length; i++) {
      codes.push(this.data.charCodeAt(i));
    }

    let ret = '';
    Array.from(codes).forEach((cod) => {
      ret += String.fromCharCode(FlyweightFactory.getFlyweight(cod).code);
    })

    switch(this.justify) {
      case 1:
        ret = this.leftAlign(this.width, ret, ' ');
        break;
      case 2:
        ret = this.rightAlign(this.width, ret, ' ');
        break;
      default:
        ret = this.center(this.width, ret, ' ');
    }

    return ret;
  }

  center(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.centerAlternate(width, padding + str, padding);
  }

  centerAlternate(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.center(width, str + padding, padding);
  }

  leftAlign(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.leftAlign(width, str + padding, padding);
  }

  rightAlign(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.rightAlign(width, padding + str, padding);
  }
}

// row.ts
// A Row in the Table
import Column from "./column";

export default class Row {
  columns: Column[];

  constructor(columnCount: number) {
    this.columns = [];
    for(let i = 0; i < columnCount; i++) {
      this.columns.push(new Column());
    }
  }

  getData(): string {
    // Format the row before returning it to the table
    let ret = '';
    this.columns.forEach((col) => {
      ret = `${ret}${col.getData()} |`;
    })

    return ret
  }
}

// table.ts
// A formatted Table
import Row from "./row";

export default class Table {
  rows: Row[];

  constructor(rowCount: number, columnCount: number) {
    this.rows = [];
    for(let i = 0; i < rowCount; i++) {
      this.rows.push(new Row(columnCount));
    }
  }

  draw(): void {
    // Draws the table formatted in the console
    let maxRowLength = 0;
    const rowsTemp: string[] = [];
    this.rows.forEach((row) => {
      const rowData = row.getData();
      rowsTemp.push(`| ${rowData}`);
      const rowLength = rowData.length + 1;
      if (maxRowLength < rowLength) {
        maxRowLength = rowLength
      }
    });
    console.log('-'.repeat(maxRowLength));
    rowsTemp.forEach((row) => {
      console.log(row);
    });
    console.log('-'.repeat(maxRowLength));
  }
}

// client.ts
// The Flyweight Use Case Example
import FlyweightFactory from "./flyweightFactory";
import Table from "./table";

const TABLE = new Table(3, 3);
TABLE.rows[0].columns[0].data = 'abra';
TABLE.rows[0].columns[1].data = '112233';
TABLE.rows[0].columns[2].data = 'cadabra';
TABLE.rows[1].columns[0].data = 'racadab';
TABLE.rows[1].columns[1].data = '12345';
TABLE.rows[1].columns[2].data = '332211';
TABLE.rows[2].columns[0].data = 'cadabra';
TABLE.rows[2].columns[1].data = '445566';
TABLE.rows[2].columns[2].data = 'aa 22 bb';

TABLE.rows[0].columns[0].justify = 1;
TABLE.rows[1].columns[0].justify = 1;
TABLE.rows[2].columns[0].justify = 1;
TABLE.rows[0].columns[2].justify = 2;
TABLE.rows[1].columns[2].justify = 2;
TABLE.rows[2].columns[2].justify = 2;
TABLE.rows[0].columns[1].justify = 15;
TABLE.rows[1].columns[1].justify = 15;
TABLE.rows[2].columns[1].justify = 15;

TABLE.draw();
console.log(`FlyweightFactory has ${FlyweightFactory.getCount()} flyweights`);

// -------------------------------------
// | abra       |  112233   |   cadabra |
// | racadab    |   12345   |    332211 |
// | cadabra    |  445566   |  aa 22 bb |
// -------------------------------------
// FlyweightFactory has 12 flyweights
```

#### Summary

* Clients should access Flyweight objects only the through a FlyweightFactory object to ensure that they are shared.
* Intrinsic values are stored internally in the Flyweight.
* Extrinsic values are passed to the Flyweight and customize it depending on the context.
* Implementing the flyweight is a balance between storing all objects in memory, versus storing small unique parts in memory, and potentially calculating extrinsic values in the context objects.
* Use the flyweight to save memory when it is beneficial. The offset is that extra CPU may be required during calculating and passing extrinsic values to the flyweights.
* The flyweight reduces memory footprint because it shares objects and allows the possibility of dynamically creating extrinsic attributes.
* The contexts will generally calculate the extrinsic values used by the flyweights, but it is not necessary. Values can be stored or referenced from other objects if necessary.
* When architecting the flyweight, start with considering which parts of a common object may be able to be split and applied using extrinsic attributes.

### Proxy Design Pattern

The *Proxy* design pattern is a class functioning as an interface to another class or object.

A Proxy could be for anything, such as a network connection, an object in memory, a file, or anything else you need to provide an abstraction between.

Types of proxies,

* Virtual Proxy: An object that can cache parts of the real object, and then complete loading the full object when necessary.

* Remote Proxy: Can relay messages to a real object that exists in a different address space.

* Protection Proxy: Apply an authentication layer in front of the real object.

* Smart Reference: An object whose internal attributes can be overridden or replaced.

Additional functionality can be provided at the proxy abstraction if required. E.g., caching, authorization, validation, lazy initialization, logging.

The proxy should implement the subject interface as much as possible so that the proxy and subject appear identical to the client.

The Proxy Pattern can also be called *Monkey Patching* or *Object Augmentation*.

#### Terminology
* ***Proxy***: An object with an interface identical to the real subject. Can act as a placeholder until the real subject is loaded or as gatekeeper applying extra functionality.
* ***Subject Interface***: An interface implemented by both the Proxy and Real Subject.
* ***Real Subject***: The actual real object that the proxy is representing.
* ***Client***: The client application that uses and creates the Proxy.

<img src='./assets/proxy_uml.png' alt="Proxy UML Diagram" />

#### Source Code

This concept example will simulate a virtual proxy. The real subject will be called via the proxy. The first time the request is made, the proxy will retrieve the data from the real subject. The second time it is called, it will return the data from the proxies own cache which it created from the first request.

#### Proxy Use Case
In this example, I dynamically change the class of an object. So, I am essentially using an object as a proxy to other classes.

Every time the tell_me_the_future() method is called; it will randomly change the object to use a different class.

The object PROTEUS will then use the same static attributes and class methods of the new class instead.

<img src='./assets/proxy_uml_use.png' alt="Proxy Use Case UML Diagram" />

```ts
// iproteus.ts
// The Proteus interface
export default interface IProteus {
  // A Greek mythological character that can change to many forms
  tellMeTheFuture(): void;
  // Proteus will change form rather than tell you the future

  tellMeYourForm(): void;
  // The form fo Proteus is exclusive like the sea
}

// lion.ts
import IProteus from "./iproteus";
import Leopard from "./leopard";
import Serpent from "./serpent";

export default class Lion implements IProteus {
  // Proteus in the form of a Lion

  name = 'Lion';

  tellMeTheFuture(): void {
    // Proteus will change to something random
    if (Math.floor(Math.random() * 2)) {
      Object.assign(this, new Serpent());
      this.tellMeTheFuture = Serpent.prototype.tellMeTheFuture;
      this.tellMeYourForm = Serpent.prototype.tellMeYourForm;
    } else {
      Object.assign(this, new Leopard());
      this.tellMeTheFuture = Leopard.prototype.tellMeTheFuture;
      this.tellMeYourForm = Leopard.prototype.tellMeYourForm;
    }
  }

  tellMeYourForm(): void {
    console.log(`I am the form of ${this.name}`);
  }
}

// serpent.ts
import IProteus from "./iproteus";
import Leopard from "./leopard";
import Lion from "./lion";

export default class Serpent implements IProteus {
  // Proteus in the form of a Serpent

  name = 'Serpent';

  tellMeTheFuture(): void {
    // Proteus will change to something random
    if (Math.floor(Math.random() * 2)) {
      Object.assign(this, new Leopard());
      this.tellMeTheFuture = Leopard.prototype.tellMeTheFuture;
      this.tellMeYourForm = Leopard.prototype.tellMeYourForm;
    } else {
      Object.assign(this, new Lion());
      this.tellMeTheFuture = Lion.prototype.tellMeTheFuture;
      this.tellMeYourForm = Lion.prototype.tellMeYourForm;
    }
  }

  tellMeYourForm(): void {
    console.log(`I am the form of ${this.name}`);
  }
}

// leopard.ts
import IProteus from "./iproteus";
import Lion from "./lion";
import Serpent from "./serpent";

export default class Leopard implements IProteus {
  // Proteus in the form of a Leopard

  name = 'Leopard';

  tellMeTheFuture(): void {
    // Proteus will change to something random
    if (Math.floor(Math.random() * 2)) {
      Object.assign(this, new Lion());
      this.tellMeTheFuture = Lion.prototype.tellMeTheFuture;
      this.tellMeYourForm = Lion.prototype.tellMeYourForm;
    } else {
      Object.assign(this, new Serpent());
      this.tellMeTheFuture = Serpent.prototype.tellMeTheFuture;
      this.tellMeYourForm = Serpent.prototype.tellMeYourForm;
    }
  }

  tellMeYourForm(): void {
    console.log(`I am the form of ${this.name}`);
  }
}

// client.ts
import Lion from './lion';

const PROTEUS = new Lion();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
```

#### Summary

* Proxy forwards requests onto the Real Subject when applicable, depending on the kind of proxy.
* A virtual proxy can cache elements of a real subject before loading the full object into memory.
* A protection proxy can provide an authentication layer. For example, an NGINX proxy can add Basic Authentication restriction to an HTTP request.
* A proxy can perform multiple tasks if necessary.
* A proxy is different from an `Adapter`. The Adapter will try to adapt two existing interfaces together. The Proxy will use the same interface as the subject.
* It is also very similar to the `Facade`, except you can add extra responsibilities, just like the Decorator. The `Decorator` however can be used recursively.
* The intent of the Proxy is to provide a stand in for when it is inconvenient to access a real subject directly.
* The Proxy design pattern may also be called the Surrogate design pattern.
