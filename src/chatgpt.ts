import {config} from "./config.js";
// import fetch from 'node-fetch';

let apiKey = config.openai_api_key;
let model = config.model;
// console.log(apiKey, model, '>>>>>model');
const sendMessage = async (message: string) => {
  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            "role": "user",
            "content": message
          }
        ],
        temperature: 0.6
      }),
    });
    // console.log(response, '>>>>>response')
    return response.json()
      .then((data) => {
        console.log(data, '>>>>data');
        return data.choices[0].message.content
      });
  } catch (e) {
    console.log(e, '>>>e')
    return "Something went wrong"
  }
}

export {sendMessage};