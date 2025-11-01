#!/usr/bin/env node
// Small helper to convert images in ./public/images to WebP (lossy with quality setting)
// Usage: node scripts/optimize-images.js
// Note: requires installing 'sharp' locally: npm i -D sharp
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const readdir = promisify(fs.readdir)

async function run() {
  try {
    const { default: sharp } = await import('sharp')
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const imgDir = path.join(__dirname, '..', 'public', 'images')
    if (!fs.existsSync(imgDir)) {
      console.error('images directory not found:', imgDir)
      process.exit(1)
    }
    const files = (await readdir(imgDir)).filter(f => /\.(jpe?g|png)$/i.test(f))
    for (const f of files) {
      const src = path.join(imgDir, f)
      const out = path.join(imgDir, `${path.parse(f).name}.webp`)
      console.log('Optimizing', f, '->', path.basename(out))
      await sharp(src)
        .webp({ quality: 75 })
        .toFile(out)
    }
    console.log('Done')
  } catch (err) {
    console.error('Error: install sharp (npm i -D sharp) to use this script')
    console.error(err && err.message ? err.message : err)
    process.exit(1)
  }
}

run()
