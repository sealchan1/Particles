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
        // Problem:  The click for stopping the sim isn't happening...is that because the event can't be called because this loop has all the threads?
        while(false) // this.run
        {
            if(this.tick) {

                // Do stuff
                console.log('doing stuff');

                // Update particle positions per interval
                // a vector for every particle
                // Calculate the new position of each particle given a time interval
                // Remove old particles and draw new particles

                this.tick = false;
            }

            if(this.isDecisecond()) {
                this.tick = true;
            }

        }

    }

    isDecisecond() {

        let now = new Date().getMilliseconds();
        if (now < this.lastTick) {
            this.lastTick -= 1000;
        }

        if(now > this.lastTick + 100) {
            this.lastTick = now;
            return true;
        }
        else {
            return false;
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

        this.run = false;
    }
}

let pS;
window.onload = () => {
    pS = new ParticleSimulator();
};
