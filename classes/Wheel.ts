// src/classes/Wheel.ts

class Wheel {
  private diameter: number;
  private brand: string;

  constructor(diameter: number = 20, brand: string = 'DefaultBrand') {
    this.diameter = diameter;
    this.brand = brand;
  }

  // Getter for the diameter property
  getDiameter(): number {
    return this.diameter;
  }

  // Getter for the brand property
  getTireBrand(): string {
    return this.brand;
  }
}

export default Wheel;
