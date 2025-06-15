import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/api/shorten", {
        url,
      });
      const newShort = response.data.shortUrl;
      setShortUrl(newShort);
      setShortUrls((prev) => [
        { longUrl: url, shortUrl: newShort },
        ...prev,
      ]);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to shorten URL");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="card">
      <h1>Shorten Your URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <div className="error">{error}</div>}

      {shortUrl && (
        <div className="result">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button onClick={handleCopy} style={{ marginLeft: "10px" }}>
            Copy
          </button>
          {copied && (
            <span style={{ marginLeft: "10px", color: "limegreen" }}>
              Copied!
            </span>
          )}
        </div>
      )}

      {shortUrls.length > 0 && (
        <div className="list">
          <h2>Recently Shortened URLs</h2>
          <ul>
            {shortUrls.map((item, index) => (
              <li key={index}>
                <div>
                  <strong>Original:</strong>{" "}
                  <a
                    href={item.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.longUrl}
                  </a>
                </div>
                <div>
                  <strong>Short:</strong>{" "}
                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.shortUrl}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
