const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.askAI = async (message) => {

  try {

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "content: You are an expert DSA mentor helping students prepare for coding interviews. Explain concepts clearly and give examples."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.error("Groq error:", error);
    return "Sorry, I couldn't generate a response.";

  }

};