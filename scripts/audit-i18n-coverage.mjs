/**
 * Full i18n coverage audit — checks every t() call in every file.
 * Verifies both English and Chinese translations exist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'ui/src/i18n/locales/en.json'), 'utf-8'));
const zh = JSON.parse(fs.readFileSync(path.join(ROOT, 'ui/src/i18n/locales/zh-CN.json'), 'utf-8'));

// Get all files using i18n
const i18nFiles = fs.readFileSync('/tmp/i18n_files.txt', 'utf-8').trim().split('\n').filter(Boolean)
  .map(f => f.startsWith('ui/') ? f : f.replace(/^.*?ui\/src\//, 'ui/src/'));

console.log('Files using i18n:', i18nFiles.length);

function getString(obj, keyPath) {
  const parts = keyPath.split('.');
  let cur = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== 'object' || !(p in cur)) return null;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : null;
}

const okUntranslated = new Set([
  'Chrome','Webhook','Markdown','GitHub','React','React-dom','React-router-dom',
  'I18next','Mermaid','Mib','Span','i18next','MiB','React Router DOM','React DOM',
  'Kubernetes','API','SDK','CLI','CPU','GPU','SQL','JSON','HTML','CSS','YAML','XML',
  'Paperclip','OpenClaw','Hermes','OpenCode','Codex','Claude',
]);

const enMissing = [], zhMissing = [], zhUntranslated = [], dynamicKeys = [];
const allKeysFound = new Set();
let totalCalls = 0;

for (const file of i18nFiles) {
  let content;
  try { content = fs.readFileSync(path.join(ROOT, file), 'utf-8'); }
  catch { continue; }

  // t('key') — single quotes
  for (const m of content.matchAll(/\bt\('([a-zA-Z][a-zA-Z0-9_.-]*)'\)/g)) {
    const key = m[1];
    allKeysFound.add(key);
    totalCalls++;
    const enVal = getString(en, key);
    const zhVal = getString(zh, key);
    if (!enVal && !enMissing.some(r => r.key === key)) enMissing.push({key, file});
    if (!zhVal && !zhMissing.some(r => r.key === key)) zhMissing.push({key, file});
    if (enVal && zhVal && enVal === zhVal && !okUntranslated.has(enVal) && enVal.length > 3)
      zhUntranslated.push({key, enVal: enVal.substring(0,60), file});
  }

  // t("key") or t("key", — double quotes
  for (const m of content.matchAll(/\bt\("([a-zA-Z][a-zA-Z0-9_.-]*)"/g)) {
    const key = m[1];
    allKeysFound.add(key);
    totalCalls++;
    const enVal = getString(en, key);
    const zhVal = getString(zh, key);
    if (!enVal && !enMissing.some(r => r.key === key)) enMissing.push({key, file});
    if (!zhVal && !zhMissing.some(r => r.key === key)) zhMissing.push({key, file});
    if (enVal && zhVal && enVal === zhVal && !okUntranslated.has(enVal) && enVal.length > 3)
      zhUntranslated.push({key, enVal: enVal.substring(0,60), file});
  }

  // Dynamic keys: t(someVar) or t(`template`) — record for manual review
  for (const m of content.matchAll(/\bt\((`[^`]*`)\)/g)) {
    dynamicKeys.push({file, type: 'template_literal', expr: m[1].substring(0, 60)});
  }
  for (const m of content.matchAll(/\bt\((\w+)\)/g)) {
    const arg = m[1];
    if (arg === 'key' || arg === 'k' || arg === 'tKey' || arg === 'translationKey' || arg === 'id') continue;
    // Check if this is a variable reference (not a string literal)
    if (/^[a-zA-Z_$]/.test(arg) && !dynamicKeys.some(d => d.file === file && d.expr === arg))
      dynamicKeys.push({file, type: 'variable', expr: arg});
  }
}

console.log('Total t() calls checked:', totalCalls);
console.log('Unique static keys:', allKeysFound.size);
console.log();

// Results
const summary = {
  'EN keys missing from en.json': enMissing,
  'ZH keys missing from zh-CN.json': zhMissing,
  'ZH values untranslated (== EN)': zhUntranslated,
};

for (const [label, items] of Object.entries(summary)) {
  console.log(label + ': ' + items.length);
  items.forEach(i => console.log('  ' + i.key + ' @ ' + i.file + (i.enVal ? ' → ' + JSON.stringify(i.enVal) : '')));
}

console.log();
console.log('Dynamic keys (variable/template — cannot auto-verify): ' + dynamicKeys.length);
// Show first 30 unique dynamic expressions
const uniqueDyn = [...new Set(dynamicKeys.map(d => d.expr))].sort();
uniqueDyn.slice(0, 30).forEach(d => console.log('  t(' + d + '...)'));
if (uniqueDyn.length > 30) console.log('  ... and ' + (uniqueDyn.length - 30) + ' more');

console.log();
const clean = enMissing.length === 0 && zhMissing.length === 0 && zhUntranslated.length === 0;
if (clean) {
  console.log('═══════════════════════════════════════════');
  console.log('  ✅ ALL STATIC KEYS FULLY COVERED');
  console.log('     English: ' + allKeysFound.size + '/' + allKeysFound.size + ' ✅');
  console.log('     Chinese: ' + allKeysFound.size + '/' + allKeysFound.size + ' ✅');
  console.log('═══════════════════════════════════════════');
}
