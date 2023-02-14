// A Singleton Dictionary of Report Events
export default class Reports {
  static instance: Reports;
  #reports: {[id: string]: [number, string] } = {};
  #rowId = 0;

  constructor() {
    if(Reports.instance) {
      return Reports.instance;
    }
    Reports.instance = this;
  }

  getHistory(): { [id: string]: [number, string] } {
    return this.#reports;
  }

  logEvent(event: string) {
    this.#reports[this.#rowId] = [Date.now(), event];
    this.#rowId += 1;
    return true;
  }
}
