// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  color: string;
  wheels: Wheel[];

  // Constructor for the Motorbike class
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

    // Initialize the properties of the Motorbike class
    this.color = color;
    // Ensure the motorbike has exactly 2 wheels, creating default wheels if not provided
    this.wheels = wheels.length === 2 ? wheels : [
      new Wheel(17, 'DefaultBrand'),
      new Wheel(17, 'DefaultBrand'),
    ];
  }

  // Method to perform a wheelie
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class
    super.printDetails();
    
    // Log additional details specific to the Motorbike class
    console.log(`
      Color: ${this.color}
      Wheels: ${this.wheels
        .map((wheel, index) => `Wheel ${index + 1}: ${wheel.getDiameter()} inches, Brand: ${wheel.getTireBrand()}`)
        .join(', ')}
    `);
  }
}

// Export the Motorbike class as the default export
export default Motorbike;
