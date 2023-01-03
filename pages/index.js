import Head from "next/head";
import { useState } from "react";
import Footer from "./components/Footer";
import styles from "./index.module.css"

export default function Home() {
  const [regexInput, setRegexInput] = useState("");
  const [result, setResult] = useState();
  const [explaination, setExplaination] = useState("");

  //Makes a call to the API we've defined
  async function onSubmit(event) {
    event.preventDefault();
    const regexResponse = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ regexPrompt: regexInput }),
    });
    const regexData = await regexResponse.json();
    console.log(regexData);
    setResult(regexData.result);
    setRegexInput("");

    const explainationResponse = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ regexCode: regexData.result }),
    });
    const explainationData = await explainationResponse.json();
    console.log(explainationData.result);
    setExplaination(explainationData.result);
  }

  return (
    <div>
      <Head>
        <title>RegEx Generator</title>
      </Head>

      <main className={styles.main}>
        <h1>RegEx Generator</h1>
        <p>Type what you would like to match in your text:</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="regex"
            placeholder="an Aussie phone number"
            value={regexInput}
            onChange={(e) => setRegexInput(e.target.value)}
          />
          <input type="submit" value="Generate RegEx" />
        </form>
        <div className={styles.result}>{result}</div>
        <div className={styles.explaination}>
          {explaination.length > 0 && (
            <>
              <b>Explanation: </b>
            </>
          )}
          {explaination}
        </div>
        <Footer />
      </main>
    </div>
  );
}
