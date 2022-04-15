class Mover {
    position;
    velocity;
    acceleration;
    mass;
    radius;

    constructor(x, y, m) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 3);
        this.acceleration = new Vector2();
        this.mass = m;
        this.radius = 25;
    }

    applyForce(force) {
        force.divide(this.mass);
        this.acceleration.add(force);
    }

    update(deltaTime) {
        this.velocity.add(this.acceleration.clone().multiply(deltaTime));
        this.position.add(this.velocity.clone().multiply(deltaTime));
    }

    render(context) {
        context.fillStyle = '#aaa';
        context.strokeStyle = '#fff';
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.TWO_PI);
        context.closePath();
        context.fill();
        context.stroke();
    }
}

class Attractor {
    position;
    mass;
    radius;

    constructor(x, y, m) {
        this.position = new Vector2(x, y);
        this.mass = m;
        this.radius = 50;
    }

    attract(mover) {
        const G = 6.67 * Math.pow(10, -11);

        let r = this.position.distance(mover.position);
        let strength = (G * (this.mass * mover.mass)) / Math.pow(r, 2);

        let force = this.position.clone().subtract(mover.position).setMagnitude(strength);
        mover.applyForce(force);
    }

    render(context) {
        context.fillStyle = '#fff';
        context.strokeStyle = '#fff';
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.TWO_PI);
        context.closePath();
        context.fill();
        context.stroke();
    }
}