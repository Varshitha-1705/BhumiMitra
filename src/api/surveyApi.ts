const API_URL = "https://bhumimitra-backend.onrender.com/api/survey";

// ==========================================
// GET ALL SURVEY RECORDS
// ==========================================

export const getSurveyRecords = async () => {
  const token = localStorage.getItem("bhumiMitraToken");

  const response = await fetch(API_URL, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch survey records."
    );
  }

  return data;
};


// ==========================================
// SEARCH SURVEY RECORD
// ==========================================

export const searchSurveyRecord = async (
  surveyNumber: string
) => {
  const token = localStorage.getItem("bhumiMitraToken");

  const response = await fetch(
    `${API_URL}/search/${encodeURIComponent(
      surveyNumber
    )}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Survey record not found."
    );
  }

  return data;
};


// ==========================================
// ADD SURVEY RECORD
// ==========================================

export const addSurveyRecord = async (
  surveyData: any
) => {
  const token = localStorage.getItem("bhumiMitraToken");

  const response = await fetch(
    `${API_URL}/add`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(surveyData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add survey record."
    );
  }

  return data;
};


// ==========================================
// UPDATE SURVEY RECORD
// ==========================================

export const updateSurveyRecord = async (
  id: number,
  surveyData: any
) => {
  const token = localStorage.getItem("bhumiMitraToken");

  const response = await fetch(
    `${API_URL}/update/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(surveyData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update survey record."
    );
  }

  return data;
};


// ==========================================
// DELETE SURVEY RECORD
// ==========================================

export const deleteSurveyRecord = async (
  id: number
) => {
  const token = localStorage.getItem("bhumiMitraToken");

  const response = await fetch(
    `${API_URL}/delete/${id}`,
    {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete survey record."
    );
  }

  return data;
};