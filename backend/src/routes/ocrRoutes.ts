import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import { PDFParse } from "pdf-parse";

const router = express.Router();

// ==========================================
// MULTER CONFIGURATION
// ==========================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, JPG, JPEG and PNG files are allowed."
        )
      );
    }
  },
});

// ==========================================
// OCR DOCUMENT UPLOAD
// ==========================================

router.post(
  "/upload",
  upload.single("document"),
  async (req, res) => {
    try {
      // ==========================================
      // CHECK FILE
      // ==========================================

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a document.",
        });
      }

      console.log("====================================");
      console.log(
        "Uploaded File:",
        req.file.originalname
      );

      console.log(
        "File Type:",
        req.file.mimetype
      );

      console.log(
        "File Size:",
        req.file.size
      );

      // ==========================================
      // VARIABLE TO STORE EXTRACTED TEXT
      // ==========================================

      let extractedText = "";

      // ==========================================
      // CASE 1: PDF DOCUMENT
      // ==========================================

      if (
        req.file.mimetype ===
        "application/pdf"
      ) {
        console.log(
          "Processing PDF with pdf-parse..."
        );

        try {
          // Create PDF parser
          const parser = new PDFParse({
            data: req.file.buffer,
          });

          // Extract text
          const result =
            await parser.getText();

          extractedText =
            result.text;

          // Destroy parser
          await parser.destroy();

          console.log(
            "PDF text extraction completed."
          );

        } catch (pdfError) {
          console.error(
            "PDF Processing Error:",
            pdfError
          );

          return res.status(500).json({
            success: false,
            message:
              "Failed to extract text from the PDF.",
          });
        }
      }

      // ==========================================
      // CASE 2: IMAGE DOCUMENT
      // ==========================================

      else if (
        req.file.mimetype ===
          "image/jpeg" ||
        req.file.mimetype ===
          "image/jpg" ||
        req.file.mimetype ===
          "image/png"
      ) {
        console.log(
          "Processing image with Tesseract OCR..."
        );

        try {
          const result =
            await Tesseract.recognize(
              req.file.buffer,
              "eng",
              {
                logger: (info) => {
                  console.log(
                    `OCR Status: ${info.status}`,
                    info.progress
                  );
                },
              }
            );

          extractedText =
            result.data.text;

          console.log(
            "Image OCR completed."
          );

        } catch (ocrError) {
          console.error(
            "Image OCR Error:",
            ocrError
          );

          return res.status(500).json({
            success: false,
            message:
              "Failed to extract text from the image.",
          });
        }
      }

      // ==========================================
      // CHECK EXTRACTED TEXT
      // ==========================================

      if (
        !extractedText ||
        extractedText.trim() === ""
      ) {
        return res.status(200).json({
          success: true,

          message:
            "Document uploaded, but no text could be extracted.",

          file: {
            name:
              req.file.originalname,

            type:
              req.file.mimetype,

            size:
              req.file.size,
          },

          extractedText: "",
        });
      }

      // ==========================================
      // SUCCESS RESPONSE
      // ==========================================

      console.log(
        "Text extraction successful."
      );

      console.log(
        "Extracted text length:",
        extractedText.length
      );

      console.log("====================================");

      return res.status(200).json({
        success: true,

        message:
          "Document uploaded and text extracted successfully!",

        file: {
          name:
            req.file.originalname,

          type:
            req.file.mimetype,

          size:
            req.file.size,
        },

        extractedText:
          extractedText.trim(),
      });

    } catch (error) {
      console.error(
        "OCR Upload Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Something went wrong while processing the document.",
      });
    }
  }
);

export default router;