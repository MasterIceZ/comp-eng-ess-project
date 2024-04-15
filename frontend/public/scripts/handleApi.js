import { BACKEND_URL } from "./config.js";

export async function getPlayer() {
  await fetch(`${BACKEND_URL}/player`)
    .then((res) => res.json());
}

export async function getMap() {
  await fetch(`${BACKEND_URL}/map`)
    .then((res) => res.json());
}

export async function getTile() {
  await fetch(`${BACKEND_URL}/map`)
    .then((res) => res.json());
}
