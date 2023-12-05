const db = require("../models");
const Fornecedores = db.fornecedores;
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({
            message: "Confira os conteúdos dos campos!"
        });
        return;
    }

    const fornecedor = {
        nome: req.body.nome,
        email: req.body.email,
        tipo_fornecedor: req.body.tipo_fornecedor,
        telefone: req.body.telefone,
        observacao: req.body.observacao
    };
    console.log(fornecedor)
    Fornecedores.create(fornecedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu um erro na criação do novo fornecedor."
            });
        });
};

exports.findAll = (req, res) => {
        Fornecedores.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu um erro na consulta dos cadastros."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Fornecedores.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Fornecedor atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o fornecedor de código = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Ocorreu um erro na atualização dos fornecedor com código = ${id}.`
            });
        });
};

exports.delete = (req, res) => {
    //const id = req.params.id;
    const id = req.params.id.split(',');

    Fornecedores.destroy({
        where: { id:id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O(s) fornecedor(es) foi/foram deletado(s)!"
                });
            } else {
                res.send({
                    message: `Não foi possível deletar o(s) fornecedor(es) de id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Não foi possível deletar o(s) fornecedor(es) de id = ${id}.`
            });
        });
};