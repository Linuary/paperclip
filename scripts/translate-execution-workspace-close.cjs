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

// Execution workspace close translations
const executionWorkspaceClose = {
  'executionWorkspace.close.retryClose': '重试关闭',
  'executionWorkspace.close.closeWorkspace': '关闭工作区',
  'executionWorkspace.close.archiveDescriptionPrefix': '归档描述前缀',
  'executionWorkspace.close.archiveDescriptionSuffix': '归档描述后缀',
  'executionWorkspace.close.checkingSafeToClose': '检查是否可以安全关闭',
  'executionWorkspace.close.failedToInspectReadiness': '检查就绪状态失败',
  'executionWorkspace.close.closeBlocked': '关闭已阻止',
  'executionWorkspace.close.closeAllowedWithWarnings': '允许关闭但有警告',
  'executionWorkspace.close.closeReady': '关闭就绪',
  'executionWorkspace.close.sharedWorkspaceDescription': '共享工作区描述',
  'executionWorkspace.close.independentCheckoutDescription': '独立检出描述',
  'executionWorkspace.close.projectPrimaryDescription': '项目主要描述',
  'executionWorkspace.close.disposableDescription': '一次性描述',
  'executionWorkspace.close.blockingTasks': '阻塞任务',
  'executionWorkspace.close.blockingReasons': '阻塞原因',
  'executionWorkspace.close.warnings': '警告',
  'executionWorkspace.close.gitStatus': 'Git 状态',
  'executionWorkspace.close.branch': '分支',
  'executionWorkspace.close.baseRef': '基础引用',
  'executionWorkspace.close.mergedIntoBase': '已合并到基础',
  'executionWorkspace.close.uncommittedChanges': '未提交的更改',
  'executionWorkspace.close.untrackedFiles': '未跟踪的文件',
  'executionWorkspace.close.modifiedFiles': '已修改的文件',
  'executionWorkspace.close.deletedFiles': '已删除的文件',
  'executionWorkspace.close.newFiles': '新文件',
  'executionWorkspace.close.renamedFiles': '已重命名的文件',
  'executionWorkspace.close.copiedFiles': '已复制的文件',
  'executionWorkspace.close.typeChangedFiles': '类型已更改的文件',
  'executionWorkspace.close.conflictedFiles': '冲突的文件',
  'executionWorkspace.close.stagedChanges': '已暂存的更改',
  'executionWorkspace.close.unstagedChanges': '未暂存的更改',
  'executionWorkspace.close.stashCount': '暂存数量',
  'executionWorkspace.close.stashes': '暂存',
  'executionWorkspace.close.lastCommit': '最后提交',
  'executionWorkspace.close.lastCommitMessage': '最后提交消息',
  'executionWorkspace.close.lastCommitDate': '最后提交日期',
  'executionWorkspace.close.lastCommitAuthor': '最后提交作者',
  'executionWorkspace.close.lastCommitHash': '最后提交哈希',
  'executionWorkspace.close.lastCommitBranch': '最后提交分支',
  'executionWorkspace.close.lastCommitRemote': '最后提交远程',
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
Object.entries(executionWorkspaceClose).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} executionWorkspace.close keys`);
