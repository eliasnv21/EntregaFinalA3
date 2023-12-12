const db = require("../db");

module.exports = {
    buscarTodos: () => {
        return new Promise ((aceito, rejeitado) => {
            db.query ('SELECT * FROM crus_games.game_db',(error,results) => {
                if (error) { rejeitado(error); return; }
                aceito (results);
            });
        });
    },

    buscarGame: (id) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('SELECT * FROM crus_games.game_db WHERE id = ?', [id],  (error, results) => {
                if (error) { rejeitado(error); return; }
                if(results.length > 0) {
                    aceito (results);
                } else {
                    aceito (false);
                }
            });
        });
    },

    adicionar: (name, category, nota, stream) => {
        return new Promise ((aceito, rejeitado) => {
            db.query ('INSERT INTO crus_games.game_db (name, category, nota, stream) VALUES (?, ?, ?, ?)', [name, category, nota, stream], (error, results) =>  {
                if (error) { rejeitado(error); return; }
                aceito(results.insertid);
            });
        });
    },

    alterar: (id, name, category, nota, stream) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('UPDATE crus_games.game_db SET name = ?, category = ?, nota = ?, stream = ? WHERE id = ?', [name, category, nota, stream, id], (error,results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
                }
            );
        });
    },

    excluir: (id) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('DELETE FROM crus_games.game_db WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    } 
}