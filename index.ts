// In index.ts

import Truck from './classes/Truck.js';
import Car from './classes/Car.js';
import Motorbike from './classes/Motorbike.js';
import Wheel from './classes/Wheel.js';
import Cli from './classes/Cli.js';
import Vehicle from './classes/Vehicle.js';

// Create an array of vehicles
const vehicles = [];

// Creating a truck instance
const truck1 = new Truck(
  Vehicle.generateVin(),
  "red",
  "Ford",
  "F-150",
  2021,
  5000,
  120,
  [new Wheel(18, "Goodyear"), new Wheel(18, "Goodyear"), new Wheel(18, "Goodyear"), new Wheel(18, "Goodyear")],
  10000
);

// Creating a car instance
const car1 = new Car(
  Vehicle.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  [new Wheel(17, "Bridgestone"), new Wheel(17, "Bridgestone"), new Wheel(17, "Bridgestone"), new Wheel(17, "Bridgestone")]
);

// Creating a motorbike instance
const motorbike1 = new Motorbike(
  Vehicle.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")]
);

// Push vehicles to array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// Create a new instance of the Cli class
const cli = new Cli(vehicles);

// Start the CLI
cli.startCli();
