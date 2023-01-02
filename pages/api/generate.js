import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.regexPrompt),
    max_tokens: 50,
    temperature: 0,
  });

  res.status(200).json({
    result: completion.data.choices[0].text,
  });
}

function generatePrompt(regexPrompt) {
  return `Write me a regular expression. I want to match ${regexPrompt}. Do not explain the code. Only tell me the code.`;
}
