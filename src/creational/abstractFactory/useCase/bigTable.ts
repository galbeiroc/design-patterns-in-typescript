import { Table } from "./table";

export class BigTable extends Table {
  constructor() {
    super();
    this.name = 'Big Table';
    this.height = 100;
    this.width = 100;
    this.depth = 100;
  }
}