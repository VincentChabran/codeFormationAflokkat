import turtle

t = turtle.Turtle()
t.goto(0,150)
s = turtle.Screen()
s.bgcolor('black')
t.pencolor('red')
t.speed(7)

a=0
b=0

while True:
    t.forward(a)
    t.right(b)
    a+=3
    b+=1
    if b==210:
        break
    t.hideturtle()

turtle.done()