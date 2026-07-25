import express from "express";
import pool from "../config/db";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// ==========================================
// GET ALL LAND RECORDS
// ==========================================

router.get("/",authenticateToken,async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM land_records ORDER BY id DESC"
    );

    return res.status(200).json({
      success: true,
      lands: result.rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================================
// ADD LAND RECORD
// ==========================================

router.post("/add", authenticateToken, async (req, res) => {
  try {
    const {
      owner_name,
      survey_number,
      village,
      taluk,
      district,
      area,
      land_type,
      
    } = req.body;

    if (
      !owner_name ||
      !survey_number ||
      !village ||
      !taluk ||
      !district ||
      !area ||
      !land_type
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO land_records
      (
        owner_name,
        survey_number,
        village,
        taluk,
        district,
        area,
        land_type,
        created_by
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
      `,
      [
        owner_name,
        survey_number,
        village,
        taluk,
        district,
        area,
        land_type,
        (req as any).user?.id || null,,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Land record added successfully!",
      land: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
// ==========================================
// UPDATE LAND RECORD
// ==========================================

router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      owner_name,
      survey_number,
      village,
      taluk,
      district,
      area,
      land_type,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE land_records
      SET
        owner_name=$1,
        survey_number=$2,
        village=$3,
        taluk=$4,
        district=$5,
        area=$6,
        land_type=$7
      WHERE id=$8
      RETURNING *;
      `,
      [
        owner_name,
        survey_number,
        village,
        taluk,
        district,
        area,
        land_type,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Land record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Land record updated successfully!",
      land: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});
// ==========================================
// DELETE LAND RECORD
// ==========================================

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM land_records
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Land record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Land record deleted successfully!",
      land: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});

export default router;