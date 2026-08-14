const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", () => {
  document.body.classList.add("entering");

  setTimeout(() => {
    window.location.href = "#begin";
  }, 700);
});
