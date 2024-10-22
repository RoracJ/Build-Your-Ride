// src/classes/Wheel.ts
class Wheel {
    constructor(diameter = 20, brand = 'DefaultBrand') {
        this.diameter = diameter;
        this.brand = brand;
    }
    // Getter for the diameter property
    getDiameter() {
        return this.diameter;
    }
    // Getter for the brand property
    getTireBrand() {
        return this.brand;
    }
}
export default Wheel;
