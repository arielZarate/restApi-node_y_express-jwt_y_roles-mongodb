import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config(); //configuro el archivo.env
const app = express();

// Settings
app.set("port", 3000);
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

app.use("/", (req, res) => {
  res.json({
    message: "Welcome to my  API",
    name: "Api jwt",
    version: "1.0.0",
    description: "esta es una api con node -express -jwt-mongodb",
    author: "Ariel zarate developer",
  });
});

export default app;
