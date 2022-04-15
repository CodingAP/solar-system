class SolarSystemSimulation {
    constructor(bodyFile) {
        fetch(bodyFile)
            .then(response => response.json())
            .then(data => {
                let centeredSelector = document.querySelector('#centered');

                Object.entries(data).forEach(([key, data]) => {
                    let newBody = new CelestialBody(data);
                    newBody.simulation = this;
                    this.bodies[key] = newBody;

                    let option = document.createElement('option');
                    option.value = key;
                    option.innerText = key;
                    centeredSelector.appendChild(option);

                    if (data.centered) this.centeredBody = key;
                });
                
                this.loaded = true;
            });

        this.bodies = {};

        this.G = 6.67 * Math.pow(10, -11);

        this.centeredBody = '';
        this.metersPerPixel = 500000000;
        this.timePerSecond = 1000000;
        this.paused = false;
        this.loaded = false;
        this.orbitsEnabled = false;
        this.trailsEnabled = true;

        let mppSlider = document.querySelector('#mpp-input');
        let mppLabel = document.querySelector('#mpp-label');
        let centeredSelector = document.querySelector('#centered');
        let orbitsCheckbox = document.querySelector('#orbit-checkbox');
        let trailsCheckbox = document.querySelector('#trails-checkbox');
        let timeSlider = document.querySelector('#time-input');
        let timeLabel = document.querySelector('#time-label');
        let pauseButton = document.querySelector('#pause-button');

        mppSlider.addEventListener('input', () => {
            this.metersPerPixel = parseInt(mppSlider.value);
            mppLabel.innerText = this.metersPerPixel.toPrecision(4);
        });

        timeSlider.addEventListener('input', () => {
            this.timePerSecond = parseInt(timeSlider.value);
            timeLabel.innerText = this.timePerSecond;
        });

        pauseButton.addEventListener('click', () => {
            this.paused = !this.paused; 
        });

        centeredSelector.addEventListener('input', () => {
            this.centeredBody = centeredSelector.value;
        });
        
        orbitsCheckbox.addEventListener('change', () => {
            this.orbitsEnabled = orbitsCheckbox.checked;
        });

        trailsCheckbox.addEventListener('change', () => {
            this.trailsEnabled = trailsCheckbox.checked;
        });
    }

    update(elapsedTime) {
        let bodyNames = Object.keys(this.bodies);

        bodyNames.forEach(body => {
            bodyNames.forEach(other => {
                if (body === other) return;

                let rSqr = this.bodies[other].position.clone().subtract(this.bodies[body].position).getMagnitudeSqr();
                let forceDir = this.bodies[other].position.clone().subtract(this.bodies[body].position).normalize();

                let acceleration = forceDir.multiply(this.G * this.bodies[other].mass).divide(rSqr);
                this.bodies[body].velocity.add(acceleration.multiply(elapsedTime));
            });
        });

        bodyNames.forEach(body => {
            this.bodies[body].position.add(this.bodies[body].velocity.clone().multiply(elapsedTime));
        });
    }

    render(context) {
        Object.keys(this.bodies).forEach(body => {
            this.bodies[body].render(context);
        });
    }
}

class CelestialBody {
    constructor(options) {
        this.simulation = null;
        
        this.mass = options.mass || 1;
        this.radius = options.radius || 1;
        this.position = new Vector2(options.initial.position.x || 0, options.initial.position.y || 0);
        this.velocity = new Vector2(options.initial.velocity.x || 0, options.initial.velocity.y || 0);
        this.color = options.color || '#000';
        this.orbitData = options.orbit || { center: { x: 0, y: 0 }, a: 0, b: 0 };

        this.trail = [];
    }

    render(context) {
        let transformedX = context.canvas.width / 2 + (this.position.x - this.simulation.bodies[this.simulation.centeredBody].position.x) / this.simulation.metersPerPixel;
        let transformedY = context.canvas.height / 2 + (this.position.y - this.simulation.bodies[this.simulation.centeredBody].position.y) / this.simulation.metersPerPixel;

        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        context.beginPath();
        context.arc(transformedX, transformedY, this.radius / this.simulation.metersPerPixel * 10, 0, Math.TWO_PI);
        context.closePath();
        context.fill();
        
        if (this.simulation.orbitsEnabled) {
            let transformedOrbitCenterX = context.canvas.width / 2 + (this.orbitData.center.x - this.simulation.bodies[this.simulation.centeredBody].position.x) / this.simulation.metersPerPixel;
            let transformedOrbitCenterY = context.canvas.height / 2 + (this.orbitData.center.y - this.simulation.bodies[this.simulation.centeredBody].position.y) / this.simulation.metersPerPixel;
            let transformedOrbitMajor = this.orbitData.a / this.simulation.metersPerPixel;
            let transformedOrbitMinor = this.orbitData.b / this.simulation.metersPerPixel;

            context.lineWidth = 1;
            context.beginPath();
            context.ellipse(transformedOrbitCenterX, transformedOrbitCenterY, transformedOrbitMajor, transformedOrbitMinor, 0, 0, Math.TWO_PI);
            context.closePath();
            context.stroke();
        }

        if (this.simulation.trailsEnabled) {
            this.trail.push({ x: this.position.x, y: this.position.y });
            if (this.trail.length > 100) this.trail.shift();

            context.lineWidth = 3;
            context.beginPath();
            context.moveTo(
                context.canvas.width / 2 + (this.trail[0].x - this.simulation.bodies[this.simulation.centeredBody].position.x) / this.simulation.metersPerPixel,
                context.canvas.height / 2 + (this.trail[0].y - this.simulation.bodies[this.simulation.centeredBody].position.y) / this.simulation.metersPerPixel
            );
            for (let i = 1; i < this.trail.length; i++) {
                context.lineTo(
                    context.canvas.width / 2 + (this.trail[i].x - this.simulation.bodies[this.simulation.centeredBody].position.x) / this.simulation.metersPerPixel,
                    context.canvas.height / 2 + (this.trail[i].y - this.simulation.bodies[this.simulation.centeredBody].position.y) / this.simulation.metersPerPixel
                );
            }
            context.stroke();
        } else {
            this.trail = [];
        }
    }
}

/**
 * "MOON": {
        "mass": 7.34767309e22,
        "radius": 1.7374e6,
        "color": "gray",
        "initial": {
            "velocity": { "x": 30873, "y": 0 },
            "position": { "x": 0, "y": 1.499844e11 }
        }
    }
 */