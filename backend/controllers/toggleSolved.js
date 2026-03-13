const userModel = require("../models/userModel");

module.exports.toggleSolved = async (req, res) => {
  try {

    const { problemId } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySolved = user.solvedProblems.includes(problemId);

    if (alreadySolved) {

      // REMOVE solved problem
      user.solvedProblems = user.solvedProblems.filter(
        (id) => id.toString() !== problemId
      );

    } else {

      // ADD solved problem
      user.solvedProblems.push(problemId);

      // ---- STREAK LOGIC ----
      const today = new Date();
      const lastSolved = user.lastSolvedDate;

      if (!lastSolved) {
        user.streak = 1;
      } else {

        const diffTime = today - new Date(lastSolved);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          user.streak += 1;
        } else if (diffDays > 1) {
          user.streak = 1;
        }
      }

      user.lastSolvedDate = today;
    }

    await user.save();

    res.json({
      solvedProblems: user.solvedProblems,
      streak: user.streak
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};