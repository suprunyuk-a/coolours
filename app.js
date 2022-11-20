const cols = document.querySelectorAll(".col");

//? Рандомный цвет
// function gerenerateRandomColor() {
//   const hexCodes = "0123456789ABCDEF";
//   let color = "";
//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }
//   return "#" + color;
// }

//? Обработка клавиши "Пробел" для обновления цветов
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

//? Обработка клавиши нажатия кнопки для блокировки
document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContents);
  }
});

//? Функция копирования кода цвета
function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

//? Присваивание рандомного цвета колонкам
function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsHash() : [];
  cols.forEach((col, index) => {
    const isLock = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLock) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

//? Определение оттенка с помощью библиотеки "chroma"
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

//? Функция для добавления и изменение кодов цветов в адресс
function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((color) => color.toString().substring(1))
    .join("-");
}

//? Функция чтения цветов из адреса
function getColorsHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColors(true);
