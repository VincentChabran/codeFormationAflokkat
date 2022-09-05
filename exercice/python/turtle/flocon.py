import turtle 


def courbe_von_koch (longueur, etape):
    if etape == 0:
        turtle.forward (longueur)
    else:
        courbe_von_koch (longueur/3, etape-1)
        turtle.left (60)
        courbe_von_koch (longueur/3, etape-1)
        turtle.right (120)
        courbe_von_koch (longueur/3, etape-1)
        turtle.left (60)
        courbe_von_koch (longueur/3, etape-1)

def flocon_von_koch (longueur, etape):
    for i in range (3):
        courbe_von_koch (longueur, etape)
        turtle.right (120) 


flocon_von_koch (100, 3)