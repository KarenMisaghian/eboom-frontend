// useAuth.ts
// Authentication + Token Management Hook
// - Stores access & refresh tokens
// - Automatically refreshes tokens when expired
// - Provides login, logout, and user loading
// - Works with axios interceptors

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API_ROUTES from "../api/urls";


interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(() => 
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() => 
    localStorage.getItem("refreshToken")
  );
  const [loading] = useState(false);

  // --- AUTH API HELPERS -----------------------------------------------------
  const login = useCallback(async (email: string, password: string) => {
    const res = await axios.post<AuthResponse>(API_ROUTES.AUTH_LOGIN, {
      email,
      password,
    });

    const { accessToken, refreshToken } = res.data;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  // --- TOKEN REFRESH --------------------------------------------------------
  const refresh = useCallback(async () => {
    if (!refreshToken) return null;

    try {
      const res = await axios.post(API_ROUTES.AUTH_REFRESH, {
        refreshToken,
      });

      const newAccess = res.data.accessToken;
      setAccessToken(newAccess);
      localStorage.setItem("accessToken", newAccess);

      return newAccess;
    } catch (err) {
      logout();
      return null;
    }
  }, [refreshToken, logout]);

  // --- AXIOS INTERCEPTOR ----------------------------------------------------
  useEffect(() => {
    const req = axios.interceptors.request.use(async (config) => {
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const res = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If token expired
        if (error?.response?.status === 401 && refreshToken) {
          const newToken = await refresh();

          if (newToken) {
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axios(error.config);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(req);
      axios.interceptors.response.eject(res);
    };
  }, [accessToken, refreshToken, refresh]);

  return {
    accessToken,
    refreshToken,
    loading,
    login,
    logout,
    refresh,
    isAuthenticated: !!accessToken,
  };
};
