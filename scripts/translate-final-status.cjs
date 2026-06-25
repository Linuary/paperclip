const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

function g(obj, keyPath) {
  const keys = keyPath.split('.');
  let c = obj;
  for (const k of keys) {
    if (!c || typeof c !== 'object') return undefined;
    c = c[k];
  }
  return c;
}

function s(obj, keyPath, val) {
  const keys = keyPath.split('.');
  let c = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!c[keys[i]] || typeof c[keys[i]] !== 'object') c[keys[i]] = {};
    c = c[keys[i]];
  }
  c[keys[keys.length - 1]] = val;
}

// Get ALL untranslated keys
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
console.log('Total untranslated keys from en.json:', untranslated.length);

// Group by section
const bySection = {};
for (const key of untranslated) {
  const section = key.split('.').slice(0, 2).join('.');
  if (!bySection[section]) bySection[section] = [];
  bySection[section].push(key);
}

// Show top sections
const sorted = Object.entries(bySection).sort((a, b) => b[1].length - a[1].length);
console.log('\nTop 20 untranslated sections:');
for (const [sec, keys] of sorted.slice(0, 20)) {
  console.log(sec + ': ' + keys.length + ' keys');
}

// Now let's translate ALL remaining keys by their English values
// We'll use a comprehensive mapping based on common patterns
const dict = {};

// Build dict from all en.json string values
for (const key of untranslated) {
  const val = g(en, key);
  if (typeof val === 'string' && val.length > 0) {
    dict[key] = val; // Store English value for processing
  }
}

// Simple word-level translations for common English words
const wordMap = {
  'the': '', 'a': '', 'an': '', 'is': '', 'are': '', 'was': '', 'were': '',
  'be': '', 'been': '', 'being': '', 'have': '', 'has': '', 'had': '',
  'do': '', 'does': '', 'did': '', 'will': '', 'would': '', 'could': '',
  'should': '', 'may': '', 'might': '', 'shall': '', 'can': '',
  'this': '', 'that': '', 'these': '', 'those': '', 'it': '', 'its': '',
  'i': '', 'me': '', 'my': '', 'we': '', 'us': '', 'our': '',
  'you': '', 'your': '', 'he': '', 'him': '', 'his': '', 'she': '', 'her': '',
  'they': '', 'them': '', 'their': '', 'what': '', 'which': '', 'who': '',
  'whom': '', 'where': '', 'when': '', 'why': '', 'how': '',
  'not': '', 'no': '', 'nor': '', 'and': '', 'but': '', 'or': '', 'if': '',
  'then': '', 'else': '', 'so': '', 'because': '', 'since': '', 'while': '',
  'although': '', 'though': '', 'even': '', 'just': '', 'only': '',
  'very': '', 'too': '', 'quite': '', 'rather': '', 'somewhat': '',
  'more': '', 'most': '', 'less': '', 'least': '', 'much': '', 'many': '',
  'some': '', 'any': '', 'all': '', 'each': '', 'every': '', 'both': '',
  'few': '', 'several': '', 'other': '', 'another': '', 'such': '',
  'here': '', 'there': '', 'now': '', 'then': '', 'today': '', 'tomorrow': '',
  'yesterday': '', 'always': '', 'never': '', 'sometimes': '', 'often': '',
  'usually': '', 'generally': '', 'typically': '', 'normally': '',
  'in': '', 'on': '', 'at': '', 'to': '', 'for': '', 'with': '', 'by': '',
  'from': '', 'of': '', 'about': '', 'into': '', 'through': '', 'during': '',
  'before': '', 'after': '', 'above': '', 'below': '', 'between': '',
  'under': '', 'over': '', 'up': '', 'down': '', 'out': '', 'off': '',
  'again': '', 'further': '', 'than': '', 'once': '',
};

console.log('\nTotal words in wordMap:', Object.keys(wordMap).length);
console.log('Total keys in dict:', Object.keys(dict).length);

// For now, let's just ensure all keys exist in zh-CN.json
// We'll set English values as fallback for untranslated keys
let fallbackCount = 0;
for (const key of untranslated) {
  const val = g(en, key);
  if (typeof val === 'string') {
    // Only set if not already translated
    const current = g(zh, key);
    if (!current || current === val) {
      // Keep English as fallback - it's already there from the sync
      fallbackCount++;
    }
  }
}

console.log('Keys with English fallback:', fallbackCount);

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
console.log('\n=== Final Status ===');
console.log('Total keys:', total);
console.log('Translated to Chinese:', translated);
console.log('English fallback:', total - translated);
console.log('Progress:', Math.round(translated / total * 100) + '%');
