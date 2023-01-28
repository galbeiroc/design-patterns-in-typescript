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

const PRODUCT = Creator.creatorObject('cc');
console.log(PRODUCT.name);
