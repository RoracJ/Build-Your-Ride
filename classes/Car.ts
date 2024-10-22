// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Car class that extends Vehicle class
class Car extends Vehicle {
  color: string;
  wheels: Wheel[];

  // Constructor for the Car class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    // Call the constructor of the parent class, Vehicle
    super(vin, make, model, year, weight, topSpeed);

    // Initialize properties of the Car class
    this.color = color;
    // Ensure the car has exactly 4 wheels, creating default wheels if not provided
    this.wheels = wheels.length === 4 ? wheels : [
      new Wheel(17, 'DefaultBrand'),
      new Wheel(17, 'DefaultBrand'),
      new Wheel(17, 'DefaultBrand'),
      new Wheel(17, 'DefaultBrand')
    ];
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class, Vehicle
    super.printDetails();

    // Print details of the Car class
    console.log(`Color: ${this.color}`);

    // Print details of the wheels
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter()} inches with a ${wheel.getTireBrand()} tire`
      );
    });
  }
}

// Export the Car class as the default export
export default Car;
