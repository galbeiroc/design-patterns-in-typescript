import { FornitureFactory } from "./furnitureFactory";

let FORNITURE = FornitureFactory.getFurniture('SmallChair');
console.log(FORNITURE?.name);
console.log(FORNITURE?.getDimension());

FORNITURE = FornitureFactory.getFurniture('BigTable');
console.log(FORNITURE?.name);
console.log(FORNITURE?.getDimension());
