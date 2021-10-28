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
        this.addBtn = document.getElementById('add');
        this.stopBtn = document.getElementById('stop');

        // DOM - Canvas
        this.w = document.getElementById('window');
        this.w.height = this.wSide;
        this.w.width = this.wSide;

        // Particles
        this.p = [];
        this.totalP = 0;

        // States
        this.run = true;
        this.tick = true;
        this.lastTick = 0;
        this.sim;

        this.drawBackground();
        
        this.registerEventListeners();

        this.runSimulation();
    }

    drawBackground() {

        // Window content
        this.wCtx = this.w.getContext('2d');
        // Background
        this.wCtx.fillStyle = 'indigo';
        this.wCtx.fillRect(0, 0, this.wSide, this.wSide);

    }

    registerEventListeners() {

        this.addParticles = this.addParticles.bind(this);
        this.addBtn.addEventListener('click', this.addParticles);

        this.stopBtn.addEventListener('click', this.stopSim);

    }

    runSimulation() {

        console.log("running simulation");  // Debub

        // Add Black Hole to Particles
        this.p.push(new Particle(
            this.wSide / 2,
            this.wSide / 2,
            'black', 'orange',
            10
        ));

        this.drawParticle(this.p[0]);
        this.totalP++;

        // Event: Player adds particles

        // Loop goes here
        this.sim = window.setInterval(this.updateParticles, 100);

    }

    updateParticles() {

        console.log('update particles');

    }
    addParticles() {

        console.log('add particles'); // Debub

        let limit = this.totalP + parseInt(this.pCnt.value);

        for(let i = this.totalP; i < limit; i++) {
            this.p.push(new Particle(
                Math.floor(Math.random() * this.wSide), 
                Math.floor(Math.random() * this.wSide),
                'blue', 'lightgreen',
                1
            ));
    
            this.drawParticle(this.p[i]);
            this.totalP++;
        }

    }

    drawParticle(p) {

        this.wCtx.beginPath();
        this.wCtx.arc(
            p.x, p.y, 
            p.mass, 
            0, this.fullCircle, 
            true
        );
        this.wCtx.strokeStyle = p.extColor;
        this.wCtx.lineWidth = 5;
        this.wCtx.stroke();
        this.wCtx.fillStyle = p.intColor;
        this.wCtx.fill();

    }

    stopSim() {

        console.log('stopping sim'); // Debub

        window.clearInterval(this.sim);
    }
}

let pS;
window.onload = () => {
    pS = new ParticleSimulator();
};
