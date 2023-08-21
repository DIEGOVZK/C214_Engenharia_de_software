'''
    - file: Filme.py
    - Author: Diego Anestor Coutinho (diego.anestor@gec.inatel.br)
'''

class Filme:
    def __init__(self, titulo, ano, genero, duracao):
        self.titulo = titulo
        self.ano = ano
        self.genero = genero
        self.duracao = duracao
        self.assistido = False
        self.avaliacao = None

    def info(self):
        print(f"Título: {self.titulo}")
        print(f"Ano: {self.ano}")
        print(f"Gênero: {self.genero}")
        print(f"Duração: {self.duracao} minutos")

        print("Assistido: ", end="")
        if self.assistido:
            print("Sim")
        else:
            print("Não")
            
        if self.avaliacao:
            print(f"Avaliação: {self.avaliacao}/10")

    def assistido(self):
        self.assistido = True

    def avaliar(self, nota):
        self.avaliacao = nota