const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const index = express();
const routes = require("./routes/routes");
const db = require ('./db');
const bcrypt = require('bcrypt');

index.use(express.json());
index.use(cors());
index.use(bodyParser.urlencoded({extended: false}));
index.use("/api", routes);

index.listen(3000, ()=> {
    console.log("Servidor rodando!")
});

index.post('/registro', (req, res) => {
    const { nomeUsuario, emailUsuario, senhaUsuario } = req.body;

    bcrypt.hash(senhaUsuario, 10, (err, hashedSenha) => {
        if (err) {
            console.error('Erro ao criar senha:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;
        }

        db.query('INSERT INTO motiongames.usuarios (nomeusuario, emailUsuario, senhaUsuario) VALUES (?, ?, ?)', [nomeUsuario, emailUsuario, hashedSenha], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                res.status(500).json({ erro: 'Erro interno do servidor' });
                return;
            }
            res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
        });
    });
});

index.post('/login', (req, res) => {
    const { emailUsuario, senhaUsuario } = req.body;

    db.query('SELECT * FROM motiongames.usuarios WHERE emailUsuario = ?', [emailUsuario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ erro: 'Usuário não encontrado' });
            return;
        }

        const usuario = results[0];

        console.log('E-mail do usuário: ', emailUsuario);
        console.log('Senha do usuário: ', senhaUsuario);

        bcrypt.compare(senhaUsuario, usuario.senhaUsuario, (err, senhaValida) => {
            if (err) {
                console.error('Erro ao comparar senhas:', err);
                res.status(500).json({ erro: 'Erro interno do servidor' });
                return;
            }

            if (!senhaValida) {
                res.status(401).json({ erro: 'Credenciais inválidas' });
                return;
            }

            console.log('Senha válida: ', senhaValida);

            res.status(200).json({ mensagem: 'Login bem-sucedido' });
        });
    });
});