import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search monsters..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "0.5rem",
        width: "100%",
        maxWidth: "300px",
        marginBottom: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
  );
}