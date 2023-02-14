// A hypotetical Cube tool from Company B
export interface ICubeB {
  create(
    topLeftFront: [number, number, number],
    bottomRightBack: [number, number, number]
  ): boolean;
}

export default class CubeB implements ICubeB {
  static lastTime = Date.now();

  create(topLeftFront: [number, number, number], bottomRightBack: [number, number, number]): boolean {
    // if not busy, then manufacture a cube with coords
    const now = Date.now();
    if (now > CubeB.lastTime + 3000) {
      console.log(
        `Company B built Cube with coords [${topLeftFront[0]},${topLeftFront[1]},${topLeftFront[2]},${bottomRightBack[0]},${bottomRightBack[1]},${bottomRightBack[2]}]`
      );
      CubeB.lastTime = now;
      return true
    }

    return false // busy
  }
}
