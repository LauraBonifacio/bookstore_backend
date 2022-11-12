const database = require("../database");

async function index(req, res) {
	const authors = await database.select("*").from("Autor");
	return res.json(authors);
}

async function store(req, res) {
	const data = req.body;

	if (!data.nome) return res.status(400).send("O nome é obrigatório");
	if (!data.data_de_nascimento)
		return res.status(400).send("A data de nascimento é obrigatória");
	if (!data.sexo) return res.status(400).send("O campo sexo é obrigatório");

	if (data.nome.length > 45)
		return res
			.status(400)
			.send("O nome não pode ter mais de 45 caracteres");

	if (
		!data.data_de_nascimento.match(
			/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
		)
	)
		return res.status(400).send("A data precisa ter o formato yyyy-mm-dd");
	if (data.sexo.length > 45)
		return res
			.status(400)
			.send("O campo sexo não pode ter mais de 45 caracteres");

	const authors = await database("Autor").insert({
		nome: data.nome,
		data_de_nascimento: data.data_de_nascimento,
		sexo: data.sexo,
	});

	return res.json(authors);
}

module.exports = {
	index,
	store,
};
