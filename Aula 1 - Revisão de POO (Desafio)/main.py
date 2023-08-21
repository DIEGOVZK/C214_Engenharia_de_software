'''
    - file: main.py
    - Author: Diego Anestor Coutinho (diego.anestor@gec.inatel.br)
'''

# Importa a classe filme
from Filme import Filme

# Criação dos objetos para representar três filmes diferentes
filme1 = Filme("Spider-Man: Into the Spider-Verse", 2018, "Ação", 114)
filme2 = Filme("Interestellar", 2014, "Ficção Científica", 169)
filme3 = Filme("Everything Everywhere All at Once", 2022, "Fantasia", 139)

# Exibindo detalhes dos filmes
filme1.info()
print()
filme2.info()
print()
filme3.info()

# Printa um separador de asunto
print("\n--------------------------------------\n")

# Marcar os filmes como assistidos e dar uma nota
filme1.assistido = True
filme1.avaliar(9.5)

filme2.assistido = True
filme2.avaliar(9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999)

filme3.assistido = True
filme3.avaliar(10)

# Exibindo detalhes dos filmes novamente
filme1.info()
print()
filme2.info()
print()
filme3.info()