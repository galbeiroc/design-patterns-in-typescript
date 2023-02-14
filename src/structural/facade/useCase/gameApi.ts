// The Game API Facade
import GameEngine, { GameState } from "./gameEngine";
import Reports from "./reports";
import Users from "./users";
import Wallets from "./wallets";

export default class GameAPI {
  #wallets: Wallets;
  #reports: Reports;
  #users: Users;
  #gameEngine: GameEngine;

  constructor() {
    this.#wallets = new Wallets();
    this.#reports = new Reports();
    this.#users = new Users();
    this.#gameEngine = new GameEngine();
  }

  getBalance(userId: string) {
    // Get a players balance
    return this.#wallets.getBalance(userId);
  }

  gameState(): GameState {
    // Get the Current Game State
    return this.#gameEngine.getGameState();
  }

  getHistory(): { [id: string]: [number, string ] } {
    // Get the Game history
    return this.#reports.getHistory();
  }

  changePassword(userId: string, password: string): boolean {
    // Change users password
    return this.#users.changePassword(userId, password);
  }

  submitEntry(userId: string, entry: number): boolean {
    // Submit a bet
    return this.#gameEngine.submitEntry(userId, entry);
  }

  registerUser(value: { [id: string]: string }): string {
    // Register a new user and returns the new id
    return this.#users.registerUser(value);
  }
}
