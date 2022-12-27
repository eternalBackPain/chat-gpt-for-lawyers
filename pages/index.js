import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [regexInput, setRegexInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ regex: regexInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setRegexInput("");
  }

  return (
    <div>
      <Head>
        <title>RegEx for...</title>
      </Head>

      <main className={styles.main}>
        <h1>Regex for...</h1>
        <p>Type what you would like to match in your text:</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="regex"
            placeholder="every 'f' in a word that begins a sentence"
            value={regexInput}
            onChange={(e) => setRegexInput(e.target.value)}
          />
          <input type="submit" value="Generate RegEx" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
