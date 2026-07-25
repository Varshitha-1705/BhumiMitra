import express from "express";
import pool from "../config/db";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// ==========================================
// GET MUTATION BY APPLICATION NUMBER
// ==========================================

router.get("/:applicationNo", authenticateToken, async (req, res) => {
  try {
    const { applicationNo } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        application_no,
        owner_name,
        survey_number,
        status,
        updated_date,
        officer
      FROM mutation_records
      WHERE application_no = $1
      `,
      [applicationNo]
    );

    // No mutation record found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No mutation application found.",
      });
    }

    // Mutation record found
    return res.status(200).json({
      success: true,
      message: "Mutation record found.",
      mutation: result.rows[0],
    });

  } catch (error) {
    console.error("Mutation Search Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;