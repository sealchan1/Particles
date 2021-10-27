// Particle.java

import java.awt.*;

class Particle
{
	// instance variables:
     int x, y;      // (locx, locy) are coordinates of upper left corner of a bounding square
     double vx, vy; // x and y components of a particles velocity
     int w, h;      // width and height of circle
     Color c;       // color of particle
     int q;         // charge
     double m;      // rest mass
          
     // constructor
     public Particle( int w, int h, Color c, int q, double m )
     {
          this.x = (int)(Math.random() * 100) + 110;
          this.y = (int)(Math.random() * 100) + 110;
          this.vx = 0;
          this.vy = 0;
          this.w = w;
          this.h = h;
          this.c = c;
          this.q = q;
          this.m = m;
     }
     
     public Particle( int x, int y, int w, int h, Color c, int q, double m )
     {
          this.x = x;
          this.y = y;
          this.vx = 0;
          this.vy = 0;
          this.w = w;
          this.h = h;
          this.c = c;
          this.q = q;
          this.m = m;
     }
     
     public void move( Vector f, int refRate, double scaleFactor )
     {
         double oldvx, oldvy;
         double ax, ay;
         double t;
         
         oldvx = vx;  
         oldvy = vy;
         ax = f.a / m;  
         ay = f.b / m; 
         t = 0.001 * refRate;
         
         x += (int)(( 0.5 * ax * Math.pow(t, 2) + vx * t ) / scaleFactor);
         y += (int)(( 0.5 * ay * Math.pow(t, 2) + vy * t ) / scaleFactor);
         vx = oldvx + ax * t;
         vy = oldvy + ay * t;
         //System.out.println ( "delta position = (" + (oldx - x) + "," + (oldy - y) + ")" );
     }
     
     public void paint( Graphics g )
     {
          g.setColor( c );
          g.fillOval( x, y, w, h );
     }
}
