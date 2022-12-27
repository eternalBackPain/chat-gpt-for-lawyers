import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.regex),
    temperature: 0.2,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(regex) {
  return `Write me regular expression code. I want to match ${regex}. Write your explaination in a seperate paragraph.
  
  RegEx: every f in a word that does not begin a sentence
  Answer: [^.!?\s][fF]|^[fF]
    Explaination: ...`;
}
