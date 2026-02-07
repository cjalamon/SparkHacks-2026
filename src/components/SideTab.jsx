import { useNavigate } from "react-router-dom";
import "./SideTab.css";

export default function SideTab() {
  const nav = useNavigate();
  return (
    <aside className="side-tab">
      <button className="side-btn" onClick={() => nav('/home')}>Home</button>
      <button className="side-btn" onClick={() => nav('/events')}>Events</button>
    </aside>
  );
}
