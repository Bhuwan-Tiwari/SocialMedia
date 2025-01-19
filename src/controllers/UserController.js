const User = require("../models/User");
const s3 = require("../config/awsConfig");

const submitUserData = async (req, res) => {
  try {
    const imageUrls = [];
    for (const file of req.files) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      const uploadResult = await s3.upload(params).promise();
      imageUrls.push(uploadResult.Location);
    }

    const newUser = new User({
      name: req.body.name,
      socialMediaHandle: req.body.socialMediaHandle,
      images: imageUrls,
    });

    await newUser.save();
    res.status(201).json({ message: "User data submitted successfully!" });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Error uploading images or saving data" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = { submitUserData, getAllUsers };
