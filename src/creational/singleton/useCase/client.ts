import Game1 from "./game1";
import Game2 from "./game2";
import Game3 from "./game3";

// The Client
// Despite all games instantiating a leaderboard, they all point
// to the same memory object since the leaderboard is a singleton.
const GAME1 = new Game1();
const GAME11 = new Game1();
GAME1.addWinner(3, 'Cosmo');
GAME11.addWinner(7, 'Susan');

const GAME2 = new Game2();
GAME2.addWinner(2, 'Sean');

const GAME3 = new Game3();
GAME3.addWinner(4, 'Emmy');

GAME1.leaderBoard.print();
GAME2.leaderBoard.print();
GAME3.leaderBoard.print();
