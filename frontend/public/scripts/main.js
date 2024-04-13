import { handleGET, handlePOST } from "./handleApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const GETButton = document.getElementById("clickGET");
  GETButton.addEventListener("click", () => {
    handleGET();
  });
  const POSTButton = document.getElementById("clickPOST");
  POSTButton.addEventListener("click", () => {
    handlePOST();
  });
});