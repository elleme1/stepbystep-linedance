import fs from 'fs';

const content = fs.readFileSync('/Users/junghyunchoi/Downloads/라인댄스/src/data/songs.js', 'utf-8');

const songObjRegex = /id:\s*(\d+),\s*title:\s*['"]([^'"]+)['"],[\s\S]*?youtubeId:\s*['"]([^'"]*)['"]/g;
let match;
while ((match = songObjRegex.exec(content)) !== null) {
  const id = parseInt(match[1]);
  const title = match[2];
  const youtubeId = match[3];
  
  if (!youtubeId || youtubeId.trim() === '') {
    console.log(`Missing youtubeId for song ${id}: ${title}`);
  }
}
