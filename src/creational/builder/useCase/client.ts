import HouseBoat from "./houseBoat";
import HouseCastle from "./houseCastle";
import HouseIgloo from "./houseIgloo";

const IGLOO = HouseIgloo.construct();
const CASTLE = HouseCastle.contruct();
const BOAT = HouseBoat.contruct();

console.log(IGLOO.construction());
console.log(CASTLE.construction());
console.log(BOAT.construction());
