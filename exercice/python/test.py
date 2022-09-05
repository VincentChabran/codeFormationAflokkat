import sys

# print(sys.platform)

class TestGetSetDel():
    def __init__(self, nom, prenom):
        self.nom = nom
        self.prenom = prenom

    def nomcompletGet(self):
        return self.nom + " " + self.prenom

    def nomcompletSet(self, nom, prenom):
        self.nom = nom
        self.prenom = prenom

    def nomcompletDel(self):
        self.nom = None
        self.prenom = None
    

    nomcomplet = property(nomcompletGet, nomcompletSet ,nomcompletDel)

objet1 = TestGetSetDel("Uchiha", "Sasuke")

# print(objet1.__dict__)

# ******************************* test array map ********************************

nombres = [2,3,4,5,6]
produit = list(map(lambda x: x * 2, nombres)) # crée un nouveau tableau map( lambda x:  action sur le tableau ,  nom du tableau )
print(produit)