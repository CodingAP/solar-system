const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const simulation = new SolarSystemSimulation("celestial_bodies.json");
let time = new Date().getTime();

let resize = () => {
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
}

resize();
window.addEventListener('resize', resize);

let loop = () => {
    let nextTime = new Date().getTime();
    let elapsedTime = (nextTime - time) / 1000;
    time = nextTime;

    if (!simulation.paused && simulation.loaded) {
        context.fillStyle = '#222';
        context.fillRect(0, 0, canvas.width, canvas.height);

        simulation.update(elapsedTime * simulation.timePerSecond);
        simulation.render(context);
    }

    window.requestAnimationFrame(loop);
}

loop();