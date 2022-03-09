const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const simulation = new SolarSystemSimulation();
let time = new Date().getTime();

let loop = () => {
    context.fillStyle = '#aaa';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let nextTime = new Date().getTime();
    let elapsedTime = (nextTime - time) / 1000;
    time = nextTime;

    simulation.update(elapsedTime);
    simulation.render(context);

    window.requestAnimationFrame(loop);
}

loop();