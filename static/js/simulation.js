class SolarSystemSimulation {
    constructor() {
        this.bodies = [];
    }

    addBody(body) {
        this.bodies.push(body);
    }

    update(elapsedTime) {
        for (let body of this.bodies) {
            // Update velocities
        }

        for (let body of this.bodies) {
            // Update positions
        }
    }

    render(context) {
        for (let body of this.bodies) {
            body.render(context);
        }
    }
}

class CelestialBody {
    constructor(options) {
        this.simulation = null;
        
        this.mass = options.mass;
        this.position = new Vector2() || options.initialPosition;
        this.velocity = new Vector2() || options.initialVelocity;
        this.acceleration = new Vector2() || options.initialAcceleration;
    }

    render(context) {

    }
}