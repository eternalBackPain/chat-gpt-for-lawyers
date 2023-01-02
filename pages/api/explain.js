import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const explaination = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generateExplaination(req.body.regexCode),
    max_tokens: 350,
    temperature: 0.2,
  });

  res.status(200).json({
    result: explaination.data.choices[0].text,
  });
}

function generateExplaination(regex) {
  return (
    "Explain the regex code I provide as if I wanted to learn regex. The code is: " +
    regex
  );
}
