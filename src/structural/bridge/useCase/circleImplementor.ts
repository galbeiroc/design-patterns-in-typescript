import IShapeImplementor from "./ishapeImplementer";

export default class CircleImplementer implements IShapeImplementor {
  drawImplementor(): void {
    console.log('   *****')
    console.log(' *        *')
    console.log('*          *')
    console.log('*          *')
    console.log(' *        *')
    console.log('    *****')
  }
}
