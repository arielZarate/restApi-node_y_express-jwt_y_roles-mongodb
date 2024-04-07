import jwt from "jsonwebtoken";

////////////////GENERATE TOKEN WITH JWT/////////////
export const generateTokenJWT = async (object) => {
  // Definir la duración del token (por ejemplo, 1 hora)
  const expiresIn = 3600; // en segundos

  // Calcular la fecha de expiración
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);

  const token = jwt.sign({ object }, process.env.SECRET_KEY, {
    //expiresIn: "1d",
    //expiresIn: "1d",
    //expiresIn: 3600, //1 hora enmn sg
    expiresIn: Math.floor(expirationDate.getTime() / 1000), //paso el tiempo a milisegundos
  });

  if (!token) {
    console.log("Error in generate token");
  }

  return token;
};
