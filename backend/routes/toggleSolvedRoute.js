const express = require("express");
const router = express.Router();
const { toggleSolved } = require("../controllers/problemController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/toggle", authMiddleware, toggleSolved);

module.exports = router;