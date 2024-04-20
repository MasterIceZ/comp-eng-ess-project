import { getRoomPlayers } from "./handleAPI.js";

document.addEventListener("DOMContentLoaded", async function () {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", enterGame);

  const urlParams = new URLSearchParams(window.location.search);
  const roomNumber = urlParams.get("room");
  document.getElementById("roomNumberSpan").innerText = roomNumber; // Display room number
  // Implement logic to handle players joining the room

  const player_1 = document.getElementById("player-1");
  const player_2 = document.getElementById("player-2");
  const player_3 = document.getElementById("player-3");
  const player_4 = document.getElementById("player-4");

  const intervalRun = setInterval(async () => {
    const players = await getRoomPlayers(roomNumber);

    console.log(players);

    if (players.length >= 1) {
      player_1.innerText = players[0];
    }
    if (players.length >= 2) {
      player_2.innerText = players[1];
    }
    if (players.length >= 3) {
      player_3.innerText = players[2];
    }
    if (players.length >= 4) {
      player_4.innerText = players[3];
    }
  }, 1000);
});

function enterGame() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomNumber = urlParams.get("room");
  window.location.href = "game.html?room=" + roomNumber;
}
