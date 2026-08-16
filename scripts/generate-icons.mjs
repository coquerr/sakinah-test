import sharp from "sharp"
import { readFileSync, mkdirSync } from "fs"

const svg = readFileSync("public/icons/icon-source.svg")

mkdirSync("public/icons", { recursive: true })

const targets = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "icon-512-maskable.png", size: 512 },
  { name: "icon-180.png", size: 180 }
]

for (const target of targets) {
  await sharp(svg)
    .resize(target.size, target.size)
    .png()
    .toFile(`public/icons/${target.name}`)

  console.log(`Создан public/icons/${target.name}`)
}