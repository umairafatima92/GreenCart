import Address from "../models/Address.js"; 

// Add Address : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;

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
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !street || !email || !city || !state || !zipCode || !country || !phone) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

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

// Update Address : /api/address/update/:id
export const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

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
    } = req.body;

    // Find address and verify ownership
    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.json({
        success: false,
        message: "Address not found or unauthorized"
      });
    }

    // Update address
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        street,
        email,
        city,
        state,
        zipCode,
        country,
        phone,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Delete Address : /api/address/delete/:id
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Find address and verify ownership
    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.json({
        success: false,
        message: "Address not found or unauthorized"
      });
    }

    await Address.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addAddress as default };