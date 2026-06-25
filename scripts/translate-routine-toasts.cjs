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

// Routine toasts translations
const routineToasts = {
  'routine.toasts.created': '例程已创建',
  'routine.toasts.createdWithAgent': '例程已创建，使用代理 {{agent}}',
  'routine.toasts.createdDraft': '例程草稿已创建',
  'routine.toasts.failedToUpdate': '更新失败',
  'routine.toasts.couldNotUpdate': '无法更新例程',
  'routine.toasts.runFailed': '运行失败',
  'routine.toasts.couldNotStartRun': '无法启动运行',
  'routine.toasts.defaultAgentRequired': '需要默认代理',
  'routine.toasts.setDefaultAgent': '请设置默认代理',
  'routine.toasts.runStarted': '运行已启动',
  'routine.toasts.saved': '例程已保存',
  'routine.toasts.automationPaused': '自动化已暂停',
  'routine.toasts.automationEnabled': '自动化已启用',
  'routine.toasts.failedToSave': '保存失败',
  'routine.toasts.couldNotSave': '无法保存例程',
  'routine.toasts.conflictTitle': '冲突',
  'routine.toasts.conflictBody': '例程已被其他人修改',
  'routine.toasts.triggerCreated': '触发器已创建',
  'routine.toasts.triggerAdded': '触发器已添加',
  'routine.toasts.triggerAddedBody': '触发器已添加到例程',
  'routine.toasts.triggerRemoved': '触发器已移除',
  'routine.toasts.triggerRemovedBody': '触发器已从例程中移除',
  'routine.toasts.triggerUpdated': '触发器已更新',
  'routine.toasts.triggerUpdatedBody': '触发器已更新',
  'routine.toasts.deleted': '例程已删除',
  'routine.toasts.deletedBody': '例程已永久删除',
  'routine.toasts.archived': '例程已归档',
  'routine.toasts.archivedBody': '例程已归档',
  'routine.toasts.unarchived': '例程已取消归档',
  'routine.toasts.unarchivedBody': '例程已取消归档',
  'routine.toasts.duplicated': '例程已复制',
  'routine.toasts.duplicatedBody': '例程已复制',
  'routine.toasts.moved': '例程已移动',
  'routine.toasts.movedBody': '例程已移动到新位置',
  'routine.toasts.renamed': '例程已重命名',
  'routine.toasts.renamedBody': '例程已重命名',
  'routine.toasts.descriptionUpdated': '描述已更新',
  'routine.toasts.descriptionUpdatedBody': '例程描述已更新',
  'routine.toasts.scheduleUpdated': '计划已更新',
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
Object.entries(routineToasts).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} routine.toasts keys`);
