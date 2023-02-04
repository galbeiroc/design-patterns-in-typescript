// The Concrete Builder
import House from "./house";

interface IHouseBuilder {
  house: House;
  setBuildingType(buildingType: string): this;
  setWallMaterial(wallMaterial: string): this;
  setNumberDoors(doors: number): this;
  setNumberWindows(windows: number): this;
  getResult(): House
}

export default class HouseBuilder implements IHouseBuilder {
  house: House;

  constructor() {
    this.house = new House();
  }

  setBuildingType(buildingType: string): this {
    this.house.buildingType = buildingType;
    return this;
  }

  setNumberDoors(doors: number): this {
    this.house.doors = doors;
    return this;
  }

  setWallMaterial(wallMaterial: string): this {
    this.house.wallMaterial = wallMaterial;
    return this;
  }

  setNumberWindows(windows: number): this {
    this.house.windows = windows;
    return this;
  }

  getResult(): House {
    return this.house
  }
}
