let endDate = null;

function setEndDate() {
  const userInput = document.getElementById("user-end-date").value;
  if (!userInput) {
    alert("Please select a date and time.");
    return;
  }
  endDate = new Date(userInput);
  document.getElementById("end-date").innerText = endDate.toLocaleString();
}

const inputs = document.querySelectorAll("input[type='text']");
function clock() {
  if (!endDate) return;
  const now = new Date();
  const diff = (endDate - now) / 1000;
  if (diff <= 0) return;
  inputs[0].value = Math.floor(diff / (60 * 60 * 24));
  inputs[1].value = Math.floor((diff / (60 * 60)) % 24);
  inputs[2].value = Math.floor((diff / 60) % 60);
  inputs[3].value = Math.floor(diff % 60);
}
setInterval(clock, 1000);
