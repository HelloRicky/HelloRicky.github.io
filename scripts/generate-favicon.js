const sharp = require('sharp');
const path = require('path');

const SOURCE = path.join(__dirname, '../images/personal-photos/IMG_4358.jpg');

// Crop parameters - top=150 moves head higher in frame
const CROP = { left: 125, top: 150, width: 1600, height: 1600 };

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/></svg>`
  );
}

async function generate() {
  for (const { name, size } of SIZES) {
    const outPath = path.join(__dirname, '..', name);
    const mask = circleMask(size);

    await sharp(SOURCE)
      .extract(CROP)
      .resize(size, size)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toFile(outPath);

    console.log(`Generated ${name} (${size}x${size})`);
  }
}

generate().catch(console.error);
