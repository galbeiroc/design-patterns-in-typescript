import { BigTable } from "./bigTable";
import { MediumTable } from "./mediumTable";
import { SmallTable } from "./smallTable";
import { ITable, Table } from "./table";

enum TablesType {
  SmallTable = 'SmallTable',
  MediumTable = 'MediumTable',
  BigTable = 'BigTable'
}

export class TableFactory {
  static getTable(tableType: string): ITable {
    try {
      if (tableType === TablesType.SmallTable) {
        return new SmallTable();
      } else if (tableType === TablesType.MediumTable) {
        return new MediumTable();
      } else if(tableType === TablesType.BigTable) {
        return new BigTable();
      } else {
        throw new Error('Class not found');
      }
    } catch(e) {
      console.log(e);
    }
    return new Table();
  }
}