import Navbar from "../components/Navbar.jsx";
import SideTab from "../components/SideTab.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <SideTab />
      <div className="page-wrapper">
        <div className="card">
          <h1>Home</h1>
          <p>Next: Pinterest-style grid + filters + map/search.</p>
        </div>
      </div>
    </>
  );
}