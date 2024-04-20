import { checkRoom, createRoomAPI } from "./handleAPI.js";

document.addEventListener("DOMContentLoaded", function () {
  var createRoomButton = document.getElementById("createRoomButton");
  var enterRoomButton = document.getElementById("enterRoomButton");

  createRoomButton.addEventListener("click", createRoom);
  enterRoomButton.addEventListener("click", enterRoom);
});

function enterRoom() {
  var playerName = document.getElementById("playerName").value;
  var roomNumber = document.getElementById("roomNumber").value;
  // Here you can add logic to enter the specified room with the provided player name and room number

  if (checkIfExists("roomNumber", roomNumber)) {
    console.log(
      "Entering room with player name: " +
        playerName +
        " and room number: " +
        roomNumber
    );
    window.location.href = "waitingroom.html?room=" + roomNumber; // Redirect to waiting room page
  } else {
    console.log(
      "Error entering room with player name: " +
        playerName +
        " and room number: " +
        roomNumber
    );
  }
}

function createRoom() {
  var playerName = document.getElementById("playerName").value;
  var roomNumber = generateUniqueRoomNumber(); // Generate a unique room number
  // Here you can add logic to create a new room with the provided player name and room number

  createNewRoom(roomNumber, playerName);

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

async function checkIfExists(propertyName, propertyValue) {
  const exists = await checkRoom(propertyName, propertyValue);
  return exists;
}

async function createNewRoom(roomNum, host) {
  const roomData = {
    roomNumber: roomNum,
    players: [host],
  };
  const newRoom = await createRoomAPI(roomData);
  console.log("New room created:", newRoom);
}
