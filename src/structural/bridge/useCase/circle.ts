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
