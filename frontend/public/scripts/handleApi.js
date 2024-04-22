import { BACKEND_URL } from "./config.js";

export async function getMap() {
  await fetch(`${BACKEND_URL}/map`).then((res) => res.json());
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

export async function createNewPlayer(playerName, playerCookie) {
  try {
    const response = await fetch(`${BACKEND_URL}/player/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: playerName, cookie: playerCookie }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating new player:", error);
    throw error;
  }
}

export async function startGame(roomNumber) {
  try {
    const response = await fetch(`${BACKEND_URL}/room/startGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomNumber }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
}

export async function fetchMapAndPlayerData(roomNumber) {
  const playerNames = await fetch(
    `${BACKEND_URL}/room/player?roomNumber=${roomNumber}`
  );
  for (let i = 0; i < playerNames.length; i++) {
    const player = await fetch(`${BACKEND_URL}/player?name=${playerNames[i]}`);
    playersOnMap.push(player);
  }
  const mapTiles = await fetch(
    `${BACKEND_URL}/map?roomNumber=${roomNumber}`
  ).then((res) => res.json());
  return {
    playersOnMap,
    mapTiles,
  };
}

export async function isGameStarted(roomNumber) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/room/isGameStarted?roomNumber=${roomNumber}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking if game started:", error);
    throw error;
  }
}
