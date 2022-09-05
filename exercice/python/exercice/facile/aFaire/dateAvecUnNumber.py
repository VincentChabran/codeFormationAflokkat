# Dans cet exercice, nous allons utiliser le module datetime pour calculer l'année de naissance de quelqu'un, à partir de son âge.
# Dans cet exemple, nous allons prendre un âge de 25 ans.
# Afin de ne pas fausser les résultats, nous allons également indiquer le mois de naissance afin de vérifier si la date d'anniversaire de la personne est passée ou non.
# Nous avons donc deux variables :
# La variable age qui contient l'âge de la personne (ici : 25).
# Le mois de naissance, contenu dans la variable mois_de_naissance (ici, le mois d'octobre, soit 10).
# À partir de ces deux infos, il faut calculer l'année à laquelle est née la personne. 
# Dans ce cas-ci, l'année que vous devez assigner à la variable resultat est 1995.

from datetime import datetime

age = 25
mois_de_naissance = 10































# correction

# from datetime import datetime

# age = 25
# mois_de_naissance = 10

# annee_actuelle = datetime.today().year
# mois_actuel = datetime.today().month

# resultat = annee_actuelle - age - (1 if mois_actuel < mois_de_naissance else 0)