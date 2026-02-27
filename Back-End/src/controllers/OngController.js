const Ong = require('../models/ong');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_para_ongs'; // Use uma chave diferente se quiser

class OngController {

    async criarOng(req, res) {
        const { nomeDaOng, cnpj, telefone, logradouro, cidade, estado, areaDeAtuacao, email, password } = req.body;

        try {
            if (!nomeDaOng || !cnpj || !telefone || !logradouro || !cidade || !estado || !areaDeAtuacao || !email || !password) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const ongExists = await Ong.findOne({ where: { email } });
            if (ongExists) {
                return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
            }

            const cnpjExists = await Ong.findOne({ where: { cnpj } });
            if (cnpjExists) {
                return res.status(409).json({ message: 'Este CNPJ já está cadastrado.' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const ong = await Ong.create({
                nomeDaOng,
                cnpj,
                telefone,
                logradouro,
                cidade,
                estado,
                areaDeAtuacao,
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "ONG cadastrada com sucesso!",
                ongId: ong.id
            });

        } catch (error) {
            console.error('Erro ao cadastrar ONG:', error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios' });
            }

            const ong = await Ong.findOne({ where: { email } });
            if (!ong) {
                return res.status(404).json({ message: 'ONG não encontrada' });
            }

            const isPasswordValid = await bcrypt.compare(password, ong.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign({ id: ong.id, email: ong.email, type: 'ong' }, JWT_SECRET_KEY, { expiresIn: '1h' });
            
            return res.status(200).json({ token });

        } catch (error) {
            console.error('Erro no login da ONG:', error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}

module.exports = new OngController();