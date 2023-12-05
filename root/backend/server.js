const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Banco sincronizado.");
  })
  .catch((err) => {
    console.log("Falha na sincronização do banco: " + err.message);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Teste conexão banco." });
});

require("./routes/fornecedores.routes")(app);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Servidor conectado na porta: ${PORT}.`);
});