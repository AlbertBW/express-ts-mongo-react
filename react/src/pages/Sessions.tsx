import { useAuth } from "../hooks/useAuth";
import SessionItem from "../components/SessionItem";
import React from "react";
import { useSessions } from "../hooks/useSessions";

export default function Sessions() {
  const { user, isLoading } = useAuth();
  const { sessions, error, isLoading: isSessionsLoading } = useSessions();

  if (isLoading || isSessionsLoading) return <h1>Loading.........</h1>;
  if (!user) return <h1>Not logged in</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <main>
      <h2>{user.name}'s Sessions</h2>
      <section className="items-section">
        {!sessions ? (
          <div>No sessions</div>
        ) : (
          sessions.map((session) => (
            <React.Fragment key={session._id}>
              <SessionItem session={session} />
            </React.Fragment>
          ))
        )}
      </section>
    </main>
  );
}
