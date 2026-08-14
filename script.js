const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", () => {
  document.body.classList.add("entering");

  setTimeout(() => {
    alert("AKSH is opening. The journey begins here.");
  }, 350);
});
