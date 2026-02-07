import Navbar from "../components/Navbar.jsx";
import SideTab from "../components/SideTab.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <SideTab />
      <div style={{ padding: 24 }}>
        <h1>Home</h1>
        <p>Next: Pinterest-style grid + filters + map/search.</p>
      </div>
    </>
  );
}