import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { encriptedPassword } from "../utils/hashingPassword.bcryp.js";
import { enumRole } from "../enum/role.enum.js";
//===========================

//============conttroller============7

//========================================
//TODO: esta ruta getUser trae todos y ademas
//por query => http://localhost:3000/api/users?email=arieltecnico@gmail.com
//========================================
//========================================

const getUser = async (req, res) => {
  //TODO:tener en cuenta que estoy desctructurando el email por query
  const { email } = req.query;

  //TODO: 2opcion
  //const email=req.query.body;      //aca no estoy destructurando
  try {
    if (!email) {
      const users = await User.find({}).populate("roles", "nameRole");
      if (!users) {
        return res.status(404).json("Users Not found");
      }

      return res.json(users);
    } else {
      const userByEmail = await User.findOne({ email });
      if (!userByEmail) return res.status(404).json("User By Email Not found");

      return res.json(userByEmail);
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

//================================================
const createUser = async (req, res) => {
  const { email, password, roles } = req.body;
  //console.log(body);

  try {
    let auxUser = new User({
      email,
      password: await encriptedPassword(password), //,method hashing
    });

    if (roles) {
      //si el rol existe busca el rol dentro del array roles y los agrega
      //TODO: podria incluir mas de un rol => admin y moderator
      const foundRoles = await Role.find({ nameRole: { $in: roles } });
      //agrego roles al newUser
      auxUser.roles = foundRoles.map((role) => role._id);
    } else {
      //if role not exist create role enum.user
      const role = await Role.findOne({ nameRole: enumRole.USER });
      auxUser.roles = [role._id];
    }

    const newUser = await auxUser.save();

    if (!newUser) {
      return res.status(500).json({ error: "Error 500 server" });
    }
    console.log("SE CREO EL USER ");
    return res.json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

//delete
const deleteUser = async (req, res) => {
  let id = req.params.id;

  try {
    if (!id) {
      throw new Error("id not found");
    } else {
      const userDeleted = await User.findByIdAndDelete({ _id: id });

      if (!userDeleted) {
        return res
          .status(500)
          .json({ error: "user Not deleted ", status: 400 });
      }
      return res.json(userDeleted);
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

//update
const updateUser = async (req, res) => {
  let id = req.params.id;
  let body = req.body;

  //console.log("id:", id, "body:", body);

  try {
    const userUpdate = await User.findByIdAndUpdate(id, body, { new: true });

    if (!userUpdate) {
      return res.status(500).json({ error: "user Not updated ", status: 400 });
    }
    return res.json(userUpdate);
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};

//userByID
const getUserById = async (req, res) => {
  let { id } = req.params;
  //////// console.log(id);
  try {
    let userId = await User.findById(id);
    if (!userId) {
      return res.status(404).json("Users Not found");
    }

    return res.json(userId);
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message });
  }
};
export default {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
};
