import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config(); //configuro el archivo.env
const app = express();

// Settings
//app.set("port", 3001);
app.set("json spaces", 4);
app.use(cors()); //cors
app.use(helmet());
app.use(morgan("dev")); //esta archivo sirve para poder mostrar las request por consola
app.use(express.json()); //sirve para que express me reconosca el formato json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//=============ROUTES===============
import indexRouter from "./routes/index.routes.js";

app.use("/api", indexRouter);

//ruta get bienvenida

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my  API",
    name: "Api jwt",
    version: "1.0.0",
    description: "esta es una api con node -express -jwt-mongodb",
    author: "Ariel zarate developer",
  });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //res.status(404).json("page not found");
  //TODO: podes redirigir a esta pagine
  res.redirect("https://http.cat/status/404");
});

export default app;
