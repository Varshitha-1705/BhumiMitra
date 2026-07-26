const API_URL = "https://bhumimitra-backend.onrender.com";

interface BackendHealthResponse {
  success: boolean;
  message: string;
}

export const checkBackendHealth =
  async (): Promise<BackendHealthResponse> => {

    const response = await fetch(
      `${API_URL}/api/health`
    );

    if (!response.ok) {
      throw new Error(
        `Backend request failed: ${response.status}`
      );
    }

    return response.json();
  };