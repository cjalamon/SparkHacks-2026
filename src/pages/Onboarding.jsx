import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const nav = useNavigate();
  const bootstrap = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("castly_bootstrap") || "{}"); }
    catch { return {}; }
  }, []);

  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [bio, setBio] = useState("");

  function save() {
    localStorage.setItem(
      "castly_profile",
      JSON.stringify({ name, pronouns, creativeType, bio, ...bootstrap })
    );
    nav("/home");
  }

  return (
    <>
      <div style={{ padding: 24 }}>
        <h1>Build your profile</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={pronouns} onChange={(e) => setPronouns(e.target.value)} placeholder="Pronouns" />
        <input value={creativeType} onChange={(e) => setCreativeType(e.target.value)} placeholder="Creative type (Editor, DP...)" />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="About/Bio" />
        <button onClick={save}>Finish</button>
      </div>
    </>
  );
}