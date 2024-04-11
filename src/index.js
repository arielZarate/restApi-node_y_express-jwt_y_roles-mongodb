import app from "./app.js";
import createRoles from "./utils/initialize.SchemaRole.js";
import dbConnect from "./utils/mongooseConection.js";

async function ExecuteServer() {
  await dbConnect();
  // Crea los roles si aún no existen
  await createRoles();
  app.listen(process.env.PORT, () => {
    console.log(`lsistening in port ${process.env.PORT}`);
  });
}

//ejecutamos la funcion
ExecuteServer();
