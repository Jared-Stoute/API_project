import React from "react";
import fireIcon from "../icons/fire.webp";
import waterIcon from "../icons/water.webp";
import thunderIcon from "../icons/thunder.webp";
import iceIcon from "../icons/ice.webp";
import dragonIcon from "../icons/dragon.webp";

const elementIcons = {
  Fire: fireIcon,
  Water: waterIcon,
  Thunder: thunderIcon,
  Ice: iceIcon,
  Dragon: dragonIcon
};

export default function MonsterList({ monsters }) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {monsters.map(m => (
        <div
          key={m.id}
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}
        >
          <h3>{m.name}</h3>
          <p>
          Element: <img src={elementIcons[m.element]} alt={m.element} style={{ width: 24, marginRight: "6px" }} /> {m.element}
         </p>

         <p>
          Weakness: <img src={elementIcons[m.weakness]} alt={m.weakness} style={{ width: 24, marginRight: "6px" }} /> {m.weakness}
         </p>
        </div>
      ))}
    </div>
  );
}