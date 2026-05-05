import { useState, useEffect } from "react";
import { ELEMENTS } from "../data/elements";
import { ELEMENT_ICONS } from "../data/elementIcons";
import "./MonsterForm.css";


export default function MonsterForm({ monster, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    element: "",
    weakness: ""
  });

  useEffect(() => {
    if (monster) {
      setFormData({
        name: monster.name,
        element: monster.element,
        weakness: monster.weakness || ""
      });
    }
  }, [monster]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className="monster-form" onSubmit={handleSubmit}>
      <h2>{monster ? "Edit Monster" : "Add Monster"}</h2>

      <label>Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Element</label>
      <div className="element-select">
        <select
          name="element"
          value={formData.element}
          onChange={handleChange}
          required
        >
          <option value="">Select an element</option>
          {ELEMENTS.map(el => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>

        {formData.element && (
          <img
            src={ELEMENT_ICONS[formData.element]}
            alt={formData.element}
            className="element-preview"
          />
        )}
      </div>

      <label>Weakness</label>
      <div className="element-select">
        <select
          name="weakness"
          value={formData.weakness}
          onChange={handleChange}
        >
          <option value="">None</option>
          {ELEMENTS.map(el => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>

        {formData.weakness && (
          <img
            src={ELEMENT_ICONS[formData.weakness]}
            alt={formData.weakness}
            className="element-preview"
          />
        )}
      </div>

      <div className="form-buttons">
        <button type="submit">
          {monster ? "Save Changes" : "Create Monster"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}