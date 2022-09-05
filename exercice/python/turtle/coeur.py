from turtle import *

def curve():
    for i in range(200):
        right(1)
        forward(2)

bgcolor('black')
pencolor('red')
fillcolor('red')
penup()
print('1')
setposition(0, -100)
pendown()
begin_fill()
left(140)
forward(226)
speed(0)
curve()
left(120)
curve()
forward(224)
end_fill()
hideturtle()
done()