# https://www.docstring.fr/formations/exercices/750/
# Un exercice toujours très intéressant à faire en Python est d'essayer de recréer 
# les fonctions de base.
# Dans cet exercice, nous allons recréer la fonction len qui permet de compter 
# la longueur d'une variable.
# Dans cet exemple, nous voulons compter le nombre de lettres dans le mot 'bonjour'.
# Votre script doit donc retourner le nombre 7 dans la variable resultat.
from numpy import var


print()

def longueur(variable):
	cpt = 0
	for el in variable:
		cpt += 1
	return  cpt


def longueur2(variable):
	return sum(1 for _ in variable)
	# return sum([1 for _ in variable])


resultat = longueur2("bonjour")
print(resultat)

print()