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
