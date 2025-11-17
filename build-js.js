// build-js.js
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "development/frontend/js");
const distDir = path.join(__dirname, "assets/css-js");

// Создаём папку назначения, если её нет
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Читаем все JS файлы кроме jQuery
const files = fs
  .readdirSync(srcDir)
  .filter((f) => f.endsWith(".js") && f !== "jquery-3.6.1.min.js");

let output = "";

// Объединяем JS файлы
for (const file of files) {
  const content = fs.readFileSync(path.join(srcDir, file), "utf8");
  output += `\n/* ${file} */\n${content}\n`;
}

// Записываем объединённый файл
fs.writeFileSync(path.join(distDir, "app.js"), output);

// Копируем jQuery (если она есть)
const jquerySrc = path.join(srcDir, "jquery-3.6.1.min.js");
const jqueryDest = path.join(distDir, "jquery-3.6.1.min.js");

if (fs.existsSync(jquerySrc)) {
  fs.copyFileSync(jquerySrc, jqueryDest);
}

console.log("✅ JS успешно собран и скопирован в assets/css-js/");
