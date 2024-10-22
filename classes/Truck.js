// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
// The Truck class extends the Vehicle class and implements the AbleToTow interface
class Truck extends Vehicle {
    // Constructor for the Truck class
    constructor(vin, color, make, model, year, weight, topSpeed, wheels, towingCapacity) {
        // Call the constructor of the parent class, Vehicle
        super(vin, make, model, year, weight, topSpeed);
        // Initialize the properties of the Truck class
        this.color = color;
        // Ensure the truck has exactly 4 wheels, creating default wheels if not provided
        this.wheels = wheels.length === 4 ? wheels : [
            new Wheel(20, 'DefaultBrand'),
            new Wheel(20, 'DefaultBrand'),
            new Wheel(20, 'DefaultBrand'),
            new Wheel(20, 'DefaultBrand')
        ];
        this.towingCapacity = towingCapacity;
    }
    // Implement the tow method from the AbleToTow interface
    tow(vehicle) {
        const { make, model, weight } = vehicle;
        // Check if the vehicle's weight is less than or equal to the truck's towing capacity
        if (weight <= this.towingCapacity) {
            console.log(`Truck ${this.make} ${this.model} is towing ${make} ${model}.`);
        }
        else {
            console.log(`Truck ${this.make} ${this.model} cannot tow ${make} ${model} as it is too heavy.`);
        }
    }
    // Override the printDetails method from the Vehicle class
    printDetails() {
        // Call the printDetails method of the parent class
        super.printDetails();
        // Log additional details specific to the Truck class
        console.log(`
      Color: ${this.color}
      Towing Capacity: ${this.towingCapacity} lbs
      Wheels: ${this.wheels
            .map((wheel, index) => `Wheel ${index + 1}: ${wheel.getDiameter()} inches, Brand: ${wheel.getTireBrand()}`)
            .join(', ')}
    `);
    }
}
// Export the Truck class as the default export
export default Truck;
