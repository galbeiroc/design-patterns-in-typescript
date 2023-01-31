import { dimension } from "./dimension";

// A Chair Interface
export interface IChair {
  height: number;
  width: number;
  depth: number;
  getDimension: () => dimension;
}

// Chair Base Class
export default class Chair implements IChair {
  height = 0;
  width = 0;
  depth = 0;

  getDimension(): dimension {
    return {
      height: this.height,
      width: this.width,
      depth: this.depth
    }
  }
}

