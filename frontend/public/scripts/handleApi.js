import { BACKEND_URL } from "./config.js";

export async function handleGET() {
  await fetch(`${BACKEND_URL}/hello`)
    .then((res) => res.json())
    .then((res) => console.log(res));
}

export async function handlePOST() {
  await fetch(`${BACKEND_URL}/hello`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sender: "frontend" }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
