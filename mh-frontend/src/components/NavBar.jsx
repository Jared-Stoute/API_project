import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <Link to="/monsters" style={{ marginRight: "1rem", color: "#fff" }}>
        Monsters
      </Link>
      <Link to="/builds" style={{ color: "#fff" }}>
        Builds
      </Link>
    </nav>
  );
}