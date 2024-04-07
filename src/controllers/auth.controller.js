import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { enumRole } from "../enum/role.enum.js";
import { generateTokenJWT } from "../utils/generateTokenJWT.js";
import {
  encriptedPassword,
  verifiedPassword,
} from "../utils/hashingPassword.js";

//TODO: metodo para registrar User por parte de los usuarios
const signUp = async (req, res) => {
  try {
    const { email, password, roles } = req.body;

    //TODO:atencion puede ser que roles venga vacio si el usuario es"user"

    const newUser = new User({
      email,
      password: await encriptedPassword(password),
    });

    // checking for roles
    if (roles) {
      //si el rol existe busca el rol dentro del array roles y los agrega
      //TODO: podria incluir mas de un rol => admin y moderator
      const foundRoles = await Role.find({ nameRole: { $in: roles } });
      //agrego roles al newUser
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      //si el role no existe le agrega un rol de tipo user
      const role = await Role.findOne({ nameRole: enumRole.USER });
      //agrego roles al newUser
      newUser.roles = [role._id];
    }

    // guardamos el nnuevo user object
    const savedUser = await newUser.save();

    ////////////////generate Token/////////////////

    //============new user=======================
    const userToken = {
      id: savedUser._id,
      email: savedUser.email,
      roles: savedUser.roles.map((i) => i.nameRole), //me guarda el nombre del rol , no el id
    };

    const token = generateTokenJWT(userToken);
    // console.log(token);
    /* 
    el cliente puede optar por almacenar este token en el localStorage 
    o en una cookie si lo desea.
    */
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const signIn = async (req, res) => {
  //esto recibe un body
  const { email, password } = req.body;

  // Verify if exist user
  const userByEmailFound = await User.findOne({ email }).populate(
    "roles",
    "nameRole"
  );
  if (!userByEmailFound) {
    return res.status(401).json({
      message: "credential incorrect",
    });
  }
  // Verify password

  let matchPassword = await verifiedPassword(
    password,
    userByEmailFound.password
  );

  if (!matchPassword) {
    return res.status(401).json({
      message: "credential incorrect",
    });
  }

  const userToken = {
    id: userByEmailFound._id,
    email: userByEmailFound.email,
    roles: userByEmailFound.roles.map((i) => i.nameRole),
  };

  let token = await generateTokenJWT(userToken);
  // console.log(token);
  return res.json(token);
};

export default {
  signUp,
  signIn,
};
