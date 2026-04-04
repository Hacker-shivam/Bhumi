import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const cropRouter = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

cropRouter.post("/crop-plan", async (req, res) => {
  try {
    const { crop } = req.body;
    console.log("Crop received:", crop);

    if (!crop) {
      return res.status(400).json({ error: "Crop name is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash", // ✅ correct with latest SDK
    });


   const prompt = `
You are an expert agriculture advisor in India.

Create a COMPLETE and PRACTICAL farming roadmap for growing ${crop}.

IMPORTANT:
- Focus ONLY on ${crop}
- Use exact numbers, practical details, and local context
- Do NOT use bullet points like *, •, or any special characters
- Output should be clean, readable, and structured for a premium UI
- Include emojis only where meaningful: 🌱 for soil, 💧 for water, 🧪 for fertilizer
- Keep spacing and indentation neat

FORMAT:

Step 1: Land Preparation
Soil type:
Ideal pH:
Ploughing:
Add:

Step 2: Climate & Season
Temperature:
Rainfall:
Sowing months:

Step 3: Sowing
Seed rate:
Spacing:
Depth:

Step 4: Irrigation
First irrigation:
Frequency:
Water requirement:

Step 5: Fertilizer Plan
NPK:
Application timing:

Step 6: Pest & Disease
Common pests:
Treatment:

Step 7: Harvesting
Days:
Yield:
Signs:

Keep each step concise, professional, and visually appealing for display in a React premium UI timeline.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      roadmap: text,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default cropRouter;