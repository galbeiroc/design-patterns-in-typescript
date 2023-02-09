// A Game Class that uses the leaderboard Singleton
import Leaderboard from "./leaderboard";
import Game from './igame';

export default class Game3 implements Game {
  leaderBoard: Leaderboard;

  constructor() {
    this.leaderBoard = new Leaderboard()
  }

  addWinner(position: number, name: string): void {
      this.leaderBoard.addWinner(position, name);
  }
}
