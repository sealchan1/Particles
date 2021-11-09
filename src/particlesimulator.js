import Particle from './Particle.js';

class ParticleSimulator {

    constructor() {

        // Constants
        // w = window
        this.wSide = 360;
        this.wCtr = this.wSide / 2;
        this.fullCircle = Math.PI * 2;
        this.timeInterval = 100; // milliseconds

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

        this.backgroundColor = 'indigo';
        this.drawBackground();
        
        this.registerEventListeners();

        this.runSimulation();
    }

    drawBackground() {

        // Window content
        this.wCtx = this.w.getContext('2d');
        // Background
        this.wCtx.fillStyle = this.backgroundColor;
        this.wCtx.fillRect(0, 0, this.wSide, this.wSide);

    }

    registerEventListeners() {

        this.addParticles = this.addParticles.bind(this);
        this.stopSim = this.stopSim.bind(this);
        this.updateParticles = this.updateParticles.bind(this);

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

        this.drawParticle(this.p[0], true);
        this.totalP++;

        // Event: Player adds particles

        // Loop goes here
        this.sim = window.setInterval(this.updateParticles, this.timeInterval);

    }

    updateParticles() {

        console.log('update particles');  // Debub

        // Calculate forces on each particle by black hole
        if(this.p) {
            for(let i = 1; i < this.p.length; i++) {
                this.p[i].setNewPositionWithGravitationalForce(this.p[0]);
            }

            for(let i = 1; i < this.p.length; i++) {
                this.drawParticle(this.p[i], false);

                this.p[i].move();

                this.drawParticle(this.p[i], true);
            }
        }
    }

    addParticles() {

        console.log('add particles'); // Debub

        let limit = this.totalP + parseInt(this.pCnt.value);

        for(let i = this.totalP; i < limit; i++) {
            this.p.push(new Particle(
                Math.floor(Math.random() * this.wSide), 
                Math.floor(Math.random() * this.wSide),
                'blue', 'lightgreen',
                1,
                (Math.random() * 1 - 0.5) / this.timeInterval, 
                (Math.random() * 1 - 0.5) / this.timeInterval
            ));
    
            this.drawParticle(this.p[i], true);
            this.totalP++;
        }

    }

    drawParticle(p, show) {

        this.wCtx.beginPath();
        this.wCtx.arc(
            p.x, p.y, 
            p.mass, 
            0, this.fullCircle, 
            true
        );
        
        if(show) {
            this.wCtx.strokeStyle = p.extColor;
            this.wCtx.fillStyle = p.intColor;
        }
        else {
            this.wCtx.strokeStyle = this.backgroundColor;
            this.wCtx.fillStyle = this.backgroundColor;
        }

        this.wCtx.lineWidth = 5;
        this.wCtx.stroke();
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
