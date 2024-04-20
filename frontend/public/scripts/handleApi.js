import { BACKEND_URL } from "./config.js";

// export async function getPlayer() {
//   await fetch(`${BACKEND_URL}/player`).then((res) => res.json());
// }

export async function getMap() {
  await fetch(`${BACKEND_URL}/map`).then((res) => res.json());
}

export async function getTile() {
  await fetch(`${BACKEND_URL}/tile`).then((res) => res.json());
}

export async function getRoom() {
  await fetch(`${BACKEND_URL}/room`).then((res) => res.json());
}

export async function checkRoom(propertyName, propertyValue) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/room/check?propertyName=${propertyName}&propertyValue=${propertyValue}`
    );
    const data = await response.json();
    return data.exists; // Return true if item exists, false otherwise
  } catch (error) {
    console.error("Error checking item:", error);
    throw error;
  }
}

export async function createRoomAPI(roomData) {
  console.log(roomData);
  try {
    const response = await fetch(`${BACKEND_URL}/room/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });
    const data = await response.json();
    return data; // Return the newly created room
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export async function addPlayerToRoom(roomNumber, playerName) {
  try {
    const response = await fetch(`${BACKEND_URL}/room/addPlayer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomNumber, playerName }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding player to room:", error);
    throw error;
  }
}

export async function getRoomPlayers(roomNumber) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/room/player?roomNumber=${roomNumber}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting room players:", error);
    throw error;
  }
}
