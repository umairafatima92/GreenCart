//update user cart data : /api/cart/update

import Users from "../models/Users.js";

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    await Users.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
