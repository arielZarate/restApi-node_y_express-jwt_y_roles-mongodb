import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { enumRole } from "../enum/role.enum.js";
import { generateTokenJWT } from "../utils/generateTokenJWT.js";
import {
  encriptedPassword,
  comparePassword,
} from "../utils/hashingPassword.bcryp.js";

////////////TODO: METODO SIGNUP///////////////////////////////
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
      roles: savedUser.roles, //me guarda el nombre del rol , no el id
    };

    //await sin o si sino no lo puede generar
    const token = await generateTokenJWT(userToken);
    // console.log(token);
    /* 
    el cliente puede optar por almacenar este token en el localStorage 
    o en una cookie si lo desea.
    */
    return res.status(200).json(token);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const signIn = async (req, res) => {
  //esto recibe un body
  const { email, password } = req.body;

  // Verify if exist user
  const userByEmailFound = await User.findOne({ email }).populate("roles");
  if (!userByEmailFound) {
    return res.status(401).json({
      message:
        "Sorry, your login credentials are incorrect. Please check your username and password and try again",
    });
  }
  // Verify password

  const matchPassword = await comparePassword(
    password,
    userByEmailFound.password
  );

  if (!matchPassword) {
    return res.status(401).json({
      message:
        "Sorry, your login credentials are incorrect. Please check your username and password and try again",
    });
  }
  // else {
  const userToken = {
    id: userByEmailFound._id,
    email: userByEmailFound.email,
    roles: userByEmailFound.roles,
  };

  let token = await generateTokenJWT(userToken);

  return res.json({ token });
  // }
};

export default {
  signUp,
  signIn,
};
