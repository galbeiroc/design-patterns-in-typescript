import House from "./house";
import HouseBuilder from "./houseBuilder";

export default class HouseBoat {
  static contruct(): House {
    return new HouseBuilder()
      .setBuildingType('House Boat')
      .setWallMaterial('Wood')
      .setNumberDoors(6)
      .setNumberWindows(4)
      .getResult();
  }
}
