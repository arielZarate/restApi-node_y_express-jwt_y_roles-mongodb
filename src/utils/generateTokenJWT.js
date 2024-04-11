import jwt from "jsonwebtoken";

////////////////GENERATE TOKEN WITH JWT/////////////
export const generateTokenJWT = async (object) => {
  // console.log("time: \n", Math.floor(expirationDate.getTime() / 1000));
  const token = jwt.sign({ object }, process.env.SECRET_KEY, {
    //expiresIn: "1d",
    //expiresIn: "1d",
    //expiresIn: 3600, //1 hora enmn sg

    expiresIn: 900, // TODO:  900sg son 15 min, seria un token de banco por el time
  });

  if (!token) {
    console.log("Error in generate token");
  }

  return token;
};
