let foo: string;
let bar: boolean;
let baz: number;
let qux: string[];
let quuz: [number, string];
let corge: { [key: number]: string };
let grault: Set<number>;

foo = "ABC";
bar = true;
baz = 123;
qux = ["a", "b", "c"];
quuz = [1, "abc"];
corge = { 123: "abc", 456: "def" };
grault = new Set([1, 2, 3]);

/**
 * STRING
 */

let str: string;
str = "ABC";
str = "123";
str = "it wasm't me";
str = "it wasn't me";
str = `abc ${str} def`; //abc it wasn't me def

/**
 * Boolean
 */
let bln: boolean;
bln = true;
bln = false;

/**
 * Number
 */
let num: number;
num = 123; //decimal
num = 123.456; //float
num = 0xffff; //hex
num = 0b10101; //binary - "0b"+num.toString(2)
num = 0o671; //octal - "0o"+num.toString(8)

/**
 * Array
 */
let a: string[];
a = ["a", "b", "c", "d"];
let b: number[] = [1, 2, 3, 4, 5];
let c: boolean[];
c = [true, false, false];
let d: unknown[] = [1, "a", true, ["even", "another", "inner", "array"]];

/**
 * Dictionary
 */
let dicta: { [key: number]: string };
dicta = { 123: "abc", 456: "def" };
let dictb: { [key: string]: boolean };
dictb = { abc: true, "def x": false, ghi: true };
let dictc: { [id: number]: number[] };
dictc = { 1: [1, 2, 3], 2: [4, 5, 6], 3: [7, 8, 9], 4: [10, 11, 12] };

/**
 * Tuple
 */
let tpla: [number, string];
tpla = [1, "abc"];
// tpla = [1, 'abc', true]
let tplb: [string, boolean, number];
tplb = ["abc", false, 123];

console.log(tpla[1]);
console.log(tplb[2]);

/**
 * Set
 */
let sa: Set<number>;
sa = new Set([1, 2, 3, 4, 2]);
let sb: Set<string>;
sb = new Set(["a", "b", "c", "d", "a"]); // the second `a` is not added
let sc: Set<unknown>;
sc = new Set([1, "b", true]);

const sd: Set<string> = new Set();
sd.add("cat");
sd.add("dog");
sd.add("bird");

console.log(sa);
console.log(sb);
console.log(sc);
console.log(sd);

sd.delete("cat");
console.log(sd);

console.log(sd.size);
console.log(sd.has("dog"));

/**
 * Classes
 */
class Cat {
  constructor() {}

  walk(): void {
    console.log("Cat is walking");
  }
}

const cat = new Cat();
cat.walk();

class Dog {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  walk(steps: number): void {
    console.log(this.name + " the dog has walked " + steps + " steps");
  }
}

const dog = new Dog("pilin");
dog.walk(5);

/**
 * Interfaces
 */
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
lion.feed("meat", 4);

/**
 * Abstract classes
 */
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

const pig = new Pig("Ni??o", 2, false);
const horse = new Horse("Galopante", 1);

pig.feed("Afrecho", 4);
horse.feed("grass", 8);

/**
 * Access Modifiers
 */
// Public
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
console.log(device.name)