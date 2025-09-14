// Quick script to add lazy loading to all images
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add loading="lazy" to all img tags that don't already have it
html = html.replace(/<img([^>]*?)(?<!loading="lazy")>/g, (match, attributes) => {
    // Skip if already has loading attribute
    if (attributes.includes('loading=')) {
        return match;
    }
    return `<img${attributes} loading="lazy">`;
});

fs.writeFileSync('index.html', html);
console.log('Added lazy loading to all images');