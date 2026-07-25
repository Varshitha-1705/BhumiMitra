import { useEffect, useState } from "react";

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

function Documents() {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);

  const [selectedDocument, setSelectedDocument] =
    useState<SavedDocument | null>(null);

  const [showAnalysis, setShowAnalysis] =
    useState(false);

  const [showExtractedText, setShowExtractedText] =
    useState(false);

  // ==========================================
  // Load documents from localStorage
  // ==========================================

  const loadDocuments = () => {
    try {
      const savedDocuments =
        localStorage.getItem(
          "bhumiMitraDocuments"
        );

      if (savedDocuments) {
        setDocuments(
          JSON.parse(savedDocuments)
        );
      } else {
        setDocuments([]);
      }

    } catch (error) {

      console.error(
        "Error loading documents:",
        error
      );

      setDocuments([]);

    }
  };


  // ==========================================
  // Load documents when page opens
  // ==========================================

  useEffect(() => {

    loadDocuments();

    // Update when user returns to page
    const handleFocus = () => {
      loadDocuments();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };

  }, []);


  // ==========================================
  // Delete Document
  // ==========================================

  const deleteDocument = (
    documentId: number
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this document?"
      );

    if (!confirmDelete) {
      return;
    }

    const updatedDocuments =
      documents.filter(
        (doc) =>
          doc.id !== documentId
      );

    localStorage.setItem(
      "bhumiMitraDocuments",
      JSON.stringify(
        updatedDocuments
      )
    );

    setDocuments(
      updatedDocuments
    );

    // Close modal if deleted document
    if (
      selectedDocument?.id ===
      documentId
    ) {

      setSelectedDocument(
        null
      );

      setShowAnalysis(
        false
      );

      setShowExtractedText(
        false
      );

    }

  };


  // ==========================================
  // Open Analysis
  // ==========================================

  const openAnalysis = (
    document: SavedDocument
  ) => {

    setSelectedDocument(
      document
    );

    setShowAnalysis(
      true
    );

    setShowExtractedText(
      false
    );

  };


  // ==========================================
  // Open Extracted Text
  // ==========================================

  const openExtractedText = (
    document: SavedDocument
  ) => {

    setSelectedDocument(
      document
    );

    setShowExtractedText(
      true
    );

    setShowAnalysis(
      false
    );

  };


  // ==========================================
  // Close Modal
  // ==========================================

  const closeModal = () => {

    setSelectedDocument(
      null
    );

    setShowAnalysis(
      false
    );

    setShowExtractedText(
      false
    );

  };


  // ==========================================
  // Format File Size
  // ==========================================

  const formatFileSize = (
    bytes: number
  ) => {

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {

      return `${(
        bytes / 1024
      ).toFixed(2)} KB`;

    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;

  };


  return (

    <section className="feature-page documents-page">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="documents-header-main">

        <div>

          <h1>
            My Documents
          </h1>

          <p className="documents-subtitle">
            Access your previously uploaded
            and analyzed land documents.
          </p>

        </div>

        <div className="document-count">

          📁 {documents.length}{" "}
          {documents.length === 1
            ? "Document"
            : "Documents"}

        </div>

      </div>


      {/* ================================= */}
      {/* EMPTY STATE */}
      {/* ================================= */}

      {documents.length === 0 && (

        <div className="empty-documents glass-card">

          <div className="empty-document-icon">
            📂
          </div>

          <h2>
            No Documents Yet
          </h2>

          <p>
            Your analyzed land documents
            will appear here.
          </p>

          <p className="empty-document-hint">
            Upload and analyze a document
            using the OCR feature to save it
            here automatically.
          </p>

        </div>

      )}


      {/* ================================= */}
      {/* DOCUMENT GRID */}
      {/* ================================= */}

      {documents.length > 0 && (

        <div className="documents-grid">

          {documents.map(
            (document) => (

              <div
                className="document-card glass-card"
                key={
                  document.id
                }
              >

                {/* Document Icon */}

                <div className="document-card-icon">
                  📄
                </div>


                {/* Document Information */}

                <div className="document-info">

                  <h3
                    title={
                      document.name
                    }
                  >
                    {document.name}
                  </h3>

                  <div className="document-meta">

                    <span>
                      📅 {document.date}
                    </span>

                    <span>
                      📦{" "}
                      {formatFileSize(
                        document.size
                      )}
                    </span>

                  </div>

                </div>


                {/* Analysis Status */}

                <div className="document-status">

                  <span>
                    ✓ Analyzed
                  </span>

                </div>


                {/* Actions */}

                <div className="document-actions">

                  {/* View PDF */}

                  <button
                    className="view-document-button"
                    onClick={() => {

                      if (
                        document.url
                      ) {

                        window.open(
                          document.url,
                          "_blank"
                        );

                      } else {

                        alert(
                          "PDF preview is not available."
                        );

                      }

                    }}
                  >
                    👁️ View PDF
                  </button>


                  {/* AI Analysis */}

                  <button
                    className="analysis-document-button"
                    onClick={() =>
                      openAnalysis(
                        document
                      )
                    }
                  >
                    🤖 AI Analysis
                  </button>


                  {/* Extracted Text */}

                  <button
                    className="text-document-button"
                    onClick={() =>
                      openExtractedText(
                        document
                      )
                    }
                  >
                    🔍 Extracted Text
                  </button>

                </div>


                {/* Delete */}

                <button
                  className="delete-document-button"
                  onClick={() =>
                    deleteDocument(
                      document.id
                    )
                  }
                >
                  🗑️ Delete Document
                </button>

              </div>

            )
          )}

        </div>

      )}


      {/* ================================= */}
      {/* ANALYSIS MODAL */}
      {/* ================================= */}

      {selectedDocument &&
        showAnalysis && (

          <div
            className="document-modal-overlay"
            onClick={
              closeModal
            }
          >

            <div
              className="document-modal glass-card"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="document-modal-header">

                <div>

                  <h2>
                    🤖 BhumiMitra AI Analysis
                  </h2>

                  <p>
                    {selectedDocument.name}
                  </p>

                </div>

                <button
                  className="close-document-modal"
                  onClick={
                    closeModal
                  }
                >
                  ✕
                </button>

              </div>


              <div className="document-modal-content">

                <div className="saved-analysis">

                  {selectedDocument.aiAnswer}

                </div>

              </div>

            </div>

          </div>

        )}


      {/* ================================= */}
      {/* EXTRACTED TEXT MODAL */}
      {/* ================================= */}

      {selectedDocument &&
        showExtractedText && (

          <div
            className="document-modal-overlay"
            onClick={
              closeModal
            }
          >

            <div
              className="document-modal glass-card"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="document-modal-header">

                <div>

                  <h2>
                    🔍 Extracted Text
                  </h2>

                  <p>
                    {selectedDocument.name}
                  </p>

                </div>

                <button
                  className="close-document-modal"
                  onClick={
                    closeModal
                  }
                >
                  ✕
                </button>

              </div>


              <div className="document-modal-content">

                <pre className="saved-extracted-text">
                  {
                    selectedDocument.extractedText
                  }
                </pre>

              </div>

            </div>

          </div>

        )}

    </section>

  );
}

export default Documents;