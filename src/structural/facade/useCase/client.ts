// The Facade Example Use Case
import GameAPI from "./gameApi";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function facadeExample() {
  const gameAPI = new GameAPI();

  const user = { userName: 'Jhon' };
  const userId = gameAPI.registerUser(user);
  console.log(userId);

  await sleep(500);

  gameAPI.submitEntry(userId, 5);

  await sleep(500);

  console.log('---- GameState Snapshot ----');
  console.log(gameAPI.gameState());

  await sleep(1000);

  const HISTORY = gameAPI.getHistory();
  
  console.log('---- Reports History ----');
  Object.keys(HISTORY).forEach((key) => {
    console.log(`${key} : ${HISTORY[key][0]} : ${HISTORY[key][1]}`);
  });

  await sleep(1000);

  console.log('---- User Balance ----');
  console.log(user.userName, ' : ', gameAPI.getBalance(userId));

  await sleep(1000);
  console.log('---- User Balance ----');
  console.log(gameAPI.gameState());
}

facadeExample();
