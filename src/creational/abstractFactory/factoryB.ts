// Factory B Sample Code

export interface IProductB {
  name: string;
}

class ConcreteProduct implements IProductB {
  name = '';
}

class ConcreteProductA extends ConcreteProduct {
  constructor() {
    super();
    this.name = 'FactoryB:ConcreteProductA';
  }
}

class ConcreteProductB extends ConcreteProduct {
  constructor() {
    super();
    this.name = 'FactoryB:ConcreteProductB';
  }
}

class ConcreteProductC extends ConcreteProduct {
  constructor() {
    super();
    this.name = 'FactoryC:ConcreteProductC';
  }
}

export class FactoryB {
  static getObject(someProperty: string): IProductB {
    try {
      if (someProperty === 'a') {
        return new ConcreteProductA();
      } else if (someProperty === 'b') {
        return new ConcreteProductB();
      } else if (someProperty === 'c') {
        return new ConcreteProductC();
      } else {
        throw new Error('Class not found');
      }
    } catch (e) {
      console.log(e);
    }
    return new ConcreteProduct();
  }
 }
