/**
 * @file Filme.hpp
 * @author Diego Anestor Coutinho (diego.anestor@gec.inatel.br)
 * @brief Arquivo de definição da classe Filme
 * @date 2023-08-15
 */

#ifndef FILME_HPP
#define FILME_HPP

class Filme
{
public:
    char titudo[255] = "";
    int ano = 0;
    char genero[100] = "";
    int duracao = 0;
    bool assistido = 0;
    int avaliacao = 0;

    Filme(char titulo[255], int ano, char genero[100], int duracao);
    void info();
    void see();
    void score(int nota);
};

#endif // FILME_HPP