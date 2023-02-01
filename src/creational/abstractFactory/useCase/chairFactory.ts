import { BigChair } from "./bigChair";
import { Chair, IChair } from "./chair";
import { MediumChair } from "./mediumChair";
import { SmallChair } from "./smallChair";

enum ChairsType {
  SmallChair = 'SmallChair',
  MediumChair = 'MediumChair',
  BigChair = 'BigChair'
}

export class ChairFactory {
  static getChair(chairType: string): IChair {
    try {
      if(chairType === ChairsType.SmallChair) {
        return new SmallChair();
      } else if(chairType === ChairsType.MediumChair) {
        return new MediumChair();
      } else if (chairType === ChairsType.BigChair) {
        return new BigChair();
      } else {
        throw new Error('Class not found');
      }
    } catch(e) {
      console.log(e)
    }
    return new Chair();
  }
}