import {
  checkRoom,
  createRoomAPI,
  addPlayerToRoom,
  createNewPlayer,
} from "./handleAPI.js";
import { MD5 } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  var createRoomButton = document.getElementById("createRoomButton");
  var enterRoomButton = document.getElementById("enterRoomButton");

  createRoomButton.addEventListener("click", createRoom);
  enterRoomButton.addEventListener("click", enterRoom);
});

async function enterRoom() {
  const playerName = document.getElementById("playerName").value;
  const roomNumber = document.getElementById("roomNumber").value;
  // Here you can add logic to enter the specified room with the provided player name and room number

  if (playerName === "" || roomNumber === "") {
    alert("Please enter a player name and room number.");
    return;
  }

  const playerCookie = MD5(playerName + roomNumber);

  const roomExists = await checkRoom("roomNumber", roomNumber);

  if (roomExists) {
    console.log(
      "Entering room with player name: " +
        playerName +
        " and room number: " +
        roomNumber
    );
    await createNewPlayer(playerName, playerCookie);
    document.cookie = `playerCookie=${playerCookie}`;
    await addPlayerToRoom(roomNumber, playerName);
    window.location.href = `waitingroom.html?room=${roomNumber}`; // Redirect to waiting room page
  } else {
    console.log(
      "Error entering room with player name: " +
        playerName +
        " and room number: " +
        roomNumber
    );
    alert("Room does not exist. Please enter a valid room number.");
  }
}

async function createRoom() {
  var playerName = document.getElementById("playerName").value;
  var roomNumber = generateUniqueRoomNumber(); // Generate a unique room number
  // Here you can add logic to create a new room with the provided player name and room number

  if (playerName === "") {
    alert("Please enter a player name.");
    return;
  }

  const playerCookie = MD5(playerName + roomNumber);

  await createNewPlayer(playerName, playerCookie);
  document.cookie = `playerCookie=${playerCookie}`;
  await createNewRoom(roomNumber, playerName);

  console.log(
    "Creating new room with player name: " +
      playerName +
      " and room number: " +
      roomNumber
  );
  window.location.href = "waitingroom.html?room=" + roomNumber; // Redirect to waiting room with room number
}

function generateUniqueRoomNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}

async function createNewRoom(roomNum, host) {
  const roomData = {
    roomNumber: roomNum,
    players: [host],
  };
  const newRoom = await createRoomAPI(roomData);
  console.log("New room created:", newRoom);
}
