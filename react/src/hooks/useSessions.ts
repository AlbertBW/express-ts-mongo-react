import { useState, useEffect } from "react";
import { getUserSessions } from "../api/users.api";
import { useAuth } from "./useAuth";
import { Session } from "../types/types";

export const useSessions = () => {
  const { accessToken } = useAuth();
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!accessToken) {
        setIsLoading(false);
        return setError("Not logged in");
      }

      const sessions = await getUserSessions(accessToken);

      if (sessions.error) {
        setIsLoading(false);
        return setError(`${sessions.error}`);
      }

      setSessions(sessions.data);
      setIsLoading(false);
    };

    fetchSessions();
  }, [accessToken]);

  return { sessions, error, isLoading };
};
