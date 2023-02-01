import { Chair } from "./chair";

export class MediumChair extends Chair {
  constructor() {
    super();
    this.name = 'Medium Chair';
    this.height = 60;
    this.width = 60;
    this.depth = 60;
  }
}