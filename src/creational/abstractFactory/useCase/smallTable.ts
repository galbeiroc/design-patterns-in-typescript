import { Table } from "./table";

export class SmallTable extends Table {
  constructor() {
    super();
    this.name = 'Small Table';
    this.height = 50;
    this.width = 50;
    this.depth = 50;
  }
}