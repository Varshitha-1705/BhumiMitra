const API_URL = "https://bhumimitra-backend.onrender.com/api/land";

// ==========================================
// GET JWT TOKEN
// ==========================================

const getToken = () => {
  return localStorage.getItem("bhumiMitraToken");
};

// ==========================================
// GET ALL LAND RECORDS
// ==========================================

export const getLandRecords = async () => {
  const token = getToken();

  const response = await fetch(API_URL, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch land records"
    );
  }

  return data;
};

// ==========================================
// ADD LAND RECORD
// ==========================================

export const addLandRecord = async (landData: {
  owner_name: string;
  survey_number: string;
  village: string;
  taluk: string;
  district: string;
  area: string;
  land_type: string;
}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/add`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(landData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add land record"
    );
  }

  return data;
};

// ==========================================
// UPDATE LAND RECORD
// ==========================================

export const updateLandRecord = async (
  id: number,
  landData: {
    owner_name: string;
    survey_number: string;
    village: string;
    taluk: string;
    district: string;
    area: string;
    land_type: string;
  }
) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/update/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(landData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update land record"
    );
  }

  return data;
};

// ==========================================
// DELETE LAND RECORD
// ==========================================

export const deleteLandRecord = async (
  id: number
) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/delete/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete land record"
    );
  }

  return data;
};