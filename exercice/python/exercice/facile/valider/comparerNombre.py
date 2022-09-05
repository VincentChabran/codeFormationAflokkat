# Dans cet exercice, vous devez générer deux nombres aléatoires et indiquer à l'utilisateur lequel des deux nombres est le plus grand.
# Par exemple :
# Un nombre a est généré aléatoirement et prend la valeur de 15.
# Un nombre b est généré aléatoirement et prend la valeur de 26.
# Votre script doit récupérer dans une variable resultat la chaîne de caractères suivante :
# "Le nombre b est plus grand que le nombre a."
# Dans le cas contraire, le script devra récupérer :
# "Le nombre a est plus grand que le nombre b."
# Si les nombres sont égaux, le script devra récupérer :
# "Le nombre a et le nombre b sont égaux."
# Les deux nombres générés aléatoirement peuvent être des nombres entier ou des nombres décimaux, cela n'a pas d'importance.
# Vous pouvez également choisir n'importe quel intervalle pour générer votre nombre aléatoire.

print()
import random

nombre1 = random.randint(0,30)
nombre2 = random.randint(0,30)

if nombre1 < nombre2: print(f"nb1 : {nombre1} plus petit que nb2 {nombre2}")

elif nombre1 > nombre2: print(f"nb1 : {nombre1} plus grand que nb2 {nombre2}")

elif nombre1 == nombre2: print("égaliter")

print()