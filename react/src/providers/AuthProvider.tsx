import { useState, ReactNode, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { APISession, NewUser, User } from "../types/types";
import {
  createUser,
  createUserSession,
  deleteUserSession,
  getRefreshAccessToken,
  getUser,
} from "../api/users.api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (!loggedIn) {
      setIsLoading(false);
      return;
    }

    const refreshToken = async () => {
      try {
        const newAccessToken = await getRefreshAccessToken();

        if (newAccessToken.error) {
          throw newAccessToken.error;
        }

        const user = await getUser(newAccessToken.data.accessToken);

        if (user.error) {
          throw user.error;
        }

        setUser(user.data);
        setAccessToken(newAccessToken.data.accessToken);
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        localStorage.setItem("loggedIn", "false");
      } finally {
        setIsLoading(false);
      }
    };

    refreshToken();
  }, []);

  const register = async (user: NewUser): Promise<{ error: string | null }> => {
    setIsLoading(true);
    try {
      const newUser = await createUser(user);

      if (newUser.error) {
        throw newUser.error;
      }

      const userSession = await createUserSession(user.email, user.password);

      if (userSession.error) {
        throw userSession.error;
      }

      setSession(userSession.data);
      localStorage.setItem("loggedIn", "true");

      return { error: null };
    } catch (error) {
      return { error: error as string };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    setIsLoading(true);

    try {
      const session = await createUserSession(email, password);

      if (session.error) {
        throw session.error;
      }

      setSession(session.data);
      localStorage.setItem("loggedIn", "true");
      return { error: null };
    } catch (error) {
      return { error: error as string };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (accessToken) {
      deleteUserSession(accessToken);
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("loggedIn");
    }
  };

  const setSession = (session: APISession) => {
    setUser(session.user);
    setAccessToken(session.accessToken);
  };

  const session = {
    user,
    register,
    login,
    logout,
    accessToken,
    isLoading,
  };

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};
