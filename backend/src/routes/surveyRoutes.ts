import express from "express";
import pool from "../config/db";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// ==========================================
// GET ALL SURVEY RECORDS
// ==========================================

router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM survey_records ORDER BY id DESC"
    );

    return res.status(200).json({
      success: true,
      surveys: result.rows,
    });
  } catch (error) {
    console.error("Get Survey Records Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================================
// GET SURVEY RECORD BY SURVEY NUMBER
// ==========================================

router.get(
  "/search/:surveyNumber",
  authenticateToken,
  async (req, res) => {
    try {
      const { surveyNumber } = req.params;

      const result = await pool.query(
        `
        SELECT *
        FROM survey_records
        WHERE survey_number = $1
        `,
        [surveyNumber]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Survey record not found.",
        });
      }

      return res.status(200).json({
        success: true,
        survey: result.rows[0],
      });
    } catch (error) {
      console.error("Search Survey Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// ==========================================
// ADD SURVEY RECORD
// ==========================================

router.post("/add", authenticateToken, async (req, res) => {
  try {
    const {
      survey_number,
      owner_name,
      district,
      taluk,
      village,
      area,
      land_type,
    } = req.body;

    // Validate required fields
    if (
      !survey_number ||
      !owner_name ||
      !district ||
      !taluk ||
      !village ||
      !area
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Get logged-in user ID from JWT
    const userId = (req as any).user?.id || null;

    // Insert survey record
    const result = await pool.query(
      `
      INSERT INTO survey_records
      (
        survey_number,
        owner_name,
        district,
        taluk,
        village,
        area,
        land_type,
        created_by
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
      `,
      [
        survey_number,
        owner_name,
        district,
        taluk,
        village,
        area,
        land_type || null,
        userId,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Survey record added successfully!",
      survey: result.rows[0],
    });
  } catch (error) {
    console.error("Add Survey Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================================
// UPDATE SURVEY RECORD
// ==========================================

router.put(
  "/update/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        survey_number,
        owner_name,
        district,
        taluk,
        village,
        area,
        land_type,
      } = req.body;

      const result = await pool.query(
        `
        UPDATE survey_records
        SET
          survey_number = $1,
          owner_name = $2,
          district = $3,
          taluk = $4,
          village = $5,
          area = $6,
          land_type = $7
        WHERE id = $8
        RETURNING *;
        `,
        [
          survey_number,
          owner_name,
          district,
          taluk,
          village,
          area,
          land_type,
          id,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Survey record not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Survey record updated successfully!",
        survey: result.rows[0],
      });
    } catch (error) {
      console.error("Update Survey Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// ==========================================
// DELETE SURVEY RECORD
// ==========================================

router.delete(
  "/delete/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `
        DELETE FROM survey_records
        WHERE id = $1
        RETURNING *;
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Survey record not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Survey record deleted successfully!",
        survey: result.rows[0],
      });
    } catch (error) {
      console.error("Delete Survey Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

export default router;