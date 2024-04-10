import bcrypt from "bcrypt";

/////////////////metodos hashing////////////
export const encriptedPassword = async (password) => {
  try {
    let salto = await bcrypt.genSalt(10);
    const passwordEncripted = await bcrypt.hash(password, salto);
    return passwordEncripted;
  } catch (error) {
    console.error("Error password not  verified :", error.message);
    return false;
  }
};

export const comparePassword = async (password, passwordHash) => {
  try {
    // Comparar la contraseña ingresada con la contraseña hasheada almacenada
    const verified = await bcrypt.compare(password, passwordHash);
    //console.log(verified);
    return verified;
  } catch (error) {
    console.error("Error password not  verified :", error.message);
    return false;
  }
};
