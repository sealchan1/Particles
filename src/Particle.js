export default class Particle {

    constructor(x, y, intColor, extColor, mass, vX = 0.0, vY = 0.0) {
      
        // Gravitational Constant and units 6.67408 × 10-11 m3 kg-1 s-2
        // Sim Gravity
        this.G = 1e-3; // Set by experimentation        
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.intColor = intColor;
        this.extColor = extColor;
        this.mass = mass;

        this.newX = this.x;
        this.newY = this.y;
        this.timeInterval = 100; // milliseconds

    }

    setNewPositionWithGravitationalForce(attractor) {

        // Radius between particles
        let rX = attractor.x - this.x;
        let rY = attractor.y - this.y;
        const rP2 = (rX * rX) + (rY * rY);
        const r = Math.sqrt(rP2);
                
        // Force of attractor on this particle
        let force = this.G * attractor.mass * this.mass / rP2;

        let forceX = force * rX / r;
        let forceY = force * rY / r;

        //console.log("forceX, forceY = " + forceX + ", " + forceY); // Debub
        console.log("force = " + force); // Debub
        
        // s = vt + 0.5at^2 where a = m / F
        // Implement acceleration term only first
        this.newX =  this.x + 
            (
                (this.vX * this.timeInterval) + 
                ((forceX / (2 * this.mass)) * this.timeInterval * this.timeInterval)
            );
        this.newY = this.y + 
            (
                (this.vY * this.timeInterval) + 
                ((forceY / (2 * this.mass)) * this.timeInterval * this.timeInterval)
            );

        this.vX = (this.newX - this.x) / this.timeInterval;
        this.vY = (this.newY - this.y) / this.timeInterval;

        //console.log("old x, y = " + this.x + ", " + this.y);
        //console.log("new x, y = " + this.newX + ", " + this.newY);
        console.log("velocity = " + this.vX + ", " + this.vY);

    }

    move() {

        this.x = this.newX;
        this.y = this.newY;

    }
    
}
