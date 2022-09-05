# Dans cet exercice, nous allons, à partir d'une variable 'symbole' et une variable 'taille' créer une pyramide avec ce symbole, de la hauteur du nombre contenu dans la variable 'taille'.
# Dans cet exemple-ci, nous allons donc afficher une pyramide de dollars ($) de hauteur 10.
# Votre script devra donc afficher :

symbole = "$"
taille = 10

for i in range(1, taille+1):
    espaces = " " * (taille - i)
    print(espaces + (symbole + " ") * i)