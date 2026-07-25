import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface SavedDocument {
  id: number;
  name: string;
  type: string;
  size: number;
  date: string;
  url: string;
  extractedText: string;
  aiAnswer: string;
}

function OCR() {
  // ==========================================
  // FILE + OCR STATE
  // ==========================================

  const [file, setFile] =
    useState<File | null>(null);

  const [extractedText, setExtractedText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // AI ANALYSIS STATE
  // ==========================================

  const [aiAnswer, setAiAnswer] =
    useState("");

  const [aiLoading, setAiLoading] =
    useState(false);

  // ==========================================
  // DOCUMENT Q&A STATE
  // ==========================================

  const [documentQuestion, setDocumentQuestion] =
    useState("");

  const [documentAnswer, setDocumentAnswer] =
    useState("");

  const [questionLoading, setQuestionLoading] =
    useState(false);

  // ==========================================
  // DOCUMENT SAVED STATE
  // ==========================================

  const [documentSaved, setDocumentSaved] =
    useState(false);

  // ==========================================
  // GEMINI AI
  // ==========================================

  const genAI =
    new GoogleGenerativeAI(
      import.meta.env.VITE_GEMINI_API_KEY
    );

  // ==========================================
  // EXTRACT FIELD FROM OCR TEXT
  // ==========================================

  const extractField = (
    label: string
  ) => {
    if (!extractedText) {
      return "Not Available";
    }

    const regex = new RegExp(
      `${label}\\s*:?\\s*([^•\\n]+)`,
      "i"
    );

    const match =
      extractedText.match(regex);

    return match
      ? match[1].trim()
      : "Not Available";
  };

  // ==========================================
  // OCR BACKEND UPLOAD
  // ==========================================

  const extractTextFromDocument =
    async () => {
      // ----------------------------------------
      // CHECK FILE
      // ----------------------------------------

      if (!file) {
        alert(
          "Please select a document first."
        );

        return;
      }

      try {
        // --------------------------------------
        // START LOADING
        // --------------------------------------

        setLoading(true);

        setExtractedText("");

        setAiAnswer("");

        setDocumentAnswer("");

        setDocumentSaved(false);

        // --------------------------------------
        // CREATE FORM DATA
        // --------------------------------------

        const formData =
          new FormData();

        // IMPORTANT:
        // This MUST match:
        //
        // upload.single("document")
        //
        // in backend ocrRoutes.ts

        formData.append(
          "document",
          file
        );

        // --------------------------------------
        // SEND FILE TO BACKEND
        // --------------------------------------

        const response =
          await fetch(
            "http://localhost:5000/api/ocr/upload",
            {
              method: "POST",
              body: formData,
            }
          );

        // --------------------------------------
        // READ BACKEND RESPONSE
        // --------------------------------------

        const data =
          await response.json();

        console.log(
          "OCR Backend Response:",
          data
        );

        // --------------------------------------
        // CHECK HTTP ERROR
        // --------------------------------------

        if (!response.ok) {
          throw new Error(
            data.message ||
              "OCR processing failed."
          );
        }

        // --------------------------------------
        // CHECK BACKEND SUCCESS
        // --------------------------------------

        if (!data.success) {
          throw new Error(
            data.message ||
              "OCR processing failed."
          );
        }

        // --------------------------------------
        // GET EXTRACTED TEXT
        // --------------------------------------

        const text =
          data.extractedText || "";

        // --------------------------------------
        // CHECK IF TEXT EXISTS
        // --------------------------------------

        if (
          !text ||
          text.trim() === ""
        ) {
          setExtractedText(
            "No text could be extracted from this document."
          );

          return;
        }

        // --------------------------------------
        // SAVE EXTRACTED TEXT
        // --------------------------------------

        setExtractedText(
          text.trim()
        );

      } catch (error) {
        console.error(
          "OCR Upload Error:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Something went wrong while processing the document."
        );

      } finally {
        // --------------------------------------
        // STOP LOADING
        // --------------------------------------

        setLoading(false);
      }
    };

  // ==========================================
  // SAVE DOCUMENT TO MY DOCUMENTS
  // ==========================================

  const saveToMyDocuments =
    (
      analysis: string
    ) => {
      if (
        !file ||
        !extractedText
      ) {
        return;
      }

      try {
        // --------------------------------------
        // GET EXISTING DOCUMENTS
        // --------------------------------------

        const existingDocuments =
          JSON.parse(
            localStorage.getItem(
              "bhumiMitraDocuments"
            ) || "[]"
          );

        // --------------------------------------
        // CREATE TEMPORARY FILE URL
        // --------------------------------------

        const documentUrl =
          URL.createObjectURL(
            file
          );

        // --------------------------------------
        // CREATE DOCUMENT OBJECT
        // --------------------------------------

        const newDocument:
          SavedDocument = {
          id: Date.now(),

          name:
            file.name,

          type:
            file.type ||
            "application/octet-stream",

          size:
            file.size,

          date:
            new Date()
              .toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              ),

          url:
            documentUrl,

          extractedText:
            extractedText,

          aiAnswer:
            analysis,
        };

        // --------------------------------------
        // ADD NEW DOCUMENT
        // --------------------------------------

        const updatedDocuments =
          [
            ...existingDocuments,
            newDocument,
          ];

        // --------------------------------------
        // SAVE TO LOCAL STORAGE
        // --------------------------------------

        localStorage.setItem(
          "bhumiMitraDocuments",
          JSON.stringify(
            updatedDocuments
          )
        );

        setDocumentSaved(
          true
        );

        console.log(
          "Document saved to My Documents"
        );

      } catch (error) {
        console.error(
          "Error saving document:",
          error
        );

        alert(
          "Document analysis completed, but we could not save it to My Documents."
        );
      }
    };

  // ==========================================
  // ASK AI TO ANALYZE DOCUMENT
  // ==========================================

  const askAIAboutDocument =
    async () => {
      // ----------------------------------------
      // CHECK EXTRACTED TEXT
      // ----------------------------------------

      if (
        !extractedText ||
        extractedText.startsWith(
          "No text could be extracted"
        )
      ) {
        alert(
          "Please extract text from the document first."
        );

        return;
      }

      try {
        // --------------------------------------
        // START AI LOADING
        // --------------------------------------

        setAiLoading(
          true
        );

        setAiAnswer(
          ""
        );

        setDocumentSaved(
          false
        );

        // --------------------------------------
        // CREATE GEMINI MODEL
        // --------------------------------------

        const model =
          genAI.getGenerativeModel(
            {
              model:
                "gemini-2.5-flash",
            }
          );

        // --------------------------------------
        // AI PROMPT
        // --------------------------------------

        const prompt = `
You are BhumiMitra AI Assistant.

You are an AI assistant specifically designed
to help users understand Karnataka land records.

The following text was extracted from a land record
document uploaded by the user.

Analyze ONLY the information available in the document.

Explain the document in a simple and clear way.

Focus on:

- Owner name
- Survey number
- District
- Taluk
- Village
- Land area
- Soil type
- Land type
- Mutation status
- Water source
- Crop
- Document date

If information is missing, clearly say:

"Not mentioned in the document."

Do not invent or assume any information.

Give a short summary followed by important details.

DOCUMENT TEXT:

${extractedText}
`;

        // --------------------------------------
        // SEND TO GEMINI
        // --------------------------------------

        const result =
          await model.generateContent(
            prompt
          );

        // --------------------------------------
        // GET AI RESPONSE
        // --------------------------------------

        const response =
          result.response.text();

        // --------------------------------------
        // SHOW AI RESPONSE
        // --------------------------------------

        setAiAnswer(
          response
        );

        // --------------------------------------
        // SAVE DOCUMENT
        // --------------------------------------

        saveToMyDocuments(
          response
        );

      } catch (error) {
        console.error(
          "Gemini Document Analysis Error:",
          error
        );

        setAiAnswer(
          "Sorry, something went wrong while analyzing this document."
        );

      } finally {
        setAiLoading(
          false
        );
      }
    };

  // ==========================================
  // ASK QUESTION ABOUT DOCUMENT
  // ==========================================

  const askDocumentQuestion =
    async () => {
      // ----------------------------------------
      // CHECK QUESTION
      // ----------------------------------------

      if (
        documentQuestion.trim() === ""
      ) {
        alert(
          "Please enter a question."
        );

        return;
      }

      // ----------------------------------------
      // CHECK DOCUMENT
      // ----------------------------------------

      if (
        !extractedText ||
        extractedText.startsWith(
          "No text could be extracted"
        )
      ) {
        alert(
          "Please upload and extract a document first."
        );

        return;
      }

      try {
        // --------------------------------------
        // START QUESTION LOADING
        // --------------------------------------

        setQuestionLoading(
          true
        );

        setDocumentAnswer(
          ""
        );

        // --------------------------------------
        // CREATE GEMINI MODEL
        // --------------------------------------

        const model =
          genAI.getGenerativeModel(
            {
              model:
                "gemini-2.5-flash",
            }
          );

        // --------------------------------------
        // QUESTION PROMPT
        // --------------------------------------

        const prompt = `
You are BhumiMitra AI Assistant.

You help users understand Karnataka land records.

The user has uploaded a land record document.

Answer the user's question using ONLY
the information available in the document.

Do not invent information.

If the answer is not available in the document,
say:

"This information is not mentioned in the uploaded document."

Keep the answer simple and concise.

DOCUMENT:

${extractedText}

USER QUESTION:

${documentQuestion}
`;

        // --------------------------------------
        // ASK GEMINI
        // --------------------------------------

        const result =
          await model.generateContent(
            prompt
          );

        // --------------------------------------
        // GET RESPONSE
        // --------------------------------------

        const response =
          result.response.text();

        // --------------------------------------
        // SHOW ANSWER
        // --------------------------------------

        setDocumentAnswer(
          response
        );

      } catch (error) {
        console.error(
          "Document Q&A Error:",
          error
        );

        setDocumentAnswer(
          "Sorry, something went wrong while answering your question."
        );

      } finally {
        setQuestionLoading(
          false
        );
      }
    };

  // ==========================================
  // RETURN UI
  // ==========================================

  return (
    <section
      className="feature-page ocr-page"
    >

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="ocr-header">

        <h1>
          Document Intelligence
        </h1>

        <p>
          Upload your land document and let
          BhumiMitra extract and understand
          important information automatically.
        </p>

      </div>


      {/* ================================= */}
      {/* UPLOAD CARD */}
      {/* ================================= */}

      <div
        className="ocr-upload glass-card"
      >

        <div className="upload-icon">
          📄
        </div>

        <h2>
          Upload Land Document
        </h2>

        <p>
          Upload your RTC, Pahani or other
          land record document.
        </p>

        <div
          className="upload-controls"
        >

          {/* FILE INPUT */}

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {

              const selectedFile =
                e.target.files?.[0];

              if (
                selectedFile
              ) {

                setFile(
                  selectedFile
                );

                setExtractedText(
                  ""
                );

                setAiAnswer(
                  ""
                );

                setDocumentAnswer(
                  ""
                );

                setDocumentSaved(
                  false
                );

              }

            }}
          />


          {/* OCR BUTTON */}

          <button
            onClick={
              extractTextFromDocument
            }
            disabled={
              loading ||
              !file
            }
          >

            {loading
              ? "🔄 Processing OCR..."
              : "🔍 Extract Text"}

          </button>

        </div>

      </div>


      {/* ================================= */}
      {/* FILE INFORMATION */}
      {/* ================================= */}

      {file && (

        <div
          className="ocr-file glass-card"
        >

          <h2>
            📄 Selected Document
          </h2>

          <div
            className="file-details"
          >

            <p>

              <strong>
                File Name
              </strong>

              <span>
                {file.name}
              </span>

            </p>

            <p>

              <strong>
                File Type
              </strong>

              <span>
                {file.type ||
                  "Unknown"}
              </span>

            </p>

            <p>

              <strong>
                File Size
              </strong>

              <span>

                {(
                  file.size /
                  1024
                ).toFixed(2)}

                {" "}KB

              </span>

            </p>

          </div>

        </div>

      )}


      {/* ================================= */}
      {/* RESULTS */}
      {/* ================================= */}

      {extractedText && (

        <div
          className="ocr-results"
        >

          {/* ================================= */}
          {/* LAND DETAILS */}
          {/* ================================= */}

          {!extractedText.startsWith(
            "No text could be extracted"
          ) && (

            <div
              className="land-details glass-card"
            >

              <div
                className="section-title"
              >

                <span>
                  📋
                </span>

                <h2>
                  Extracted Land Details
                </h2>

              </div>


              <div
                className="land-grid"
              >

                <div className="land-item">

                  <span>
                    👤 Owner
                  </span>

                  <strong>
                    {extractField(
                      "Owner Name"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    🔢 Survey Number
                  </span>

                  <strong>
                    {extractField(
                      "Survey Number"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    📍 District
                  </span>

                  <strong>
                    {extractField(
                      "District"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    🏛️ Taluk
                  </span>

                  <strong>
                    {extractField(
                      "Taluk"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    🏘️ Village
                  </span>

                  <strong>
                    {extractField(
                      "Village"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    📐 Land Area
                  </span>

                  <strong>
                    {extractField(
                      "Land Area"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    🌱 Soil Type
                  </span>

                  <strong>
                    {extractField(
                      "Soil Type"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    🚜 Land Type
                  </span>

                  <strong>
                    {extractField(
                      "Land Type"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    🔄 Mutation Status
                  </span>

                  <strong>
                    {extractField(
                      "Mutation Status"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    💧 Water Source
                  </span>

                  <strong>
                    {extractField(
                      "Water Source"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    🌾 Crop
                  </span>

                  <strong>
                    {extractField(
                      "Crop"
                    )}
                  </strong>

                </div>


                <div className="land-item">

                  <span>
                    📅 Document Date
                  </span>

                  <strong>
                    {extractField(
                      "Document Date"
                    )}
                  </strong>

                </div>

              </div>


              {/* AI ANALYSIS BUTTON */}

              <button
                className="document-ai-button"
                onClick={
                  askAIAboutDocument
                }
                disabled={
                  aiLoading
                }
              >

                {aiLoading
                  ? "🤖 Analyzing Document..."
                  : "🤖 Analyze Document"}

              </button>


              {/* SAVED MESSAGE */}

              {documentSaved && (

                <div
                  className="document-saved-message"
                >

                  ✅ Document analyzed and saved
                  successfully to My Documents.

                </div>

              )}

            </div>

          )}


          {/* ================================= */}
          {/* AI ANALYSIS */}
          {/* ================================= */}

          {aiAnswer && (

            <div
              className="ai-document-response glass-card"
            >

              <div
                className="section-title"
              >

                <span>
                  🤖
                </span>

                <h2>
                  BhumiMitra AI Analysis
                </h2>

              </div>

              <div
                className="ai-response-text"
              >

                {aiAnswer}

              </div>

            </div>

          )}


          {/* ================================= */}
          {/* DOCUMENT Q&A */}
          {/* ================================= */}

          <div
            className="document-qa glass-card"
          >

            <div
              className="section-title"
            >

              <span>
                💬
              </span>

              <h2>
                Ask About This Document
              </h2>

            </div>


            <p
              className="qa-subtitle"
            >

              Ask questions about the
              information found in your
              uploaded land record.

            </p>


            <div
              className="qa-input-area"
            >

              <input
                type="text"
                placeholder="e.g. What is the survey number?"
                value={
                  documentQuestion
                }
                onChange={(e) =>
                  setDocumentQuestion(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    askDocumentQuestion();

                  }

                }}
              />


              <button
                onClick={
                  askDocumentQuestion
                }
                disabled={
                  questionLoading
                }
              >

                {questionLoading
                  ? "Thinking..."
                  : "Ask AI"}

              </button>

            </div>


            {/* SUGGESTED QUESTIONS */}

            <div
              className="suggested-questions"
            >

              <button
                onClick={() =>
                  setDocumentQuestion(
                    "Who owns this land?"
                  )
                }
              >

                Who owns this land?

              </button>


              <button
                onClick={() =>
                  setDocumentQuestion(
                    "What is the survey number?"
                  )
                }
              >

                What is the survey number?

              </button>


              <button
                onClick={() =>
                  setDocumentQuestion(
                    "Is the mutation completed?"
                  )
                }
              >

                Is mutation completed?

              </button>


              <button
                onClick={() =>
                  setDocumentQuestion(
                    "Give me a one-line summary."
                  )
                }
              >

                Give me a summary

              </button>

            </div>


            {/* ANSWER */}

            {documentAnswer && (

              <div
                className="document-answer"
              >

                <div
                  className="answer-header"
                >

                  🤖 BhumiMitra AI

                </div>

                <p>
                  {documentAnswer}
                </p>

              </div>

            )}

          </div>


          {/* ================================= */}
          {/* RAW OCR TEXT */}
          {/* ================================= */}

          <div
            className="ocr-result glass-card"
          >

            <div
              className="section-title"
            >

              <span>
                🔍
              </span>

              <h2>
                Extracted Text
              </h2>

            </div>


            <pre>
              {extractedText}
            </pre>

          </div>

        </div>

      )}

    </section>
  );
}

export default OCR;