// const { OpenAI } = require("openai");
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export async function sendMsgToOpenAI(message) {
  const res = await openai.completions.create({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penlty: 0,
    presense_penalty: 0,
  });

  return res.data.choices[0].text;
}
