const database = require("../database");

async function index(req, res) {
	const books = await database("livro").select("*");

	for (const book of books) {
		const authors = await database("livro_has_Autor")
			.select("Autor.nome", "Autor.idAutor")
			.join(
				"Autor",
				"Autor.idAutor",
				"=",
				"livro_has_Autor.Autor_idAutor"
			)
			.where("livro_has_Autor.livro_idLivro", book.idLivro);

		book.autores = authors;
	}

	return res.json(books);
}

async function store(req, res) {
	const data = req.body;

	if (!data.idsAutores)
		return res.status(400).send("Os ids dos autores são obrigatórios");
	if (!data.titulo) return res.status(400).send("O título é obrigatório");
	if (!data.data_publicacao)
		return res.status(400).send("A data de publicação é obrigatória");
	if (!data.subtitulo)
		return res.status(400).send("O subtítulo é obrigatório");

	if (!Array.isArray(data.idsAutores))
		return res
			.status(400)
			.send("O parâmetro idsAutores deve ser uma lista");
	if (!data.idsAutores.length)
		return res
			.status(400)
			.send("O parâmetro idsAutores deve ter pelo menos um item");
	if (data.titulo.length > 45)
		return res
			.status(400)
			.send("O título não pode ter mais de 45 caracteres");
	if (data.subtitulo.length > 45)
		return res
			.status(400)
			.send("O subtítulo não pode ter mais de 45 caracteres");

	const authors = database("Autor")
		.select("id")
		.whereIn("id", data.idsAutores);
	if (authors.length === 0)
		return res.status(404).send("Um dos autores escolhidos não existe");

	const book = await database("livro").insert({
		titulo: data.titulo,
		data_publicacao: data.data_publicacao,
		subtitulo: data.subtitulo,
	});

	for (const idAutor of data.idsAutores) {
		await database("livro_has_Autor").insert({
			Autor_idAutor: idAutor,
			livro_idLivro: book[0],
		});
	}

	return res.json(book);
}

module.exports = {
	index,
	store,
};
