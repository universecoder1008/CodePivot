const express = require("express");
const router = express.Router();

const { submitMock, getDSACoreRound } = require("../controllers/mockController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dsa-core", authMiddleware, getDSACoreRound);
router.post("/submit", authMiddleware, submitMock);

module.exports = router;