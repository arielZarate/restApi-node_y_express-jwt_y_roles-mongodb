import jwt from "jsonwebtoken";

////////////////GENERATE TOKEN WITH JWT/////////////
export const generateTokenJWT = async (object) => {
  // console.log("time: \n", Math.floor(expirationDate.getTime() / 1000));
  const token = jwt.sign({ object }, process.env.SECRET_KEY, {
    //expiresIn: "1d",
    //expiresIn: "1d",
    //expiresIn: 3600, //1 hora enmn sg

    expiresIn: 4, //1 hora
  });

  if (!token) {
    console.log("Error in generate token");
  }

  return token;
};
