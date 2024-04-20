document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", enterGame);

  const urlParams = new URLSearchParams(window.location.search);
  const roomNumber = urlParams.get("room");
  document.getElementById("roomNumberSpan").innerText = roomNumber; // Display room number
  // Implement logic to handle players joining the room
});

function enterGame() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomNumber = urlParams.get("room");
  window.location.href = "gamepage.html?room=" + roomNumber;
}
