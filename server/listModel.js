import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBMjmJqhiJ5eGwSuqi-AMNFtlT3I0X1t6Y",
});

async function listModels() {
  try {
    const response = await ai.models.list();

    console.log(response); // 🔍 debug

    // ✅ correct way
    const models = response.models;

    for (const model of models) {
      console.log(model.name);
    }

  } catch (error) {
    console.error(error);
  }
}

listModels();