# Dans cet exercice, nous avons une liste qui contient 50 nombres.
# Le but de cet exercice est de récupérer dans la liste nombres_pairs, uniquement les nombres pairs de la liste nombres.
print()

nombres = range(51)
nombresPairsOneLine = [e for e in nombres if e % 2 == 0]

print(nombresPairsOneLine)






# nombres = range(51)
# nombres_pairs = []

# for i in nombres:
#     if i % 2 == 0:
#         nombres_pairs.append(i)

# print(nombres_pairs)