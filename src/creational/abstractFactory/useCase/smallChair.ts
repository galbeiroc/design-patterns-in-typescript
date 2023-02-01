import { Chair } from "./chair";

export class SmallChair extends Chair {
  constructor() {
    super();
    this.name = 'Small Chair';
    this.height = 40;
    this.width = 40;
    this.depth = 40;
  }
}