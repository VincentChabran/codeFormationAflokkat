# Dans cet exercice, vous devez remplacer le mot "Bonjour" dans la variable phrase par le mot "Bonsoir" à l'aide d'une méthode disponible sur les chaînes de caractères.
# La variable nouvelle_phrase devra donc contenir la chaîne de caractères "Bonsoir tout le monde."
print()

phrase = "Bonjour tout le monde."
nouvelle_phrase = phrase.replace("Bonjour", "Bonsoir")
# print(nouvelle_phrase)

# Dans cet exercice, vous allez devoir utiliser les compréhensions de liste, pour remplacer une chaîne de caractères dans les éléments d'une liste par une autre chaîne de caractères.
# Dans cet exemple, nous devons remplacer 'Julie' par 'Julien' dans tous les éléments de la liste.
# La variable liste doit donc contenir les valeurs suivantes
# ['Pierre', 'Marie', 'Julien', 'Adrien', 'Julien']

liste = ["Pierre", "Marie", "Julie", "Adrien", "Julie"]

nom_a_chercher = "Julie"
nouveau_nom = "Julien"


newListe = []
for e in liste:
    newListe.append(e.replace(nom_a_chercher, nouveau_nom))


newListeOneLine = [e.replace(nom_a_chercher, nouveau_nom) for e in liste]

print(newListeOneLine)