import React, { useState } from "react";

export default function SpellAndGrammar() {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
   const [darkMode, setDarkMode] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const checkGrammar = async () => {
    // Using a free API like LanguageTool (or a placeholder for now)
    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ text, language: "en-US" }),
    });
    
    const data = await response.json();
    setErrors(data.matches);
  };

  return (
    <div className="container mt-3" 
    >
      <label htmlFor="textArea" className="form-label">
       <h3> <b>Enter Text:</b></h3>
      </label>
      <textarea
        id="textArea"
        className="form-control"
        rows="5"
        value={text}
        onChange={handleChange}
        placeholder="Type your text here..."
      ></textarea>
      
      <button className="btn btn-primary mt-2" onClick={checkGrammar}>
        Check Grammar & Spelling
      </button>

      <h4 className="mt-3">📝 Errors</h4>
      {errors.length === 0 ? (
        <p>No errors found!</p>
      ) : (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>
              <strong>{error.message}</strong> (Suggestion: {error.replacements.map(rep => rep.value).join(", ")})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}