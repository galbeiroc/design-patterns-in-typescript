import { IChair } from "./chair";
import { ChairFactory } from "./chairFactory";
import { ITable } from "./table";
import { TableFactory } from "./TableFactory";

export interface IForniture extends IChair, ITable {};

const chairs = ['SmallChair', 'MediumChair', 'BigChair'];
const tables = ['SmallTable', 'MediumTable', 'BigTable'];

export class FornitureFactory {
  static getFurniture(forniture: string): IForniture | undefined {
    try {
      if (chairs.indexOf(forniture) > -1) {
        return ChairFactory.getChair(forniture);
      }
      if (tables.indexOf(forniture) > -1) {
        return TableFactory.getTable(forniture);
      }
      throw new Error('Factory not Found');
    } catch(e) {
      console.log(e)
    }
  }
}
