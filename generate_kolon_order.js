const fs = require('fs');

const fileContent = fs.readFileSync('src/data/songs.js', 'utf8');

// Use regex to find all songSchedule entries
const regex = /([0-9]+):\s*\{\s*date:\s*'([^']+)',\s*location:\s*'([^']+)'\s*\}/g;
let match;
const kolonSongs = [];

while ((match = regex.exec(fileContent)) !== null) {
    const id = parseInt(match[1]);
    const date = match[2];
    const location = match[3];
    if (location === 'kolon' || location === 'both') {
        kolonSongs.push({ id, date });
    }
}

// Delight (58) needs to be in Kolon too, let's artificially add it
kolonSongs.push({ id: 58, date: '2026-04-24' }); // Sort higher than 57 (Accept '2026-04-23')

kolonSongs.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return b.id - a.id;
});

console.log(kolonSongs.map(s => s.id));
