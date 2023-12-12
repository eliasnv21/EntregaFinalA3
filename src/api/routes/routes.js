const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.post('/addgame', controller.adicionar);
router.get('/allgames', controller.buscarTodos);
router.get('/game/:id', controller.buscarGame);
router.put('/altergame/:id', controller.alterar);
router.delete('/deletegame/:id',controller.excluir);

module.exports = router;