const express = require("express");
const router = express.Router();

const { getProblems } = require("../controllers/problemController");

router.get("/problems", getProblems);

module.exports = router;