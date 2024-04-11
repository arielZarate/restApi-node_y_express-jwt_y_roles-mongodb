import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { enumRole } from "../enum/role.enum.js";

/////////////////MIDDLEWARE PARA LOS ROLES////////////////////
export const isModerator = async (req, res, next) => {
  try {
    //TODO: userId es el id que guarde en req
    const user = await User.findById(req.userId);
    //trae todo los roles
    const roles = await Role.find({ _id: { $in: user.roles } });

    //recorro el array de roles , puede tener un maximo de 3 usuarios
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].nameRole === enumRole.MODERATOR) {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].nameRole === enumRole.ADMIN) {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

//esta funcion es mas generica valida mas de un role , los roles deben ser pasados por parametros

export const hasRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const userRoles = await Role.find({ _id: { $in: user.roles } });

      // Verifica si el usuario tiene al menos uno de los roles especificados
      for (let i = 0; i < userRoles.length; i++) {
        if (roles.includes(userRoles[i].nameRole)) {
          next(); // Si el usuario tiene uno de los roles especificados, permite el acceso
          return;
        }
      }

      // Si el usuario no tiene ninguno de los roles especificados, devuelve un error
      return res
        .status(403)
        .json({ message: "Require Admin or Moderator Role!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  };
};
