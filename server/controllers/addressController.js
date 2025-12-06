import Address from "../models/Address.js"; 

// Add Address : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addressData = req.body;

    const {
      firstName,
      lastName,
      street,
      email,
      city,
      state,
      zipCode,
      country,
      phone,
    } = addressData;

    const newAddress = await Address.create({
      userId,
      firstName,
      lastName,
      street,
      email,
      city,
      state,
      zipCode,
      country,
      phone,
    });

    res.json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Address : /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; 

    const addresses = await Address.find({ userId });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default addAddress;
