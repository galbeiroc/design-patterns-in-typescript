// A Singleton Dictionary of Users
import Reports from "./reports";
import Wallets from "./wallets";

export default class Users {
  static instance: Users;
  #users: { [id: string]: { [id: string]: string } } = {};
  #reports = new Reports();
  #wallets = new Wallets();

  constructor() {
    if (Users.instance) {
      return Users.instance;
    }
    Users.instance = this;
  }

  registerUser(newUser: { [id: string]: string }): string {
    // Register user
    if (!(newUser['userName'] in this.#users)) {
      // Generate really complicated unique user_id.
      // Using the existing user_name as the id for simplicity
      const userId = newUser['userName'];
      this.#users[userId] = newUser;
      this.#reports.logEvent(`New user '${userId}' created`);
      // Greate a wallet for the new user
      this.#wallets.createWallet(userId);
      // Give new user a sign up bonus
      this.#reports.logEvent(
        `Give new user '${userId}' sign up bonus of 10`
      );
      this.#wallets.adjustBalance(userId, 10);

      return userId;
    }

    return '';
  }

  editUser(userId: string, user: { [id: string]: string }): boolean {
    // do nothing. Not implemented yet
    console.log(userId);
    console.log(user);
    return false;
  }

  changePassword(userId: string, password: string): boolean {
    // do nothing. Not implemented yet
    console.log(userId);
    console.log(password);
    return false;
  }
}
