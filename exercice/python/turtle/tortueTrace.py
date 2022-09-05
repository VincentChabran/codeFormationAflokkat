import turtle 

turtle.setup(640, 480)
ecart = 4

for i in range(30):
    turtle.stamp()
    turtle.left(30)
    turtle.up(); 
    turtle.forward(ecart); 
    ecart += 3

turtle.done()
