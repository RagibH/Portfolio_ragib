import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "Images", "RH.png");

async function writeLogo(relativePath, size) {
  const outputPath = path.join(root, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });

  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>
    </svg>`
  );

  await sharp(source)
    .resize(size, size, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(outputPath);
}

async function createCircularLogoBuffer(size) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>
    </svg>`
  );

  return sharp(source)
    .resize(size, size, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

await writeLogo("public/images/RH.png", 512);
await writeLogo("src/app/icon.png", 32);
await writeLogo("src/app/apple-icon.png", 180);

const faviconBuffer = await createCircularLogoBuffer(32);
await writeFile(path.join(root, "src/app/favicon.ico"), faviconBuffer);

console.log("Circular logo assets generated.");
