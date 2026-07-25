import {
  useEffect,
  useState,
} from "react";

type LanguageCode =
  | "en-IN"
  | "hi-IN"
  | "kn-IN"
  | "te-IN"
  | "ta-IN";

function VoiceAssistant() {
  const [isListening, setIsListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [language, setLanguage] =
    useState<LanguageCode>("en-IN");

  const [voices, setVoices] =
    useState<SpeechSynthesisVoice[]>([]);


  /*
  ==========================================
  LOAD AVAILABLE SPEECH VOICES
  ==========================================
  */

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices =
        window.speechSynthesis.getVoices();

      setVoices(availableVoices);

      console.log(
        "Available Speech Voices:",
        availableVoices
      );
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged =
        null;
    };
  }, []);

  /*
  ==========================================
  GET VOICE FOR SELECTED LANGUAGE
  ==========================================
  */

  const getVoiceForLanguage = (
    lang: LanguageCode
  ) => {
    const languagePrefix =
      lang.substring(0, 2).toLowerCase();

    /*
    First try exact language match
    */

    const exactVoice =
      voices.find(
        (voice) =>
          voice.lang.toLowerCase() ===
          lang.toLowerCase()
      );

    if (exactVoice) {
      return exactVoice;
    }

    /*
    Try language prefix
    */

    const matchingVoice =
      voices.find(
        (voice) =>
          voice.lang
            .toLowerCase()
            .startsWith(
              languagePrefix
            )
      );

    return matchingVoice;
  };

  /*
  ==========================================
  TEXT TO SPEECH
  ==========================================
  */

  const speakAnswer = (
    text: string
  ) => {
    /*
    Stop any previous speech
    */

    window.speechSynthesis.cancel();

    /*
    Clean AI markdown
    */

    const cleanText = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/`/g, "")
      .replace(/---/g, "")
      .trim();

    if (!cleanText) {
      return;
    }

    /*
    Split answer into sentences

    This helps prevent browser
    speech synthesis from cutting
    off long responses.
    */

    const chunks = cleanText
      .split(
        /(?<=[.!?।॥])\s+/
      )
      .filter(
        (chunk) =>
          chunk.trim().length > 0
      );

    let currentIndex = 0;

    setIsSpeaking(true);

    /*
    Get voice for selected language
    */

    const selectedVoice =
      getVoiceForLanguage(
        language
      );

    console.log(
      "Selected Language:",
      language
    );

    console.log(
      "Selected Voice:",
      selectedVoice
    );

    /*
    Show warning if browser
    does not have requested voice
    */

    if (!selectedVoice) {
      console.warn(
        `No speech voice found for ${language}.`
      );
    }

    /*
    ======================================
    SPEAK SENTENCES ONE BY ONE
    ======================================
    */

    const speakNext = () => {
      /*
      All sentences spoken
      */

      if (
        currentIndex >=
        chunks.length
      ) {
        setIsSpeaking(false);

        return;
      }

      /*
      Create speech utterance
      */

      const utterance =
        new SpeechSynthesisUtterance(
          chunks[currentIndex]
        );

      /*
      Set selected language
      */

      utterance.lang =
        language;

      /*
      Use matching browser voice
      */

      if (selectedVoice) {
        utterance.voice =
          selectedVoice;
      }

      /*
      Speech settings
      */

      utterance.rate = 0.85;

      utterance.pitch = 1;

      utterance.volume = 1;

      /*
      When current sentence
      finishes, speak next sentence
      */

      utterance.onend = () => {
        currentIndex++;

        setTimeout(() => {
          speakNext();
        }, 150);
      };

      /*
      Handle speech errors
      */

      utterance.onerror = (
        event
      ) => {
        console.error(
          "Speech Synthesis Error:",
          event
        );

        setIsSpeaking(false);
      };

      /*
      Speak current sentence
      */

      window.speechSynthesis.speak(
        utterance
      );
    };

    /*
    Start speaking
    */

    speakNext();
  };

  /*
  ==========================================
  STOP SPEAKING
  ==========================================
  */

  const stopSpeaking = () => {
    /*
    Stop browser speech
    */

    window.speechSynthesis.cancel();

    /*
    Update UI
    */

    setIsSpeaking(false);
  };

  /*
  ==========================================
  START LISTENING
  ==========================================
  */

  const startListening = () => {
    /*
    Stop previous AI speech
    */

    window.speechSynthesis.cancel();

    setIsSpeaking(false);

    /*
    ======================================
    GET SPEECH RECOGNITION API
    ======================================
    */

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    /*
    Browser support check
    */

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser."
      );

      return;
    }

    /*
    Create recognition object
    */

    const recognition =
      new SpeechRecognition();

    /*
    ======================================
    SPEECH RECOGNITION SETTINGS
    ======================================
    */

    recognition.lang =
      language;

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    /*
    ======================================
    UPDATE UI
    ======================================
    */

    setIsListening(true);

    setTranscript("");

    setAnswer("");

    /*
    ======================================
    START MICROPHONE
    ======================================
    */

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Could not start speech recognition:",
        error
      );

      setIsListening(false);

      return;
    }

    /*
    ======================================
    SPEECH RECOGNITION RESULT
    ======================================
    */

    recognition.onresult =
      async (event) => {
        /*
        Get recognized speech
        */

        const text =
          event.results[0][0]
            .transcript;

        /*
        Display user question
        */

        setTranscript(text);

        /*
        Stop listening state
        */

        setIsListening(false);

        /*
        ==================================
        SEND QUESTION TO BACKEND
        ==================================
        */

        try {
          /*
          Show Thinking...
          */

          setLoading(true);

          /*
          Clear previous answer
          */

          setAnswer("");

          console.log(
            "Sending voice question:",
            text
          );

          console.log(
            "Selected language:",
            language
          );

          /*
          ==================================
          CALL BACKEND VOICE API
          ==================================
          */

          const response =
            await fetch(
              "http://localhost:5000/api/voice/ask",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  question:
                    text,

                  language:
                    language,
                }),
              }
            );

          /*
          ==================================
          GET BACKEND RESPONSE
          ==================================
          */

          const data =
            await response.json();

          console.log(
            "Voice API Response:",
            data
          );

          /*
          ==================================
          CHECK HTTP RESPONSE
          ==================================
          */

          if (!response.ok) {
            throw new Error(
              data.message ||
                "Voice AI request failed."
            );
          }

          /*
          ==================================
          CHECK API SUCCESS
          ==================================
          */

          if (!data.success) {
            throw new Error(
              data.message ||
                "Voice AI request failed."
            );
          }

          /*
          ==================================
          GET AI ANSWER
          ==================================
          */

          const aiResponse =
            data.answer;

          /*
          Make sure answer exists
          */

          if (
            !aiResponse ||
            aiResponse.trim() === ""
          ) {
            throw new Error(
              "AI returned an empty response."
            );
          }

          /*
          ==================================
          DISPLAY AI ANSWER
          ==================================
          */

          setAnswer(
            aiResponse
          );

          /*
          Stop Thinking...
          */

          setLoading(false);

          /*
          ==================================
          READ AI ANSWER ALOUD
          ==================================
          */

          speakAnswer(
            aiResponse
          );

        } catch (error) {
          /*
          ==================================
          HANDLE API ERROR
          ==================================
          */

          console.error(
            "Voice AI Error:",
            error
          );

          /*
          Show user-friendly message
          */

          setAnswer(
            "Sorry, something went wrong while connecting to BhumiMitra AI."
          );

          /*
          Stop loading
          */

          setLoading(false);
        }
      };

    /*
    ======================================
    SPEECH RECOGNITION ERROR
    ======================================
    */

    recognition.onerror =
      (error) => {
        console.error(
          "Speech Recognition Error:",
          error
        );

        setIsListening(false);

        setLoading(false);
      };

    /*
    ======================================
    SPEECH RECOGNITION ENDED
    ======================================
    */

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  /*
  ==========================================
  CHANGE LANGUAGE
  ==========================================
  */

  const changeLanguage = (
    newLanguage: LanguageCode
  ) => {
    /*
    Stop current speech
    */

    window.speechSynthesis.cancel();

    setIsSpeaking(false);

    /*
    Change language
    */

    setLanguage(
      newLanguage
    );

    /*
    Clear previous conversation
    */

    setTranscript("");

    setAnswer("");
  };

  /*
  ==========================================
  UI
  ==========================================
  */

  return (
    <section className="feature-page">

      <h1>
        Voice Assistant
      </h1>

      <p>
        Ask questions about Karnataka
        land records using your voice.
      </p>


      {/* ================================
          LANGUAGE SELECTOR
      ================================= */}

      <div className="language-selector">

        <label>
          Select Language
        </label>

        <select
          value={language}
          onChange={(e) =>
            changeLanguage(
              e.target
                .value as LanguageCode
            )
          }
        >

          <option value="en-IN">
            🇬🇧 English
          </option>

          <option value="hi-IN">
            🇮🇳 हिन्दी
          </option>

          <option value="kn-IN">
            🟡 ಕನ್ನಡ
          </option>

          <option value="te-IN">
            🟠 తెలుగు
          </option>

          <option value="ta-IN">
            🔴 தமிழ்
          </option>

        </select>

      </div>


      {/* ================================
          VOICE CONTAINER
      ================================= */}

      <div className="voice-container">


        {/* ==============================
            START LISTENING BUTTON
        =============================== */}

        <button
          className={
            isListening
              ? "voice-button listening"
              : "voice-button"
          }
          onClick={
            startListening
          }
          disabled={
            loading
          }
        >

          {isListening
            ? "🎙️ Listening..."
            : loading
            ? "🤖 Thinking..."
            : "🎤 Start Listening"}

        </button>


        {/* ==============================
            USER QUESTION
        =============================== */}

        {transcript && (

          <div className="voice-result">

            <h2>
              👤 You
            </h2>

            <p>
              {transcript}
            </p>

          </div>

        )}


        {/* ==============================
            AI ANSWER
        =============================== */}

        {answer && (

          <div className="voice-answer">

            <h2>
              🤖 BhumiMitra AI Assistant
            </h2>

            <p>
              {answer}
            </p>


            {/* ==========================
                STOP SPEAKING BUTTON
            =========================== */}

            {isSpeaking && (

              <button
                className="stop-speaking-button"
                onClick={
                  stopSpeaking
                }
              >
                🔇 Stop Speaking
              </button>

            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default VoiceAssistant;