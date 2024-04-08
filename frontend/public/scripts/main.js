// import config from "./config.js";

async function handleClickGET() {
  const res = await fetch(`http://localhost:${3222}/hello`);
  const data = await res.json();
  console.log(data);
}

async function handleClickPOST() {
  const res = await fetch(`http://localhost:${3222}/hello`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sender: "frontend" }),
  });
  const data = await res.json();
  console.log(data);
}
