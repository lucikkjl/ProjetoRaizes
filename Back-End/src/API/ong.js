const controller = require('../controllers/OngController');

class OngApi {
    async criarOng(req, res) {
        await controller.criarOng(req, res);
    }

    async login(req, res) {
        await controller.login(req, res);
    }
}

module.exports = new OngApi();