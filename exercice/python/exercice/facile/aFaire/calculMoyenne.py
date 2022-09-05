# Dans cet exercice, vous devrez réaliser une fonction moyenne_eleves qui prend en paramètre 
# un dictionnaire avec en clé les noms 
# des élèves et en valeur une liste contenant leurs différentes notes. 
# La fonction devra renvoyer un dictionnaire en associant
#  les noms des élèves en clé avec leur moyenne.
# >>> moyenne_eleves(classe)
# {'Adrienne': 11.0,
#  'Joséphine': 14.0,
#  'Margaret': 11.0,
#  'Michel': 1.0,
#  'Olivier': 4.6,
#  'René': 18.0,
#  'Édouard': 12.8}


classe = {'Adrienne': [4, 18],
          'Joséphine': [10, 12, 20],
          'Margaret': [11],
          'Michel': [1],
          'Olivier': [1, 2, 3, 10, 7],
          'René': [17, 17, 20],
          'Édouard': [5, 17, 14, 12, 16]}

print(classe['Adrienne'])