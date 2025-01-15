import { Session } from "../types/types";

export default function SessionItem({ session }: { session: Session }) {
  return (
    <div className="item-card">
      <h2>_id: {session._id}</h2>
      <p>user: {session.user}</p>
      <p>userAgent: {session.userAgent}</p>
      <p>valid: {String(session.valid)}</p>
      <p>__v: {session.__v}</p>
      <p>createdAt: {session.createdAt}</p>
      <p>updatedAt: {session.updatedAt}</p>
    </div>
  );
}
