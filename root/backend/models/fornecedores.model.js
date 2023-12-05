module.exports = (sequelize, Sequelize) => {
    const Fornecedores = sequelize.define("t_fornecedores", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
            len: [1,45],
            validate: {
                notNull: { msg: "Nome é um campo obrigatório!" },
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            len: [1,45],
            validate: {
                notNull: { msg: "E-mail é um campo obrigatório!" },
            }
        },
        tipo_fornecedor: {
            type: Sequelize.STRING,
            allowNull: false,
            len: [1,20],
            validate: {
                notNull: { msg: "Tipo de fornecedor é um campo obrigatório!" },
            }
        },
        telefone: {
            type: Sequelize.STRING,
            allowNull: false,
            len: [1,45],
            validate: {
                notNull: { msg: "Telefone é um campo obrigatório!" },
            }
        },
        observacao: {
            type: Sequelize.STRING,
            allowNull: true,
            len: [1,200]
        }
    });
  
    return Fornecedores;
};