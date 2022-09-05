# Dans cet exercice, vous devez créer une méthode changer_prix qui permet de changer le prix de la voiture.
# Vous devez également créer la méthode __init__ afin de créer les attributs d'instance marque et prix.
# La méthode changer_prix ne doit fonctionner qu'avec un nombre entier.
# L'utilisateur ne doit donc pas être en mesure de changer le prix pour autre chose qu'un nombre entier.
# Le code voiture.changer_prix(prix="bonjour") ou voiture.changer_prix(prix=25000.5) ne doivent donc pas modifier la valeur de l'attribut voiture.prix.
# Pour valider l'exercice, l'attribut prix doit être mis à jour et être égal à 35,000 à la fin du script.

# isinstance pour verifie le parametre de changer_prix

class Voiture:

    def __init__(self, marque, prix):
        self.marque = marque
        self.prix = prix

    def changer_prix(self, prix):
        if isinstance(prix, int):
            self.prix = prix


voiture = Voiture(marque="Mazda", prix=30000)
voiture.changer_prix(35000)