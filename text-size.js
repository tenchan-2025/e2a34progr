const textSizeOptions = ["small", "medium", "large"];
const textSizeButtons = document.querySelectorAll(".text-size-control button");
const textSizeStorageKey = "site-text-size";

function applyTextSize(size) {
  if (!textSizeOptions.includes(size)) return;

  document.documentElement.dataset.textSize = size;
  textSizeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.textSize === size));
  });
}

let initialTextSize = "medium";
try {
  const savedTextSize = window.localStorage.getItem(textSizeStorageKey);
  if (textSizeOptions.includes(savedTextSize)) {
    initialTextSize = savedTextSize;
  }
} catch (error) {
  console.error("文字サイズの設定を読み込めませんでした。", error);
}

applyTextSize(initialTextSize);

textSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const size = button.dataset.textSize;
    applyTextSize(size);

    try {
      window.localStorage.setItem(textSizeStorageKey, size);
    } catch (error) {
      console.error("文字サイズの設定を保存できませんでした。", error);
    }
  });
});
