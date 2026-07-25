import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Assistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

  // Function to ask Gemini
  const askAI = async () => {
    if (question.trim() === "") {
      alert("Please enter your question.");
      return;
    }

    try {
      setLoading(true);
      setAskedQuestion(question);

      const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash",
      });

      const prompt = `
You are BhumiMitra AI Assistant, an AI assistant specifically designed
to help users with Karnataka land records.

Answer questions in the context of:
- RTC (Record of Rights, Tenancy and Crops)
- Pahani
- Mutation
- Survey Numbers
- Land Ownership
- Survey Maps
- Karnataka land records

If the user asks about "RTC", always interpret it as
"Record of Rights, Tenancy and Crops" unless they clearly specify another meaning.

If the user asks about "Pahani", explain it in the context of
Karnataka agricultural land records.

If the user asks about "Mutation", explain it in the context of
updating land ownership records in Karnataka.

Give short, simple and clear answers.
Keep answers concise and easy to understand.
For simple questions, answer in 2 to 4 sentences.
For complex questions, use short bullet points.
Do not start every response with "Namaste" or introduce yourself.
Use bullet points when helpful.
Avoid unnecessary details unless the user asks for more information.

User Question:
${question}
`;

      const result = await model.generateContent(prompt);

      const response = result.response.text();

      setAnswer(response);
    } catch (error) {
      console.error("Gemini Error:", error);

      setAnswer(
        "Sorry, something went wrong while connecting to the AI Assistant. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear chat
  const clearChat = () => {
    setQuestion("");
    setAskedQuestion("");
    setAnswer("");
  };

  return (
    <section className="feature-page">

      <h1>AI Assistant</h1>

      <p>
        Ask any question related to Karnataka land records.
      </p>

      {/* Input */}

      <div className="assistant-input">

        <input
          type="text"
          placeholder="Ask about land records..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              askAI();
            }
          }}
        />

        <button
          onClick={askAI}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

      </div>

      {/* AI Response */}

      {answer && (
        <div className="assistant-answer">

          {/* User Question */}

          <div className="user-question">

            <h2>👤 You</h2>

            <p>
              {askedQuestion}
            </p>

          </div>

          {/* AI Answer */}

          <div className="ai-response">

            <h2>🤖 AI Assistant</h2>

            <p>
              {answer}
            </p>

          </div>

          {/* Clear Button */}

          <button
            onClick={clearChat}
          >
            Clear
          </button>

        </div>
      )}

    </section>
  );
}

export default Assistant;