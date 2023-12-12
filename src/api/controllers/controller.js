const services = require("../services/services");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error: '', result: []};

        let games = await services.buscarTodos();

        for (let i in games) {
            json.result.push({
                id: games[i].id,
                name: games[i].name,
                category: games[i].category,
                nota: games[i].nota,
                steam: games[i].steam,
            })
        }
        res.json(json);
    },

    buscarGame: async (req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;
        let game = await services.buscarGame(id);

        if (game) {
            json.result = game;
        }
        res.json(json);
    },

    adicionar: async (req, res) => {
        let json = {error: '', result: {}};

        let name = req.body.name;
        let category = req.body.category;
        let nota = req.body.nota;
        let stream = req.body.stream;

        if (name && category && nota && stream) {
            let gameId = await services.adicionar(name, category, nota, stream);
            json.result = {
                id: gameId,
                name,
                category,
                nota,
                stream,
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    alterar: async (req, res) => {
        let json = {error: '', result: ""};

        let id = req.params.id;
        let name = req.body.name;
        let category = req.body.category;
        let nota = req.body.nota;
        let stream = req.body.stream;

        if (id && name && category && nota && stream) {
            await services.alterar(id, name, category, nota, stream);
            json.result = {
                id,
                name,
                category,
                nota,
                stream,
            }
        } else {
                json.error = 'Campos não enviados';
        }
    },

    excluir: async (req, res) => {
        let json = {error: '', result: {}};

        await services.excluir(req.params.id);

        res.json(json);
    }
}