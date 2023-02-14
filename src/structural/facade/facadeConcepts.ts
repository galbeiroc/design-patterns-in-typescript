// The Facade pattern concept
class SubSystemClassA {
  // A hypotetically complicated class
  method(): string {
    return 'A';
  }
}

class SubSystemClassB {
  // A hypotetically complicated class
  method(value: string): string {
    return value;
  }
}

class SubSystemClassC {
  // A hypotetically complicated class
  method(value: { C: number[] }): { C: number[]} {
    return value;
  }
}

class Facade {
  // A simplified facade offering the services of subsystems
  subSystemClassA(): string {
    // Uses the subsystems method
    return new SubSystemClassA().method();
  }

  subSystemClassB(value: string): string {
    // Uses the subsystems method
    return new SubSystemClassB().method(value);
  }

  subSystemClassC(value: { C: number[]}): { C: number[]} {
    // Uses the subsystems method
    return new SubSystemClassC().method(value);
  }
}

// The client
// Calling potentially complicated subsystems directly
console.log(new SubSystemClassA().method()); // A
console.log(new SubSystemClassB().method('B')); // B
console.log(new SubSystemClassC().method({ C: [1, 2, 2]})); // { C: [ 1, 2, 2 ] }

// Or using the simplified facade instead
const FACADE = new Facade();
console.log(FACADE.subSystemClassA()); // A
console.log(FACADE.subSystemClassB('B')); // B
console.log(FACADE.subSystemClassC({ C: [1, 2, 3]})); // { C: [ 1, 2, 2 ] }
