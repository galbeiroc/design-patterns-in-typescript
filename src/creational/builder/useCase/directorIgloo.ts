import House from "./house";
import HouseBuilder from "./houseBuilder";

export default class HouseIgloo {
  static construct(): House {
    return new HouseBuilder()
      .setBuildingType('Igloo')
      .setWallMaterial('Ice')
      .setNumberDoors(1)
      .getResult()
  }
}
