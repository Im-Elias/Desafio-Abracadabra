import express from "express";
import path from "path";

const app = express();
const port = 3000;

//Static assets
const __dirname = path.resolve();
app.use(express.static("assets"));
const usuarios = {
  usuarios: ["juan", "Pedro", "Maria", "Jose", "Ana", "Carlos", "Lucia"],
};

//Server start
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);

//Middlewares
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const user = req.params.usuario.toLowerCase();
  const authorized = usuarios.usuarios.find(
    (usr) => user === usr.toLowerCase()
  );
  if (authorized) {
    next();
  } else {
    res.sendFile(`${__dirname}/assets/who.jpeg`);
  }
});

//Routes
app.get("/abracadabra/usuarios", (req, res) => {
  res.json({
    usuarios,
  });
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/abracadabra/conejo/:n", (req, res) => {
  const azar = Math.floor(Math.random() * 4 + 1);
  if (req.params.n == azar) {
    res.sendFile(__dirname + "/assets/conejito.jpg");
  } else {
    res.sendFile(`${__dirname}/assets/voldemort.jpg`);
  }
});

app.get("*", (req, res) => {
  res.send("Esta página no existe...");
});
