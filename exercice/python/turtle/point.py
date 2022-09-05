import turtle
from random import randint

c = ['black', 'grey', 'brown', 'orange', 'pink', 'purple',
  'red', 'blue', 'yellow', 'green'] 

turtle.setup(700, 100)
diametre = 20

turtle.up(); 
turtle.setx(-turtle.window_width()/2+2*diametre); 
turtle.down() 

for i in range( len(c) ):
    index = randint( 0, len(c) - 1)
    turtle.dot( diametre, c[index] )
    del c[index]

    diametre += 5;
    turtle.up(); 
    turtle.fd(1.5*diametre); 

turtle.done()