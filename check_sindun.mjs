import fs from 'fs';

const content = fs.readFileSync('/Users/junghyunchoi/Downloads/라인댄스/src/data/songs.js', 'utf-8');

const scheduleRegex = /^\s*(\d+):\s*\{\s*date:/gm;
let scheduleIds = [];
let match;
while ((match = scheduleRegex.exec(content)) !== null) {
  scheduleIds.push(parseInt(match[1]));
}

const sindunOrderMatch = content.match(/const sindunOrder = \[([\s\S]*?)\];/);
if (sindunOrderMatch) {
  const sindunOrderStr = sindunOrderMatch[1];
  const sindunIds = [];
  const regex = /^\s*(\d+),/gm;
  while ((match = regex.exec(sindunOrderStr)) !== null) {
    sindunIds.push(parseInt(match[1]));
  }
  
  // Find songs that are location 'sindun' or 'both' in songSchedule but missing in sindunOrder
  const sindunScheduleRegex = /^\s*(\d+):\s*\{\s*date:\s*'[^']+',\s*location:\s*'([^']+)'\s*\}/gm;
  let sindunLocIds = [];
  while ((match = sindunScheduleRegex.exec(content)) !== null) {
    if (match[2] === 'sindun' || match[2] === 'both') {
      sindunLocIds.push(parseInt(match[1]));
    }
  }
  
  const missingInSindunOrder = sindunLocIds.filter(id => !sindunIds.includes(id));
  console.log("Songs assigned to sindun/both but missing in sindunOrder:", missingInSindunOrder);
}
