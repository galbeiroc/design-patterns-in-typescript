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
