const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let time = new Date().getTime();

let mover = new Mover(50, 50, 100);
let attractor = new Attractor(200, 200, 10000000);

let loop = () => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let nextTime = new Date().getTime();
    let elapsedTime = (nextTime - time) / 1000;
    time = nextTime;

    attractor.render(context);
    attractor.attract(mover);

    mover.update(elapsedTime);
    mover.render(context);    

    window.requestAnimationFrame(loop);
}

loop();