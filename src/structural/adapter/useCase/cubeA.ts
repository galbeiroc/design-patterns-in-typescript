// A hypotetical Cube tool from company A
export interface ICubeA {
  manufacture(width: number, height: number, depth: number): boolean
}

export default class CubeA implements ICubeA {
  static lastTime = Date.now();

  manufacture(width: number, height: number, depth: number): boolean {
    // if nor busy, then manufacture a cube with dimensiones
    const now = Date.now();
    if (now > CubeA.lastTime + 1500) {
      console.log(
        `Company A built Cube with dimensions ${width}x${height}x${depth}`
      );
      CubeA.lastTime = now;
      return true;
    }

    return false; // busy
  }
}
