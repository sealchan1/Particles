// Syzygy3.java

import java.applet.*;
import java.awt.*;

// run this applet with width=320 height=320
public class Syzygy3 extends Applet implements Runnable
{
    static final int REFRESH_RATE = 50;    // in ms
    static final double SCALE_FACTOR = 1.5E36;
    
    private volatile Thread animation;
    
    Graphics offscreen;
    Image image;
    
    static final double K = 8.99E10;  // 1 / ( 4 * pi * permittivity constant )
    static final int    NUM_PARTICLES = 2;         
    
    Particle a[];  // an array of particles
    Vector   f[];  // an array of forces
    
    public void init()
    {
        System.out.println( ">> init <<" );
        setBackground( Color.black );
        initParticles();
        image = createImage( 320, 320 );
        offscreen = image.getGraphics();
    }
    
    public void initParticles()
    {
        // allocate rectangles and dancing circles
        a = new Particle[NUM_PARTICLES];
        a[0] = new Particle( 10, 10, Color.blue, 1, 9.11E-31 );             // electron
        a[1] = new Particle( 160, 160, 10, 10, Color.red, -1, 1.67E-27 );   // proton
               
        for( int i = 0; i < NUM_PARTICLES; i++ )
            System.out.println( "Particle = " + i + " x = " + a[i].x + " y = " + a[i].y );        
        
        f = new Vector[NUM_PARTICLES];
        for( int i = 0; i < NUM_PARTICLES; i++ )
            f[i] = new Vector( 0, 0 );
    }
    
    public void start()
    {
        System.out.println( ">> start <<" );
        animation = new Thread( this );
        if( animation != null )
            animation.start();
    }
    
    // update each rectangle's position.
    public void updateParticles()
    {
        int ecs, why;   // work variables for x and y force components
        double eForce;  // work variable for magnitude of electric force
        double r;       // work variable for distance between two particles
        
        for( int i = 0; i < NUM_PARTICLES; i++ )
        {
            ecs = why = 0;
            eForce = 0;
                                
            for( int j = 0; j < NUM_PARTICLES; j++ )
            {
                // if the other particle j isn't the same particle and it has a charge
                if( i != j )
                {
                    r = Math.sqrt( Math.pow(a[j].x - a[i].x, 2) + Math.pow(a[j].y - a[i].y, 2) );
                    eForce = K * a[i].q * a[j].q / Math.pow( r, 2 );
                    ecs += eForce * (a[i].x - a[j].x) / r;
                    why += eForce * (a[i].y - a[j].y) / r;
                }
            }                 
            
            f[i].a = ecs;
            f[i].b = why;
        }
       
        for( int i = 0; i < NUM_PARTICLES; i++ )
        {
            //System.out.println( "Particle = " + i + " Fx = " + f[i].a + " Fy = " + f[i].b );
            a[i].move( f[i], REFRESH_RATE, SCALE_FACTOR );
            System.out.println( "Particle = " + i + " x = " + a[i].x + " y = " + a[i].y );
        }
    }
    
    // override update so it doesn't erase screen
    public void update( Graphics g )
    {
        paint( g );
    }
    
    public void paint( Graphics g )
    {
        offscreen.setColor( Color.black );
        offscreen.fillRect( 0, 0, 300, 300 );
        
        for( int i = 0; i < NUM_PARTICLES; i++ )
            a[i].paint( offscreen );
            
        g.drawImage( image, 0, 0, this );
    }
    
    public void run()
    {
        Thread thisThread = Thread.currentThread();
        while( animation == thisThread )
        {
            try
            {
                thisThread.sleep( REFRESH_RATE );
            } catch( InterruptedException e ) { };
                        
            repaint();
            updateParticles();
       }
    }
    
    public void stop()
    {
        System.out.println( ">> stop <<" );
        animation = null;
    }
}
