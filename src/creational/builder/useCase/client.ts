import DirectorBoat from "./directorBoat";
import DirectorCastle from "./directorCastle";
import DirectorIgloo from "./directorIgloo";

const IGLOO = DirectorIgloo.construct();
const CASTLE = DirectorCastle.contruct();
const BOAT = DirectorBoat.contruct();

console.log(IGLOO.construction());
console.log(CASTLE.construction());
console.log(BOAT.construction());
