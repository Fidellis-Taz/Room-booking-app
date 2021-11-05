import expressJwt from "express-jwt";

//it gives the user in req.user
export const requireSignin = expressJwt({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//to delete hotel u need this middlware
export const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};






