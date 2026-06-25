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

// Issue documents translations
const issueDocuments = {
  'issue.documents.documents': '文档',
  'issue.documents.newDocument': '新建文档',
  'issue.documents.new': '新建',
  'issue.documents.documentKey': '文档键',
  'issue.documents.optionalTitle': '标题（可选）',
  'issue.documents.markdownBody': 'Markdown 内容',
  'issue.documents.createDocument': '创建文档',
  'issue.documents.keyPatternError': '键只能包含字母、数字、连字符和下划线',
  'issue.documents.loadingRevisions': '加载修订版本...',
  'issue.documents.noRevisions': '无修订版本',
  'issue.documents.revisionHistory': '修订历史',
  'issue.documents.editDocument': '编辑文档',
  'issue.documents.downloadDocument': '下载文档',
  'issue.documents.viewDiff': '查看差异',
  'issue.documents.deleteDocument': '删除文档',
  'issue.documents.deleteConfirm': '确认删除',
  'issue.documents.deleting': '删除中...',
  'issue.documents.viewingRevision': '查看修订版本',
  'issue.documents.historicalPreview': '历史预览',
  'issue.documents.returnToLatest': '返回最新版本',
  'issue.documents.restoreRevision': '恢复修订版本',
  'issue.documents.restoreConfirm': '确认恢复',
  'issue.documents.restoring': '恢复中...',
  'issue.documents.compareWithPrevious': '与上一版本比较',
  'issue.documents.compareWithLatest': '与最新版本比较',
  'issue.documents.noChanges': '无更改',
  'issue.documents.changesFound': '找到更改',
  'issue.documents.revision': '修订版本',
  'issue.documents.revisionNumber': '修订版本号',
  'issue.documents.revisionDate': '修订日期',
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
Object.entries(issueDocuments).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} issue.documents keys`);
