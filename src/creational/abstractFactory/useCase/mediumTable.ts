import { Table } from "./table";

export class MediumTable extends Table {
  constructor() {
    super();
    this.name = 'Medium Table';
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}