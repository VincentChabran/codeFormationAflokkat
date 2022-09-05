import imp
from turtle import *
import turtle 

Screen().bgcolor('black')
color('red', 'yellow')
speed(10)
goto(-150,0)
begin_fill()

cpt = 0
while True:
    cpt+=1
    forward(400)
    left(170)
    if cpt >= 36:
        break

end_fill()
done()