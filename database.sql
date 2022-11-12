CREATE TABLE Autor (
    idAutor INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    data_de_nascimento DATE NOT NULL,
    sexo VARCHAR(45)
);

CREATE TABLE livro (
    idLivro INTEGER PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    data_publicacao DATE NOT NULL,
    subtitulo VARCHAR(45)
);

CREATE TABLE livro_has_Autor (
    livro_idLivro INTEGER NOT NULL,
    Autor_idAutor INTEGER NOT NULL,
    PRIMARY KEY (livro_idLivro, Autor_idAutor),
    FOREIGN KEY (livro_idLivro) REFERENCES livro (idLivro),
    FOREIGN KEY (Autor_idAutor) REFERENCES Autor (idAutor)
);