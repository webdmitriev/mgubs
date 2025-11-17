// copy-fonts.js
const fs = require('fs-extra');

async function copyFonts() {
  try {
    await fs.copy('development/frontend/fonts', 'assets/fonts');
    console.log('✅ Fonts copied from development/fonts → assets/fonts');
  } catch (err) {
    console.error('❌ Error copying fonts:', err);
  }
}

copyFonts();
