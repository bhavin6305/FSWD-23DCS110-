// Load from localStorage or default to 0
let count = localStorage.getItem("repCount")
  ? parseInt(localStorage.getItem("repCount"))
  : 0;

const counterDisplay = document.getElementById("counter");
counterDisplay.textContent = count;

function changeCount(amount) {
  count += amount;
  if (count < 0) count = 0;
  counterDisplay.textContent = count;
  localStorage.setItem("repCount", count);
}

function resetCount() {
  count = 0;
  counterDisplay.textContent = count;
  localStorage.setItem("repCount", count);
}
