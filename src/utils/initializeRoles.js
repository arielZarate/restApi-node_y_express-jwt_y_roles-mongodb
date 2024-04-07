import Role from "../models/role.model.js";
import { enumRole } from "../enum/role.enum.js";
//TODO: ESta funcion crea un array de roles cuando inicia la app
// solo los crea unavez
async function createRoles() {
  try {
    const count = await Role.estimatedDocumentCount(); // Usamos estimatedDocumentCount() en lugar de countDocuments()

    //console.log(count);
    if (count === 0) {
      /* 

otra forma de crear los roles seria asi 
    await Role.create([
      { name: 'admin' },
      { name: 'user' },
      { name: 'moderator' },
    ]);


*/

      const roles = await Promise.all([
        //recibe un objeto name:con el valor la constante enum
        await new Role({ nameRole: enumRole.USER }).save(),
        await new Role({ nameRole: enumRole.MODERATOR }).save(),
        await new Role({ nameRole: enumRole.ADMIN }).save(),
      ]);

      console.log(roles);
    }
  } catch (error) {
    console.error(error.message);
  }
}

export default createRoles;
