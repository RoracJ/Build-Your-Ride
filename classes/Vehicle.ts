// Import Driveable interface if it exists
import Driveable from '../interfaces/Driveable.js';

class Vehicle implements Driveable {
  // Static method to generate a VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  vin: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  currentSpeed: number;
  started: boolean;

  constructor(vin: string, make: string, model: string, year: number, weight: number, topSpeed: number) {
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.currentSpeed = 0;
    this.started = false;
  }

  // Method to start the vehicle
  start(): void {
    this.started = true;
    console.log(`${this.make} ${this.model} started.`);
  }

  // Method to accelerate the vehicle
  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      if (this.currentSpeed > this.topSpeed) {
        this.currentSpeed = this.topSpeed;
      }
      console.log(`${this.make} ${this.model} accelerated to ${this.currentSpeed} mph.`);
    } else {
      console.log(`Start the ${this.make} ${this.model} first.`);
    }
  }

  // Method to decelerate the vehicle
  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed -= change;
      if (this.currentSpeed < 0) {
        this.currentSpeed = 0;
      }
      console.log(`${this.make} ${this.model} decelerated to ${this.currentSpeed} mph.`);
    } else {
      console.log(`Start the ${this.make} ${this.model} first.`);
    }
  }

  // Method to stop the vehicle
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log(`${this.make} ${this.model} stopped.`);
  }

  // Method to turn the vehicle
  turn(direction: string): void {
    if (this.started) {
      console.log(`${this.make} ${this.model} turned ${direction}.`);
    } else {
      console.log(`Start the ${this.make} ${this.model} first.`);
    }
  }

  // Method to reverse the vehicle
  reverse(): void {
    if (this.started) {
      console.log(`${this.make} ${this.model} reversed.`);
    } else {
      console.log(`Start the ${this.make} ${this.model} first.`);
    }
  }

  // Method to print details of the vehicle
  printDetails(): void {
    console.log(`
      VIN: ${this.vin}
      Make: ${this.make}
      Model: ${this.model}
      Year: ${this.year}
      Weight: ${this.weight} lbs
      Top Speed: ${this.topSpeed} mph
      Current Speed: ${this.currentSpeed} mph
    `);
  }
}

export default Vehicle;