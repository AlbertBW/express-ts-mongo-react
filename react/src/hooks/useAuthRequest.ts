import { useAuth } from "./useAuth";

export const useAuthenticatedRequest = () => {
  const { accessToken, refreshAccessToken, clearAccessToken } = useAuth();

  const authRequest = async (url: string, options: RequestInit = {}) => {
    if (!accessToken) throw new Error("No access token");

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    let response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      try {
        const session = await refreshAccessToken();

        if (!session) throw new Error("Error refreshing access token");

        headers.Authorization = `Bearer ${session.accessToken}`;
        response = await fetch(url, { ...options, headers });
      } catch (error) {
        console.error("Failed", error);
        clearAccessToken();
      }
    }

    const data = response.json();

    return data;
  };

  return authRequest;
};
