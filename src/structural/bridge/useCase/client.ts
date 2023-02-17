// Bridge Pattern Concept Sample Case
import Circle from "./circle";
import CircleImplementer from "./circleImplementor";
import Square from "./square";
import SquareImplementer from "./squareImplementor";

const SQUARE = new Square(new SquareImplementer());
SQUARE.draw();

const CIRCLE = new Circle(new CircleImplementer());
CIRCLE.draw();
