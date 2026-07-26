import axios from "axios";

const API_URL = "https://bhumimitra-backend.onrender.com/api/mutation";

export const getMutationRecord = async (
  applicationNo: string
) => {
  const token = localStorage.getItem("bhumiMitraToken");

  const response = await axios.get(
    `${API_URL}/${applicationNo}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};