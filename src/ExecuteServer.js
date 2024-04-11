import app from "./app.js";
import createRoles from "./utils/initialize.SchemaRole.js";
import dbConnect from "./utils/mongooseConection.js";

export async function ExecuteServer() {
  await dbConnect();
  // Crea los roles si aún no existen
  await createRoles();
  app.listen(process.env.PORT, () => {});
}
