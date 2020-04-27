import jwt from "jsonwebtoken";

const getUser = (token) => {
  if (!token) return null;
  const parseToken = token.split(" ")[1];
  try {
    const decodedToken = jwt.verify(parseToken, process.env.SECRET);
    return decodedToken.userId;
  } catch (err) {
    return null;
  }
};

export default getUser;
