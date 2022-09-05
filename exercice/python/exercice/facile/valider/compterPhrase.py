# Dans cet exercice, le but est de compter le nombre de phrases présentes dans le texte contenu dans la variable lorem.
# Ce texte contient 4 phrases, votre script devra donc retourner le nombre 4 dans la variable resultat.

lorem = """Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
		   Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."""

print(lorem.count('.'))