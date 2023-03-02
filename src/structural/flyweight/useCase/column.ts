import FlyweightFactory from "./flyweightFactory";

// A Column that is used in a row
export default class Column {
  /**
   * The columns are the contexts.
   * They will share the Flyweights via the FlyweightsFactory.
   * `data`, `width` and `justify` are extrinsic values. They are outside of the flyweights
   */
  data: string = '';
  width: number = 10;
  justify: number = 0;

  getData(): string {
    // Get the Flyweight value from factory, and apply the extrinsec values
    const codes = [];
    for(let i = 0; i < this.data.length; i++) {
      codes.push(this.data.charCodeAt(i));
    }

    let ret = '';
    Array.from(codes).forEach((cod) => {
      ret += String.fromCharCode(FlyweightFactory.getFlyweight(cod).code);
    })

    switch(this.justify) {
      case 1:
        ret = this.leftAlign(this.width, ret, ' ');
        break;
      case 2:
        ret = this.rightAlign(this.width, ret, ' ');
        break;
      default:
        ret = this.center(this.width, ret, ' ');
    }

    return ret;
  }

  center(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.centerAlternate(width, padding + str, padding);
  }

  centerAlternate(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.center(width, str + padding, padding);
  }

  leftAlign(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.leftAlign(width, str + padding, padding);
  }

  rightAlign(width: number, str: string, padding: string): string {
    return width <= str.length
      ? str
      : this.rightAlign(width, padding + str, padding);
  }
}
