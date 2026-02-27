const express = require('express');
const router = express.Router();

const ongApi = require('../API/ong');

router.post('/ongs/login', ongApi.login);
router.post('/ongs', ongApi.criarOng);

module.exports = router;