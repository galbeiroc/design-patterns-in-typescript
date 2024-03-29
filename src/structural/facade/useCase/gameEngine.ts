import Reports from "./reports";
import Wallets from "./wallets";

// The Game Engine
export interface GameState {
  clock: number;
  gameOpen: boolean;
  entries: [string, number][];
}

export default class GameEngine {
  static instance: GameEngine;
  #startTime = 0;
  #clock = 0;
  #entries: [string, number][] = [];
  #gameOpen = true;
  #wallets = new Wallets();
  #reports = new Reports();


  constructor() {
    if (GameEngine.instance) {
      return GameEngine.instance;
    }
    this.#startTime = Math.floor(Date.now() / 1000);
    this.#clock = 60;
    GameEngine.instance = this;
  }

  getGameState(): GameState {
    // Get a snapshot of the current game state
    const now = Math.floor(Date.now() / 1000);
    let timeRemaining = this.#startTime - now + this.#clock;

    if (timeRemaining < 0) {
      timeRemaining = 0;
    }
    this.#gameOpen = false;

    return {
      clock: timeRemaining,
      gameOpen: this.#gameOpen,
      entries: this.#entries
    } as GameState;
  }

  submitEntry(userId: string, entry: number): boolean {
    // Submit a new entry for the user in this game
    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = this.#startTime - now + this.#clock;
    if (timeRemaining > 0) {
      if (this.#wallets.getBalance(userId) > 1) {
        if (this.#wallets.adjustBalance(userId, -1)) {
          this.#entries.push([userId, entry]);
          this.#reports.logEvent(
            `New entry '${entry}' submmitted by '${userId}'`
          );

          return true;
        }
        this.#reports.logEvent(
          `Problem adjusting balance for '${userId}'`
        );

        return false;
      }
      this.#reports.logEvent(`User balance for '${userId}'`);

      return false;
    }
    this.#reports.logEvent('Game closed');

    return false;
  }
}
