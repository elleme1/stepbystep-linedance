import fs from 'fs';

const content = fs.readFileSync('/Users/junghyunchoi/Downloads/라인댄스/src/data/songs.js', 'utf-8');

// We need to parse it better. Let's just find the object literal blocks.
const songBlocks = content.split('  {\n').slice(1).map(block => '  {\n' + block.split('  }')[0] + '  }');

songBlocks.forEach(block => {
  const idMatch = block.match(/id:\s*(\d+)/);
  const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
  const ytMatch = block.match(/youtubeId:\s*['"]([^'"]*)['"]/);
  const mainMatch = block.match(/mainVideoId:\s*['"]([^'"]*)['"]/);
  const tutMatch = block.match(/tutorialId:\s*['"]([^'"]*)['"]/);
  const tutVidMatch = block.match(/tutorialVideoId:\s*['"]([^'"]*)['"]/);
  
  if (idMatch && titleMatch) {
    const yt = ytMatch ? ytMatch[1] : '';
    const main = mainMatch ? mainMatch[1] : '';
    const tut = tutMatch ? tutMatch[1] : '';
    const tutVid = tutVidMatch ? tutVidMatch[1] : '';
    
    if (!yt && !main) {
      console.log(`Missing main video for song ${idMatch[1]}: ${titleMatch[1]}`);
    }
    if (!tut && !tutVid) {
      console.log(`Missing tutorial for song ${idMatch[1]}: ${titleMatch[1]}`);
    }
  }
});
