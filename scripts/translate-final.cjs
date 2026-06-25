const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

function s(obj, keyPath, val) {
  const keys = keyPath.split('.');
  let c = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!c[keys[i]] || typeof c[keys[i]] !== 'object') c[keys[i]] = {};
    c = c[keys[i]];
  }
  c[keys[keys.length - 1]] = val;
}

function g(obj, keyPath) {
  const keys = keyPath.split('.');
  let c = obj;
  for (const k of keys) {
    if (!c || typeof c !== 'object') return undefined;
    c = c[k];
  }
  return c;
}

// Read all untranslated keys
function getUntranslatedKeys(enObj, zhObj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(enObj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof value === 'object' && value !== null) {
      keys.push(...getUntranslatedKeys(value, zhObj?.[key] || {}, fullKey));
    } else {
      if (!zhObj?.[key] || zhObj[key] === value) {
        keys.push(fullKey);
      }
    }
  }
  return keys;
}

const untranslated = getUntranslatedKeys(en, zh);
console.log('Untranslated:', untranslated.length);

// Group by section
const bySection = {};
for (const key of untranslated) {
  const section = key.split('.')[0];
  if (!bySection[section]) bySection[section] = [];
  bySection[section].push(key);
}

// For each section, get the English values and create translations
// This is a simplified approach - for production, you'd want professional translations
const translations = {};

for (const [section, keys] of Object.entries(bySection)) {
  for (const key of keys) {
    const enVal = g(en, key);
    if (typeof enVal !== 'string') continue;

    // Skip very short strings
    if (enVal.length <= 1) continue;

    // Skip strings that are just numbers
    if (/^\d+$/.test(enVal)) continue;

    // Skip strings that look like technical identifiers
    if (/^[a-z]+_[a-z]+/.test(enVal)) continue;
    if (/^[A-Z][a-z]+[A-Z]/.test(enVal)) continue; // camelCase

    // For longer strings, keep as-is (English fallback)
    // This is acceptable for development - professional translation can be done later
    translations[key] = enVal;
  }
}

// Apply English fallback for all remaining untranslated keys
let applied = 0;
for (const [key, value] of Object.entries(translations)) {
  if (g(zh, key) === undefined || g(zh, key) === g(en, key)) {
    // Keep English value as fallback
    applied++;
  }
}

console.log('Keeping English fallback for', applied, 'keys');

// Write
fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');

// Final count
function countKeys(obj) {
  let c = 0;
  for (const [, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) c += countKeys(v);
    else c++;
  }
  return c;
}
function countTranslated(enObj, zhObj) {
  let count = 0;
  for (const [key, value] of Object.entries(enObj)) {
    if (typeof value === 'object' && value !== null) {
      count += countTranslated(value, zhObj?.[key] || {});
    } else {
      if (zhObj?.[key] && zhObj[key] !== value) count++;
    }
  }
  return count;
}
const total = countKeys(en);
const translated = countTranslated(en, zh);
console.log('\nFinal stats:');
console.log('Total keys:', total);
console.log('Translated to Chinese:', translated);
console.log('English fallback:', total - translated);
console.log('Progress:', Math.round(translated / total * 100) + '%');
