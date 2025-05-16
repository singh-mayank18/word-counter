import React, { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const clearText = () => setText("");

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n+/).filter((p) => p.trim().length > 0).length;
  const readingTime = (wordCount / 275).toFixed(2);
  const speakingTime = (wordCount / 180).toFixed(2);

  const countKeywordDensity = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const keywordCounts = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    return keywordCounts;
  };

  const keywordDensity = countKeywordDensity();

  return (
    <div className="container mt-3 p-3">
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
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          border: "1px solid #ccc",
        }}
      ></textarea>

      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={copyToClipboard}>
          📋 Copy Text
        </button>
        <button className="btn btn-secondary me-2" onClick={toUpperCase}>
          🔠 Uppercase
        </button>
        <button className="btn btn-secondary me-2" onClick={toLowerCase}>
          🔡 Lowercase
        </button>
        <button className="btn btn-warning me-2" onClick={clearText}>
          ❌ Clear
        </button>
        <button className="btn btn-info me-2" onClick={undo} disabled={historyIndex === 0}>
          ↩️ Undo
        </button>
        <button className="btn btn-info me-2" onClick={redo} disabled={historyIndex === history.length - 1}>
          ↪️ Redo
        </button>
      </div>

      <h4 className="mt-3">📊 Statistics</h4>
      <p>📖 <strong>Word Count:</strong> {wordCount}</p>
      <p>🔡 <strong>Character Count (with spaces):</strong> {charCount}</p>
      <p>✂ <strong>Character Count (without spaces):</strong> {charCountNoSpaces}</p>
      <p>📜 <strong>Sentences:</strong> {sentenceCount}</p>
      <p>📑 <strong>Paragraphs:</strong> {paragraphCount}</p>
      <p>⏳ <strong>Reading Time:</strong> {readingTime} minutes</p>
      <p>🗣️ <strong>Speaking Time:</strong> {speakingTime} minutes</p>

      <h4 className="mt-3">🔍 Keyword Density</h4>
      <ul>
        {Object.entries(keywordDensity).map(([word, count]) => (
          <li key={word}>
            <strong>{word}:</strong> {count} ({((count / wordCount) * 100).toFixed(1)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
