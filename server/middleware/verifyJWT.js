import jwt from "jsonwebtoken";

//this middleware will be used in chat page and order page
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization?.split(" ")[0];

  if (authHeader !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    next();
  });
};
