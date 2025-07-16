// The comments are written by me for better understanding of how the script works.

// Add CSS once
const style = document.createElement("style");
style.innerHTML = `
  .blindfold-active .piece,
  .blindfold-active piece {
    opacity: 0 !important;
  }
`;
document.head.appendChild(style);

let currentBoard = null;

function injectButton(board) {
  if (!board || board === currentBoard) return;

  console.log("🎯 New board found!");

  currentBoard = board;

  // Remove previous button if any
  const oldBtn = document.getElementById("blindfold-toggle");
  if (oldBtn) oldBtn.remove();

  // Create toggle button
  const btn = document.createElement("button");
  btn.id = "blindfold-toggle";
  btn.innerText = "🕶️ Blindfold";
  btn.style.position = "fixed";
  btn.style.top = "100px";
  btn.style.right = "0px";
  btn.style.zIndex = "9999";
  btn.style.padding = "10px 16px";
  btn.style.backgroundColor = "#111";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "6px";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "14px";
  btn.style.boxShadow = "0px 0px 6px rgba(0,0,0,0.5)";
  document.body.appendChild(btn);

  let blindfold = false;

  btn.onclick = () => {
    blindfold = !blindfold;
    board.classList.toggle("blindfold-active", blindfold);
    btn.innerText = blindfold ? "👁️ Show Pieces" : "🕶️ Blindfold";
  };
}

// Notes for me: MutationObserver to watch for changes in SPA
const observer = new MutationObserver(() => {
  const newBoard = document.querySelector(".cg-board") || document.querySelector('[class*="board"]');
  if (newBoard) {
    injectButton(newBoard);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Also try injecting once at start
const initialBoard = document.querySelector(".cg-board") || document.querySelector('[class*="board"]');
if (initialBoard) {
  injectButton(initialBoard);
}
