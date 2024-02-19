import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // Log the received token for debugging
  console.log("Received Token:", token);

  if (token) {
    // Verify the token using the "secret" key
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.error("Token Verification Error:", err);
        return res.sendStatus(403); // Token verification failed
      }

      // Token is valid, proceed to the next middleware or route
      next();
    });
  } else {
    console.log("Token not provided");
    res.sendStatus(401); // Token not provided
  }
};
