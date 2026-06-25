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

// Issue treeControl translations
const issueTreeControl = {
  'issue.treeControl.pauseSubtree': '暂停子树',
  'issue.treeControl.resumeSubtree': '恢复子树',
  'issue.treeControl.cancelSubtree': '取消子树',
  'issue.treeControl.restoreSubtree': '恢复子树',
  'issue.treeControl.pauseWork': '暂停工作',
  'issue.treeControl.resumeWork': '恢复工作',
  'issue.treeControl.pauseSubtreeHelp': '暂停此任务及其所有子任务的工作。',
  'issue.treeControl.resumeSubtreeHelp': '恢复此任务及其所有子任务的工作。',
  'issue.treeControl.cancelSubtreeHelp': '取消此任务及其所有子任务。',
  'issue.treeControl.restoreSubtreeHelp': '恢复此任务及其所有子任务。',
  'issue.treeControl.pauseWorkHelp': '暂停此任务的工作。',
  'issue.treeControl.resumeWorkHelp': '恢复此任务的工作。',
  'issue.treeControl.reason': '原因',
  'issue.treeControl.reasonPlaceholder': '输入原因...',
  'issue.treeControl.wakeAffectedAgents': '唤醒受影响的代理',
  'issue.treeControl.noAgentsToWake': '没有需要唤醒的代理',
  'issue.treeControl.wakeAgentsAfter': '之后唤醒代理',
  'issue.treeControl.cancelWarning': '警告：此操作将取消此任务及其所有子任务。',
  'issue.treeControl.confirmCancel': '确认取消',
  'issue.treeControl.close': '关闭',
  'issue.treeControl.apply': '应用',
  'issue.treeControl.cancel': '取消',
  'issue.treeControl.confirm': '确认',
  'issue.treeControl.yes': '是',
  'issue.treeControl.no': '否',
  'issue.treeControl.ok': '确定',
  'issue.treeControl.save': '保存',
  'issue.treeControl.delete': '删除',
  'issue.treeControl.edit': '编辑',
  'issue.treeControl.create': '创建',
  'issue.treeControl.update': '更新',
  'issue.treeControl.remove': '移除',
  'issue.treeControl.add': '添加',
  'issue.treeControl.select': '选择',
  'issue.treeControl.deselect': '取消选择',
  'issue.treeControl.selectAll': '全选',
  'issue.treeControl.deselectAll': '取消全选',
  'issue.treeControl.invertSelection': '反选',
  'issue.treeControl.expand': '展开',
  'issue.treeControl.collapse': '折叠',
  'issue.treeControl.expandAll': '全部展开',
  'issue.treeControl.collapseAll': '全部折叠',
  'issue.treeControl.refresh': '刷新',
  'issue.treeControl.reload': '重新加载',
  'issue.treeControl.reset': '重置',
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
Object.entries(issueTreeControl).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} issue.treeControl keys`);
