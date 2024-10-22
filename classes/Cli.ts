import inquirer from 'inquirer';
import Vehicle from './Vehicle.js';
import Truck from './Truck.js';
import Car from './Car.js';
import Motorbike from './Motorbike.js';
import Wheel from './Wheel.js';

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type to create:',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter the color of the car:' },
        { type: 'input', name: 'make', message: 'Enter the make of the car:' },
        { type: 'input', name: 'model', message: 'Enter the model of the car:' },
        { type: 'input', name: 'year', message: 'Enter the year of the car:' },
        { type: 'input', name: 'weight', message: 'Enter the weight of the car:' },
        { type: 'input', name: 'topSpeed', message: 'Enter the top speed of the car:' },
      ])
      .then((answers) => {
        const car = new Car(
          Vehicle.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(), new Wheel(), new Wheel(), new Wheel()]
        );
        this.vehicles.push(car);
        console.log('Car created successfully!');
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter the color of the truck:' },
        { type: 'input', name: 'make', message: 'Enter the make of the truck:' },
        { type: 'input', name: 'model', message: 'Enter the model of the truck:' },
        { type: 'input', name: 'year', message: 'Enter the year of the truck:' },
        { type: 'input', name: 'weight', message: 'Enter the weight of the truck (lbs):' },
        { type: 'input', name: 'topSpeed', message: 'Enter the top speed of the truck (mph):' },
        { type: 'input', name: 'towingCapacity', message: 'Enter the towing capacity of the truck (lbs):' },
      ])
      .then((answers) => {
        const truck = new Truck(
          Vehicle.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(20, 'DefaultBrand'), new Wheel(20, 'DefaultBrand'), new Wheel(20, 'DefaultBrand'), new Wheel(20, 'DefaultBrand')],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        console.log('Truck created successfully!');
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter the color of the motorbike:' },
        { type: 'input', name: 'make', message: 'Enter the make of the motorbike:' },
        { type: 'input', name: 'model', message: 'Enter the model of the motorbike:' },
        { type: 'input', name: 'year', message: 'Enter the year of the motorbike:' },
        { type: 'input', name: 'weight', message: 'Enter the weight of the motorbike (lbs):' },
        { type: 'input', name: 'topSpeed', message: 'Enter the top speed of the motorbike (mph):' },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Vehicle.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(17, 'DefaultBrand'), new Wheel(17, 'DefaultBrand')]
        );
        this.vehicles.push(motorbike);
        console.log('Motorbike created successfully!');
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  chooseVehicle(): void {
    if (this.vehicles.length === 0) {
      console.log('No vehicles available. Please create one first.');
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on:',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.make} ${vehicle.model} (${vehicle.vin})`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  performActions(): void {
    const selectedVehicle = this.vehicles.find((vehicle) => vehicle.vin === this.selectedVehicleVin);

    if (!selectedVehicle) {
      console.log('Vehicle not found.');
      this.startCli();
      return;
    }

    // Determine available actions based on the type of vehicle
    const actions = [
      'Print details',
      'Start vehicle',
      'Accelerate',
      'Decelerate',
      'Stop vehicle',
      'Turn left',
      'Turn right',
      'Reverse',
      'Select or create another vehicle',
      'Exit',
    ];

    if (selectedVehicle instanceof Motorbike) {
      actions.splice(7, 0, 'Pop a wheelie');
    } else if (selectedVehicle instanceof Truck) {
      actions.splice(7, 0, 'Tow a vehicle');
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action to perform on the vehicle:',
          choices: actions,
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case 'Print details':
            selectedVehicle.printDetails();
            break;
          case 'Start vehicle':
            selectedVehicle.start();
            break;
          case 'Accelerate':
            this.changeSpeed(selectedVehicle, 'accelerate');
            return;
          case 'Decelerate':
            this.changeSpeed(selectedVehicle, 'decelerate');
            return;
          case 'Stop vehicle':
            selectedVehicle.stop();
            break;
          case 'Turn left':
            selectedVehicle.turn('left');
            break;
          case 'Turn right':
            selectedVehicle.turn('right');
            break;
          case 'Reverse':
            selectedVehicle.reverse();
            break;
          case 'Pop a wheelie':
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            }
            break;
          case 'Tow a vehicle':
            if (selectedVehicle instanceof Truck) {
              this.towVehicle(selectedVehicle);
            }
            return;
          case 'Select or create another vehicle':
            this.startCli();
            return;
          case 'Exit':
            this.exit = true;
            console.log('Exiting...');
            return;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  towVehicle(truck: Truck): void {
    if (this.vehicles.length === 1) {
      console.log('No other vehicles available to tow.');
      this.performActions();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow:',
          choices: this.vehicles
            .filter((vehicle) => vehicle.vin !== truck.vin)
            .map((vehicle) => ({
              name: `${vehicle.make} ${vehicle.model} (${vehicle.vin})`,
              value: vehicle.vin,
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find((vehicle) => vehicle.vin === answers.vehicleToTow);
        if (vehicleToTow) {
          truck.tow(vehicleToTow);
        }
        this.performActions();
      });
  }

  changeSpeed(vehicle: Vehicle, action: 'accelerate' | 'decelerate'): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'amount',
          message: `Enter the amount to ${action} (mph):`,
          validate: (input) => !isNaN(Number(input)) || 'Please enter a valid number.',
        },
      ])
      .then((answers) => {
        const amount = parseInt(answers.amount);

        if (action === 'accelerate') {
          vehicle.accelerate(amount);
        } else {
          vehicle.decelerate(amount);
        }

        this.performActions();
      });
  }
}

export default Cli;
