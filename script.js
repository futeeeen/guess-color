const startButton = document.querySelector("#startButton");
const confirmButton = document.querySelector("#confirmButton");
const revealAnswer = document.querySelector("#revealAnswer");
const imageGrid = document.querySelector("#imageGrid");
const message = document.querySelector("#message");
const roundLabel = document.querySelector("#roundLabel");

let gameData = null;
let currentOptions = [];
let roundQueue = [];
let selectedIndex = null;
let answered = false;
let currentRound = 0;

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function sample(items, count) {
  return shuffle(items).slice(0, count);
}

async function loadData() {
  if (gameData) {
    return gameData;
  }

  const response = await fetch("./data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`data.json 讀取失敗：${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data.sets) || data.sets.length === 0) {
    throw new Error("data.json 沒有可玩的題目。");
  }

  gameData = data;
  return gameData;
}

function setMessage(text) {
  message.textContent = text;
}

function clearGrid() {
  imageGrid.replaceChildren();
}

function resetSelectionState() {
  selectedIndex = null;
  answered = false;
  confirmButton.disabled = true;
}

function updateStartButton() {
  startButton.textContent = currentOptions.length > 0 ? "下一關" : "開始遊戲";
}

function renderOptions() {
  clearGrid();

  currentOptions.forEach((option, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");
    const badge = document.createElement("span");

    button.className = "option";
    button.type = "button";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", `選擇第 ${index + 1} 張圖片`);

    image.src = option.src;
    image.alt = `選項 ${index + 1}`;
    image.loading = "eager";
    image.decoding = "async";

    badge.className = "badge";
    badge.textContent = String(index + 1);

    button.append(image, badge);
    button.addEventListener("click", () => selectOption(index));
    imageGrid.append(button);
  });
}

function selectOption(index) {
  if (answered) {
    return;
  }

  selectedIndex = index;
  confirmButton.disabled = false;

  document.querySelectorAll(".option").forEach((option, optionIndex) => {
    option.classList.toggle("is-selected", optionIndex === selectedIndex);
  });

  setMessage(`已選擇第 ${index + 1} 張。`);
}

function markAnswer() {
  document.querySelectorAll(".option").forEach((option, index) => {
    const isCorrect = currentOptions[index].isAnswer;
    option.classList.toggle("is-correct", isCorrect);
    option.classList.toggle("is-wrong", !isCorrect);
  });
}

function showSet(set) {
  const decoys = sample(set.decoys, 3);

  currentOptions = shuffle([
    { src: set.answer, isAnswer: true },
    ...decoys.map((src) => ({ src, isAnswer: false })),
  ]);

  currentRound += 1;
  roundLabel.textContent = `第 ${currentRound} / ${gameData.sets.length} 題 · 題組 ${set.id}`;
  renderOptions();
  setMessage("請選出真正的原圖。");
  updateStartButton();
}

function finishGame() {
  currentOptions = [];
  roundQueue = [];
  currentRound = 0;
  clearGrid();
  roundLabel.textContent = "全部完成";
  setMessage("恭喜玩完所有題目！按開始遊戲可重新洗牌再玩一次。");
  updateStartButton();
  startButton.disabled = false;
}

function confirmAnswer() {
  if (selectedIndex === null || answered) {
    return;
  }

  answered = true;
  confirmButton.disabled = true;
  startButton.disabled = false;
  updateStartButton();

  const correctIndex = currentOptions.findIndex((option) => option.isAnswer);
  const isCorrect = selectedIndex === correctIndex;
  const nextText = roundQueue.length > 0 ? "按下一關繼續。" : "這是最後一題，按下一關完成。";

  if (revealAnswer.checked) {
    markAnswer();
    setMessage(
      `${isCorrect ? "答對了！" : "答錯了！"} 正確答案是第 ${correctIndex + 1} 張。${nextText}`
    );
  } else {
    setMessage(`${isCorrect ? "答對了！" : "答錯了！"} ${nextText}`);
  }
}

async function startGame() {
  startButton.disabled = true;
  resetSelectionState();
  setMessage("題目載入中...");

  try {
    const data = await loadData();

    if (roundQueue.length === 0) {
      if (currentRound > 0) {
        finishGame();
        return;
      }

      roundQueue = shuffle(data.sets);
      currentRound = 0;
    }

    const set = roundQueue.shift();
    showSet(set);
  } catch (error) {
    clearGrid();
    roundQueue = [];
    currentRound = 0;
    roundLabel.textContent = "載入失敗";
    setMessage(error instanceof Error ? error.message : "發生未知錯誤。");
    updateStartButton();
    startButton.disabled = false;
  }
}

startButton.addEventListener("click", startGame);
confirmButton.addEventListener("click", confirmAnswer);
