const fs = require('fs');
const path = require('path');

const zhPath = path.join(__dirname, '..', 'ui', 'src', 'i18n', 'locales', 'zh-CN.json');
const enPath = path.join(__dirname, '..', 'ui', 'src', 'i18n', 'locales', 'en.json');

const zhCN = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix ? prefix + '.' : '';
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flatten(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {});
}

const enFlat = flatten(en);

// Secrets form translations
const secretsForm = {
  'secrets.form.name': '名称',
  'secrets.form.key': '键',
  'secrets.form.keyOptional': '键（可选）',
  'secrets.form.autoFromName': '从名称自动生成',
  'secrets.form.provider': '提供者',
  'secrets.form.notConfigured': '未配置',
  'secrets.form.externalOnly': '仅限外部',
  'secrets.form.providerVault': '提供者保险库',
  'secrets.form.deploymentDefault': '部署默认',
  'secrets.form.defaultValue': '默认值',
  'secrets.form.managedValue': '托管值',
  'secrets.form.externalReference': '外部引用',
  'secrets.form.value': '值',
  'secrets.form.storedOnceNeverRedisplayed': '存储一次，永不重新显示',
  'secrets.form.description': '描述',
  'secrets.form.descriptionOptional': '描述（可选）',
  'secrets.form.descriptionPlaceholder': '输入描述...',
  'secrets.form.externalRefPlaceholder': '输入外部引用...',
  'secrets.form.externalRefHelp': '外部引用帮助',
  'secrets.form.newValue': '新值',
  'secrets.form.confirmValue': '确认值',
  'secrets.form.currentValue': '当前值',
  'secrets.form.noValue': '无值',
  'secrets.form.hidden': '已隐藏',
  'secrets.form.visible': '可见',
  'secrets.form.show': '显示',
  'secrets.form.hide': '隐藏',
  'secrets.form.copy': '复制',
  'secrets.form.copied': '已复制',
  'secrets.form.paste': '粘贴',
  'secrets.form.clear': '清除',
  'secrets.form.reset': '重置',
  'secrets.form.generate': '生成',
  'secrets.form.random': '随机',
  'secrets.form.strong': '强',
  'secrets.form.weak': '弱',
  'secrets.form.medium': '中等',
  'secrets.form.strength': '强度',
  'secrets.form.length': '长度',
  'secrets.form.includeUppercase': '包含大写字母',
  'secrets.form.includeLowercase': '包含小写字母',
  'secrets.form.includeNumbers': '包含数字',
  'secrets.form.includeSymbols': '包含符号',
  'secrets.form.excludeAmbiguous': '排除易混淆字符',
};

function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

let translatedCount = 0;
Object.entries(secretsForm).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} secrets.form keys`);
