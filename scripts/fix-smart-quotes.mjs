import fs from 'node:fs';

const LEFT_DOUBLE = '“';
const RIGHT_DOUBLE = '”';
const LEFT_SINGLE = '‘';
const RIGHT_SINGLE = '’';

const files = [
  'ui/src/components/issue-output/OutputPrimaryCard.tsx',
  'ui/src/pages/BoardChat.tsx',
  'ui/src/pages/CompanySkills.tsx',
  'ui/src/pages/ProjectWorkspaceDetail.tsx',
];

let fixed = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  const lenBefore = content.length;

  const countBefore =
    (content.match(/“/g) || []).length +
    (content.match(/”/g) || []).length +
    (content.match(/‘/g) || []).length +
    (content.match(/’/g) || []).length;

  content = content.split(LEFT_DOUBLE).join('"');
  content = content.split(RIGHT_DOUBLE).join('"');
  content = content.split(LEFT_SINGLE).join("'");
  content = content.split(RIGHT_SINGLE).join("'");

  if (content.length !== lenBefore) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Fixed: ${file} (${countBefore} smart quotes)`);
    fixed++;
  } else {
    console.log(`No change: ${file} (${countBefore} smart quotes found)`);
  }
}
console.log(`Total fixed: ${fixed} files`);
