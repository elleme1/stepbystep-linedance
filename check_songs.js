const fs = require('fs');
const content = fs.readFileSync('/Users/junghyunchoi/Downloads/라인댄스/src/data/songs.js', 'utf-8');
// This is not a valid JSON, it's a JS file. We can extract it using eval or regex.
// Let's use a regex to find id, title, youtubeId, mainVideoId
const regex = /id:\s*(\d+).*?title:\s*['"]([^'"]+)['"].*?(?:youtubeId:\s*['"]([^'"]*)['"]|mainVideoId:\s*['"]([^'"]*)['"])/gs;
let match;
let missing = [];
while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const title = match[2];
  const youtubeId = match[3] || match[4];
  if (!youtubeId || youtubeId.trim() === '') {
    missing.push({ id, title });
  }
}
console.log("Missing video IDs:", missing);
