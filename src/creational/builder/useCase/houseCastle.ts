import House from "./house";
import HouseBuilder from "./houseBuilder";

export default class HouseCastle {
  static contruct(): House {
    return new HouseBuilder()
      .setBuildingType('Castle')
      .setWallMaterial('Sandstone')
      .setNumberDoors(10)
      .setNumberWindows(14)
      .getResult();
  }
}
