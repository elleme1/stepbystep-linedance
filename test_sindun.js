// Read the JS file, we will execute it inside a module context to see what getSongsForLocation returns.
import fs from 'fs';

const content = fs.readFileSync('/Users/junghyunchoi/Downloads/라인댄스/src/data/songs.js', 'utf-8');

// Replace export default and export to make it runnable in node
let scriptContent = content
  .replace('export default rawSongs;', '')
  .replace(/export function/g, 'function')
  .replace(/export const/g, 'const');

scriptContent += `
  const sindunSongs = getSongsForLocation('sindun');
  console.log("Total Sindun Songs:", sindunSongs.length);
  console.log("Top 5 Sindun Songs:");
  sindunSongs.slice(0, 5).forEach(s => console.log(s.id, s.title, s.location));
`;

fs.writeFileSync('test_sindun_runner.js', scriptContent);
