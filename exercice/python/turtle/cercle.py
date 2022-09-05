from turtle import *

bgcolor('black')
pencolor('red')
# hideturtle()

begin_fill()

rayon = 100
ecart = 20

for i in range(10):
    up()
    goto(0, -rayon)
    down()
    circle(rayon)
    rayon += ecart 

up()
home()

end_fill()
done()