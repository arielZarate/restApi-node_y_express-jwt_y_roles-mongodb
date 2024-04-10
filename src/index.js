import app from "./app.js";
import createRoles from "./utils/initialize.SchemaRole.js";
import dbConnect from "./utils/mongooseConection.js";

async function ExecuteServer() {
  await dbConnect();
  // Crea los roles si aún no existen
  await createRoles();
  app.listen(3000, () => {
    console.log("server listening in port 3000");
  });
}

//ejecutamos la funcion
ExecuteServer();
