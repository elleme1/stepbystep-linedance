import fs from 'fs';

const content = fs.readFileSync('/Users/junghyunchoi/Downloads/라인댄스/src/data/songs.js', 'utf-8');

const songObjRegex = /id:\s*(\d+),\s*title:\s*['"]([^'"]+)['"],[\s\S]*?youtubeId:\s*['"]([^'"]*)['"],\s*tutorialId:\s*['"]([^'"]*)['"]/g;
let match;
while ((match = songObjRegex.exec(content)) !== null) {
  const id = parseInt(match[1]);
  const title = match[2];
  const youtubeId = match[3];
  const tutorialId = match[4];
  
  if (youtubeId === tutorialId) {
    console.log(`youtubeId matches tutorialId for song ${id}: ${title} (${youtubeId})`);
  }
}
