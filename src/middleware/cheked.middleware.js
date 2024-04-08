import { enumRole } from "../enum/role.enum.js";

/* 
///////////////NO NECESITO VERIFICAR POR USERNAME PORQUE NO LO TENGO EN MODELO/////////////////////


export const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ username: req.body.username });
    if (userFound)
      return res.status(400).json({ message: "The user already exists" });

    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

////////////CHECKING ROLE////////////////////////

//NO LO USARE PERO SI ESTARIA BUENO INPLEMENTARLO Y SACAR
// LA VERIFICACION DE SI EXISTE ROLES EN EL SIGNUP Y SIGNIN

const ROLES = [enumRole.ADMIN, enumRole.MODERATOR, enumRole.USER];

export const checkExistingRole = (req, res, next) => {
  const arrayRoles = req.body.roles.find();

  if (!req.body.roles)
    return res.status(400).json({ message: "roles not found" });

  for (let i = 0; i < arrayRoles.length; i++) {
    if (!ROLES.includes(arrayRoles[i])) {
      return res.status(400).json({
        message: `Role ${arrayRoles[i]} does not exist`,
      });
    }
  }

  next();
};
