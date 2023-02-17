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
