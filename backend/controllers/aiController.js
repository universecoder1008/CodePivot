const aiService = require("../services/aiService");

exports.askAI = async (req, res) => {

  try {

    const { message } = req.body;

    const reply = await aiService.askAI(message);

    res.json({
      reply
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI request failed"
    });

  }

};