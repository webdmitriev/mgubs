const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const inputDir = 'development/frontend/img';
const outputDir = 'assets/img';

// Функция для сжатия одного файла
async function compressImage(filePath) {
  try {
    const relativePath = path.relative(inputDir, filePath);
    const outputPath = path.join(outputDir, relativePath);

    // Создаём целевую директорию, если её нет
    await fs.ensureDir(path.dirname(outputPath));

    // Динамически импортируем ESM-пакеты
    const imagemin = (await import('imagemin')).default;
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;
    const imageminSvgo = (await import('imagemin-svgo')).default;

    // Сжимаем
    const files = await imagemin([filePath], {
      destination: path.dirname(outputPath),
      plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.7, 0.9] }),
        imageminSvgo()
      ]
    });

    if (files.length > 0) {
      console.log(`🖼️  Optimized: ${relativePath}`);
    }
  } catch (err) {
    console.error('❌ Error compressing', filePath, err);
  }
}

// Наблюдение за папкой
function watchImages() {
  console.log('👀 Watching for new or changed images...');
  chokidar
    .watch(inputDir, { ignoreInitial: false })
    .on('add', compressImage)
    .on('change', compressImage);
}

watchImages();
