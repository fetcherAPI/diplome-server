import jwt from "jsonwebtoken";

export const generateJwt = (usefullData, key, lifeLimitWithDays) => {
  const token = jwt.sign(
    {
      ...usefullData,
    },
    key,
    {
      expiresIn: lifeLimitWithDays,
    }
  );

  return token;
};
