// Prototype concept sample code
import Document from "./document";

export default interface IPrototype {
  clone(mode: number): Document;
}
