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
str = "it wasn\'t me";
str = `abc ${str} def`; //abc it wasn't me def
