// Bridge Pattern Concepts Sample Code
interface IAbstraction {
  method(value: string[]): void;
}

class RefinedAbstractionA implements IAbstraction {
  #implementer: IImplementer;

  constructor(implementer: IImplementer) {
    this.#implementer = implementer;
  }

  method(value: string[]): void {
    this.#implementer.method(value);
  }
}


class RefinedAbstractionB implements IAbstraction {
  #implementer: IImplementer;

  constructor(implementer: IImplementer) {
    this.#implementer = implementer;
  }

  method(value: string[]): void {
    this.#implementer.method(value);
  }
}

interface IImplementer {
  method(value: string[]): void;
}

class ConcreteImplementerA implements IImplementer {
  method(value: string[]): void {
    console.log(value);
  }
}

class ConcreteImplementerB implements IImplementer {
  method(value: string[]): void {
    value.forEach((v) => console.log(v));
  }
}

// The Client
const values = ['a', 'b', 'c', 'd'];

const REFINED_ABSTRACTION_A = new RefinedAbstractionA(new ConcreteImplementerA());
REFINED_ABSTRACTION_A.method(values);

const REFINED_ABSTRACTION_B = new RefinedAbstractionB(new ConcreteImplementerB());
REFINED_ABSTRACTION_B.method(values);
