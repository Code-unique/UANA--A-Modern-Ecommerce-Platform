import Chat from "../models/chatModel.js"; // Adjust the path if needed

export const getChatbotResponse = async (req, res) => {
  try {
    const { participants, messages } = req.body;

    // Create a new chat document
    const chat = new Chat({ participants, messages });

    // Save the chat document to the database
    await chat.save();

    res.status(201).json(chat); // Respond with the saved chat document
  } catch (error) {
    console.error("Error in getChatbotResponse:", error.message);
    res.status(400).json({ error: error.message });
  }
};
