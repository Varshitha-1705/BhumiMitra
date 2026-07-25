const API_URL = "http://localhost:5000";

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