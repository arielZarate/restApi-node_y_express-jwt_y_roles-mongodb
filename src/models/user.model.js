import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "the email is required"],
      unique: true,
      // unique: [true, "el emial debe ser unico"], // Asegura que cada correo electrónico sea único en la base de datos

      //minlength: [7, "email must be at least 7 characters long"],
      //maxlength: [25, "email cannot exceed 25 characters"],
      /*       match: [
        //[/^\S+@\S+\.\S+$/
        ///^(?=.*[a-zA-Z0-9._%+-]+@(hotmail|gmail)\.com$).
        /^(?=.*[a-zA-Z0-9._%+-]+@(hotmail|gmail)\.com$)(^\S+@\S+\.\S+$)/,
        "email must be  de Hotmail o Gmail",
      ], */
    },

    password: {
      type: String,
      required: [true, "the password is required"],
      minlength: [10, "Password must be at least 10 characters long"],
      maxlength: [70, "Password cannot exceed 70 characters"],
    },

    //=======Role==============
    roles:
      //array de roles definido
      [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role", //referencia al modelo Role
        },
      ],
    //===============

    //====Datos extras para completar en el perfil================
    //TODO: no son obligatorios en el registro por eso no son required:true

    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    cuil: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      number: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    collection: "User", //fuerza el nombre de la creacion de la bd como esta descripto
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
