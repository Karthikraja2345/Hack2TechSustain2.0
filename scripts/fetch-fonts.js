/**
 * Script to download Google Fonts locally for better performance.
 * Run with: npm run fetch:fonts
 */

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Buffer } from 'buffer';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FONTS_DIR = path.join(__dirname, '..', 'public', 'fonts');

// Font URLs from Google Fonts API
const FONT_URLS = [
  // Inter Regular (400)
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2',
  // Inter Medium (500)  
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7W0Q5nw.woff2',
  // Inter Semi Bold (600)
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7W0Q5nw.woff2',
  // Inter Bold (700) - corrected URL
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa3pL7W0Q5nw.woff2',
  
  // Poppins Regular (400)
  'https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
  // Poppins Medium (500) - corrected URL
  'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2',
  // Poppins Semi Bold (600) 
  'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2',
  // Poppins Bold (700)
  'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2',
];

async function downloadFont(url, filename) {
  try {
    console.log(`Downloading ${filename}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await fs.writeFile(path.join(FONTS_DIR, filename), buffer);
    console.log(`✓ Downloaded ${filename}`);
  } catch (error) {
    console.error(`✗ Failed to download ${filename}:`, error.message);
  }
}

async function fetchFonts() {
  try {
    // Ensure fonts directory exists
    await fs.mkdir(FONTS_DIR, { recursive: true });
    
    // Download all fonts
    const downloads = FONT_URLS.map((url) => {
      // Extract filename from URL or create one
      const isInter = url.includes('/inter/');
      const fontFamily = isInter ? 'inter' : 'poppins';
      
      // Extract weight from URL pattern
      let weight = '400';
      if (url.includes('2JL7')) weight = '500'; // Medium
      if (url.includes('25L7')) weight = '600'; // Semi Bold  
      if (url.includes('3JL7')) weight = '700'; // Bold
      if (url.includes('LDD_')) weight = '500'; // Poppins Medium
      if (url.includes('LEj6')) weight = '600'; // Poppins Semi Bold
      if (url.includes('LCz7')) weight = '700'; // Poppins Bold
      
      const filename = `${fontFamily}-${weight}.woff2`;
      return downloadFont(url, filename);
    });
    
    await Promise.all(downloads);
    console.log('\n✓ All fonts downloaded successfully!');
    console.log(`Fonts saved to: ${FONTS_DIR}`);
    
  } catch (error) {
    console.error('Error fetching fonts:', error);
    process.exit(1);
  }
}

// Run the script
fetchFonts();