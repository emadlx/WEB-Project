import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// used next here to make sure that updateProfile not called unless the user is authenticated 
export const protectRoute = async(req, res, next) => {
    
    try {
    const token = req.cookies.jwt;

        if (!token) {
            return res
            .status(401)
            .json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

    // Retrieve the user by ID and exclude the password field from the result
    // Exclude `password` so it’s never sent back in the JSON response

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next(); // after validate every possible error now we make sure that the user is authenticated to reach "Update profile" < this next will allow updateProfile to be called
  } catch (error) {
    console.log("Error in protectionRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
}