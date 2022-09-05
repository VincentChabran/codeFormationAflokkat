# Dans cet exercice vous devez récupérer la date d'aujourd'hui dans la variable date_today.
# Vous devez formater la date d'une manière spécifique en ayant 2 chiffres pour le jour (par exemple : 02, 08, 25...), 
# le nom du mois au complet (par exemple : January, October...) et l'année au complet (par exemple : 2021, 2022...).
# Exemple avec quelques dates :
# 10 April 2022
# 27 October 1993
# 01 January 2001

from datetime import datetime

date_today = datetime.today().strftime("%d %B %Y")