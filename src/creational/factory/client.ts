// Factory use case - example code
import ChairFactory from './chairFactory';

const CHAIR = ChairFactory.getChair('SmallChair');
console.log(CHAIR.getDimension());
