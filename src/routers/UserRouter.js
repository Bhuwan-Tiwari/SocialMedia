const express = require("express");
const router = express.Router();
const upload = require("../middlewares.js/upload");
const { submitUserData, getAllUsers } = require("../controllers/UserController");

router.post("/submit", upload.array("images"), submitUserData);
router.get("/users", getAllUsers);

module.exports = router;
