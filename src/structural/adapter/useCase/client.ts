// Adapter example use case
import CubeA from "./cubeA";
import CubeBAdapter from "./cuboBAdapter";

const totalCubes = 5;
let counter = 0;

const manufactureCube = () => {
  // produce 5 cubes from which ever supplier can manufacture it first
  const width = Math.floor(Math.random() * 10) + 1;
  const height = Math.floor(Math.random() * 10) + 1;
  const depth = Math.floor(Math.random() * 10) + 1;
  let cube = new CubeA();
  let success = cube.manufacture(width, height, depth);
  if (success) {
    counter += 1;
  } else {
    // try other manufacturer
    console.log('Company A was busy, so trying company B');
    cube = new CubeBAdapter();
    success = cube.manufacture(width, height, depth);
    if (success) {
      counter += 1;
    } else {
      console.log('Company B was busy, so trying company A');
    }
  }
}

// wait some time between manufacturing
const interval = setInterval(() => {
  manufactureCube();
  if (counter >= totalCubes) {
    clearInterval(interval);
    console.log(`${totalCubes} cubes have been manufactured`);
  }
}, 1000);
