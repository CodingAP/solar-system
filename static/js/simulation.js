class SolarSystemSimulation {
    constructor() {
        this.bodies = [];
    }

    addBody(body) {
        this.bodies.push(body);
    }

    update(elapsedTime) {
        for (let body of this.bodies) {
            body.updateVelocity(elapsedTime);
        }

        for (let body of this.bodies) {
            body.updatePosition(elapsedTime);
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
        this.mass = options.mass;
        this.position = new Vector2() || options.initialPosition;
        this.velocity = new Vector2() || options.initialVelocity;
        this.acceleration = new Vector2() || options.initialAcceleration;
    }

    updateVelocity(elapsedTime) {

    }

    updatePosition(elapsedTime) {

    }

    render(context) {

    }
}