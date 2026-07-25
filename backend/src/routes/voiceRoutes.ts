import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// ==========================================
// LANGUAGE NAMES
// ==========================================

const languageNames: Record<string, string> = {
  "en-IN": "English",
  "hi-IN": "Hindi",
  "kn-IN": "Kannada",
  "te-IN": "Telugu",
  "ta-IN": "Tamil",
};

// ==========================================
// VOICE AI QUESTION
// ==========================================

router.post(
  "/ask",
  async (req, res) => {
    try {

      console.log(
        "\n===================================="
      );

      console.log(
        "🎤 VOICE API REQUEST RECEIVED"
      );

      console.log(
        "===================================="
      );

      // ==========================================
      // GET DATA
      // ==========================================

      const {
        question,
        language,
      } = req.body;

      console.log(
        "Question:",
        question
      );

      console.log(
        "Language:",
        language
      );

      // ==========================================
      // VALIDATE QUESTION
      // ==========================================

      if (
        !question ||
        typeof question !== "string" ||
        question.trim() === ""
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Please provide a valid question.",
        });

      }

      // ==========================================
      // CHECK API KEY
      // ==========================================

      const apiKey =
        process.env.GEMINI_API_KEY;

      if (!apiKey) {

        console.error(
          "❌ GEMINI_API_KEY IS MISSING"
        );

        return res.status(500).json({
          success: false,
          message:
            "GEMINI_API_KEY is missing in the backend .env file.",
        });

      }

      console.log(
        "✅ Gemini API Key Found"
      );

      // ==========================================
      // CREATE GEMINI CLIENT
      // ==========================================

      const genAI =
        new GoogleGenerativeAI(
          apiKey
        );

      // ==========================================
      // GET LANGUAGE
      // ==========================================

      const selectedLanguage =
        languageNames[language] ||
        "English";

      console.log(
        "Selected Language:",
        selectedLanguage
      );

      // ==========================================
      // CREATE MODEL
      // ==========================================

      const model =
        genAI.getGenerativeModel({
          model:
            "gemini-3.5-flash",
        });

      console.log(
        "✅ Gemini Model Created"
      );

      // ==========================================
      // PROMPT
      // ==========================================

      const prompt = `
You are BhumiMitra AI Assistant.

You help users with Karnataka land records.

The user's selected language is:

${selectedLanguage}

Answer ONLY in ${selectedLanguage}.

Topics you can help with:

- RTC
- Pahani
- Mutation
- Survey Numbers
- Land Ownership
- Survey Maps
- Karnataka Land Records
- Land Registration
- Property Documents
- Bhoomi Land Records

If the user asks about RTC, interpret RTC as
Record of Rights, Tenancy and Crops.

Give a short, simple answer.

Keep the response between 3 and 6 sentences.

Use language that is easy to understand when spoken aloud.

Do not use tables.

Do not use unnecessary markdown.

Do not unnecessarily mix English with the selected language.

User Question:

${question}
`;

      console.log(
        "📤 Sending question to Gemini..."
      );

      // ==========================================
      // CALL GEMINI
      // ==========================================

      const result =
        await model.generateContent(
          prompt
        );

      console.log(
        "✅ Gemini Response Received"
      );

      // ==========================================
      // GET ANSWER
      // ==========================================

      const answer =
        result.response.text();

      console.log(
        "Gemini Answer:",
        answer
      );

      // ==========================================
      // VALIDATE ANSWER
      // ==========================================

      if (
        !answer ||
        answer.trim() === ""
      ) {

        throw new Error(
          "Gemini returned an empty response."
        );

      }

      // ==========================================
      // SEND RESPONSE
      // ==========================================

      return res.status(200).json({

        success: true,

        answer: answer,

      });

    } catch (error: any) {

      // ==========================================
      // PRINT FULL ERROR
      // ==========================================

      console.error(
        "\n===================================="
      );

      console.error(
        "❌ GEMINI VOICE API ERROR"
      );

      console.error(
        "===================================="
      );

      console.error(
        "Error:",
        error
      );

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "Stack:",
        error?.stack
      );

      console.error(
        "====================================\n"
      );

      // ==========================================
      // SEND ACTUAL ERROR TO FRONTEND
      // ==========================================

      return res.status(500).json({

        success: false,

        message:
          error?.message ||
          "Something went wrong while processing your voice question.",

      });

    }
  }
);

export default router;