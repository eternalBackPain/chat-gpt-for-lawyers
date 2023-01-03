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
    temperature: 0,
  });

  res.status(200).json({
    result: explaination.data.choices[0].text,
  });
}

function generateExplaination(regex) {
  return (
    "I want you to act as a highschool teacher. I will provide regex code and you will reply with an explaination of the code to the student. The explaination must cover each part of the code. Provide examples of strings the regex will match at the end. The code is: " +
    regex
  );
}
