import fs from 'fs';

const content = fs.readFileSync('/Users/junghyunchoi/Downloads/라인댄스/src/data/songs.js', 'utf-8');

const idRegex = /id:\s*(\d+)/g;
let match;
let rawIds = [];
while ((match = idRegex.exec(content)) !== null) {
  // Only grab the ones inside rawSongs array
  // We can approximate by taking the first 100 matches
  if (rawIds.length < 100) {
    rawIds.push(parseInt(match[1]));
  }
}

// Just extract songSchedule keys
const scheduleRegex = /^\s*(\d+):\s*\{\s*date:/gm;
let scheduleIds = [];
while ((match = scheduleRegex.exec(content)) !== null) {
  scheduleIds.push(parseInt(match[1]));
}

// Find rawSongs that are missing in songSchedule
// We have to be careful since idRegex matches any 'id: 123'
// Instead, let's just use regex for title and ID
const songObjRegex = /id:\s*(\d+),\s*title:\s*['"]([^'"]+)['"]/g;
let songs = [];
while ((match = songObjRegex.exec(content)) !== null) {
  songs.push({ id: parseInt(match[1]), title: match[2] });
}

console.log("Total songs in rawSongs:", songs.length);
console.log("Total songs in songSchedule:", scheduleIds.length);

const missingInSchedule = songs.filter(s => !scheduleIds.includes(s.id));
console.log("Songs missing in songSchedule:", missingInSchedule);

const missingInRaw = scheduleIds.filter(id => !songs.find(s => s.id === id));
console.log("IDs in songSchedule but missing in rawSongs:", missingInRaw);
