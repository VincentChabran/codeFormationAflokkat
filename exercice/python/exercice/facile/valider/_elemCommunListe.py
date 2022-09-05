# Dans cet exercice, vous allez devoir récupérer les éléments communs aux deux listes dans une variable resultat.
# Dans ce cas-ci, votre liste commune devra contenir les nombres 5, 7, et 10.
# Vous pouvez utiliser les sets pour cet exercice.

liste_01 = [1, 5, 6, 7, 9, 10, 11]
liste_02 = [2, 3, 5, 7, 8, 10, 12]

sliste_01 = set(liste_01)
sliste_02 = set(liste_02)

resultat = list(sliste_01.intersection(sliste_02))