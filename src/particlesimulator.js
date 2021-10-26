import Particle from './Particle.js';

class ParticleSimulator {

    constructor() {

        // Constants
        // w = window
        this.wSide = 360;
        this.wCtr = this.wSide / 2;
        this.fullCircle = Math.PI * 2;

        // DOM Mapping
        this.pCnt = document.getElementById('pCnt');
        this.startBtn = document.getElementById('start');

        // DOM - Canvas
        this.w = document.getElementById('window');
        this.w.height = this.wSide;
        this.w.width = this.wSide;

        this.drawBackground();
        
        this.registerEventListeners();
    }

    drawBackground() {

        // Window content
        this.wCtx = this.w.getContext('2d');
        // Background
        this.wCtx.fillStyle = 'indigo';
        this.wCtx.fillRect(0, 0, this.wSide, this.wSide);

        // Black Hole
        this.wCtx.beginPath();
        this.wCtx.arc(this.wCtr, this.wCtr, 10, 0, this.fullCircle, true);
        this.wCtx.strokeStyle = 'orange';
        this.wCtx.lineWidth = 5;
        this.wCtx.stroke();
        this.wCtx.fillStyle = 'black';
        this.wCtx.fill();

    }

    registerEventListeners() {

        this.runSimulation = this.runSimulation.bind(this);
        this.startBtn.addEventListener('click', this.runSimulation);

    }

    runSimulation() {

        console.log("Running simulation loop");

        let pCnt = document.getElementById('pCnt');
        let p = [];

        for(let i = 0; i < pCnt.value; i++) {
            p.push(new Particle(
                Math.floor(Math.random() * this.wSide), 
                Math.floor(Math.random() * this.wSide)));
    
            this.drawParticle(p[i]);
        }

        // Loop goes here
        // Calculate the force of gravity on each particle
        // Using Newton's law
        // Remove old particles and draw new particles

    }

    drawParticle(p) {

        this.wCtx.beginPath();
        this.wCtx.arc(p.x, p.y, 4, 0, this.fullCircle, true);
        this.wCtx.strokeStyle = 'lightgreen';
        this.wCtx.lineWidth = 5;
        this.wCtx.stroke();
        this.wCtx.fillStyle = 'blue';
        this.wCtx.fill();

    }
}

let pS;
window.onload = () => {
    pS = new ParticleSimulator();
};
