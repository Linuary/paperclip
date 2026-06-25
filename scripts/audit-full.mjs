import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'ui/src/i18n/locales/en.json'), 'utf-8'));
const zh = JSON.parse(fs.readFileSync(path.join(ROOT, 'ui/src/i18n/locales/zh-CN.json'), 'utf-8'));

// Read file list
const i18nFiles = fs.readFileSync(path.join(ROOT, '.i18n_files.txt'), 'utf-8')
  .trim().split('\n').filter(Boolean);

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

const enMissing = [];
const zhMissing = [];
const zhUntranslated = [];
const allKeys = new Set();
let totalCalls = 0;
let dynamicCount = 0;
const dynamicExamples = [];

for (const file of i18nFiles) {
  let content;
  try { content = fs.readFileSync(file, 'utf-8'); }
  catch { continue; }

  // single-quoted keys: t('key')
  const singleRe = /\bt\('([a-zA-Z][a-zA-Z0-9_.-]*)'\)/g;
  for (const m of content.matchAll(singleRe)) {
    const key = m[1];
    allKeys.add(key);
    totalCalls++;
    const enV = getString(en, key);
    const zhV = getString(zh, key);
    if (!enV && !enMissing.some(r => r.key === key))
      enMissing.push({ key, file: file.replace(ROOT + '/', '') });
    if (!zhV && !zhMissing.some(r => r.key === key))
      zhMissing.push({ key, file: file.replace(ROOT + '/', '') });
    if (enV && zhV && enV === zhV && !okUntranslated.has(enV) && enV.length > 3)
      zhUntranslated.push({ key, val: enV.substring(0, 60), file: file.replace(ROOT + '/', '') });
  }

  // double-quoted keys: t("key") or t("key",
  const doubleRe = /\bt\("([a-zA-Z][a-zA-Z0-9_.-]*)"/g;
  for (const m of content.matchAll(doubleRe)) {
    const key = m[1];
    allKeys.add(key);
    totalCalls++;
    const enV = getString(en, key);
    const zhV = getString(zh, key);
    if (!enV && !enMissing.some(r => r.key === key))
      enMissing.push({ key, file: file.replace(ROOT + '/', '') });
    if (!zhV && !zhMissing.some(r => r.key === key))
      zhMissing.push({ key, file: file.replace(ROOT + '/', '') });
    if (enV && zhV && enV === zhV && !okUntranslated.has(enV) && enV.length > 3)
      zhUntranslated.push({ key, val: enV.substring(0, 60), file: file.replace(ROOT + '/', '') });
  }

  // Count dynamic t() calls
  const tplRe = /\bt\(`/g;
  for (const _ of content.matchAll(tplRe)) dynamicCount++;
  const varRe = /\bt\(([a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*)\)/g;
  for (const m of content.matchAll(varRe)) {
    const arg = m[1];
    if (arg !== 'key' && arg !== 'k' && arg !== 'tKey' && arg !== 'id' && arg !== 'ns' && arg !== 'i18n') {
      dynamicCount++;
      if (dynamicExamples.length < 10) dynamicExamples.push({ arg, file: file.replace(ROOT + '/', '') });
    }
  }
}

console.log('═══════════════════════════════════════════');
console.log('  i18n COVERAGE AUDIT');
console.log('═══════════════════════════════════════════');
console.log('Files using i18n:  ' + i18nFiles.length);
console.log('Total t() calls:   ' + totalCalls);
console.log('Unique static keys:' + allKeys.size);
console.log('Dynamic t() calls: ' + dynamicCount);
console.log();
console.log('── Scene 1: ENGLISH mode ──');
console.log('  Keys with en.json value: ' + (allKeys.size - enMissing.length) + '/' + allKeys.size);
if (enMissing.length === 0) {
  console.log('  ✅ All keys present in en.json');
} else {
  console.log('  ❌ Missing ' + enMissing.length + ' keys:');
  enMissing.forEach(r => console.log('    ' + r.key + ' @ ' + r.file));
}
console.log();
console.log('── Scene 2: CHINESE mode ──');
console.log('  Keys with zh-CN.json value: ' + (allKeys.size - zhMissing.length) + '/' + allKeys.size);
console.log('  Keys with proper translation: ' + (allKeys.size - zhUntranslated.length) + '/' + allKeys.size);
if (zhMissing.length === 0 && zhUntranslated.length === 0) {
  console.log('  ✅ All keys present and translated in zh-CN.json');
} else {
  if (zhMissing.length > 0) {
    console.log('  ❌ Missing ' + zhMissing.length + ' keys:');
    zhMissing.forEach(r => console.log('    ' + r.key + ' @ ' + r.file));
  }
  if (zhUntranslated.length > 0) {
    console.log('  ❌ Untranslated ' + zhUntranslated.length + ' keys:');
    zhUntranslated.forEach(r => console.log('    ' + r.key + ': ' + JSON.stringify(r.val)));
  }
}
console.log();
console.log('── Dynamic keys (cannot auto-verify) ──');
console.log('  Count: ' + dynamicCount);
console.log('  Examples:');
dynamicExamples.forEach(d => console.log('    t(' + d.arg + ') in ' + d.file));
console.log();
const clean = enMissing.length === 0 && zhMissing.length === 0 && zhUntranslated.length === 0;
if (clean) {
  console.log('═══════════════════════════════════════════');
  console.log('  ✅ 100% COVERAGE — BOTH MODES VERIFIED');
  console.log('═══════════════════════════════════════════');
} else {
  console.log('❌ ISSUES FOUND — see above');
}
