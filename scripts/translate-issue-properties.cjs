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

// Issue propertiesPage translations
const issuePropertiesPage = {
  'issue.propertiesPage.noBlockers': '没有阻塞项',
  'issue.propertiesPage.addBlocker': '添加阻塞项',
  'issue.propertiesPage.removeBlockerTitle': '移除阻塞项？',
  'issue.propertiesPage.removeBlockerButton': '移除阻塞项',
  'issue.propertiesPage.showLess': '收起',
  'issue.propertiesPage.andNMore': '还有 {{count}} 个...',
  'issue.propertiesPage.searchTasks': '搜索任务...',
  'issue.propertiesPage.searchLabels': '搜索标签...',
  'issue.propertiesPage.searchProjects': '搜索项目...',
  'issue.propertiesPage.newLabel': '新建标签',
  'issue.propertiesPage.createLabel': '创建标签',
  'issue.propertiesPage.creatingLabel': '创建中…',
  'issue.propertiesPage.boardUsers': '看板用户',
  'issue.propertiesPage.noMatches': '无匹配项。',
  'issue.propertiesPage.searchReviewers': '搜索审阅者...',
  'issue.propertiesPage.searchApprovers': '搜索审批者...',
  'issue.propertiesPage.noReviewers': '无审阅者',
  'issue.propertiesPage.noApprovers': '无审批者',
  'issue.propertiesPage.runReviewNow': '立即运行审阅',
  'issue.propertiesPage.runApprovalNow': '立即运行审批',
  'issue.propertiesPage.noAssignee': '未分配',
  'issue.propertiesPage.assignedTo': '分配给',
  'issue.propertiesPage.removeAssignee': '移除分配',
  'issue.propertiesPage.setAssignee': '设置分配人',
  'issue.propertiesPage.noPriority': '无优先级',
  'issue.propertiesPage.setPriority': '设置优先级',
  'issue.propertiesPage.noSize': '无大小',
  'issue.propertiesPage.setSize': '设置大小',
  'issue.propertiesPage.noDueDate': '无截止日期',
  'issue.propertiesPage.setDueDate': '设置截止日期',
  'issue.propertiesPage.removeDueDate': '移除截止日期',
  'issue.propertiesPage.noStartDate': '无开始日期',
  'issue.propertiesPage.setStartDate': '设置开始日期',
  'issue.propertiesPage.removeStartDate': '移除开始日期',
  'issue.propertiesPage.noProject': '无项目',
  'issue.propertiesPage.setProject': '设置项目',
  'issue.propertiesPage.removeProject': '移除项目',
  'issue.propertiesPage.noMilestone': '无里程碑',
  'issue.propertiesPage.setMilestone': '设置里程碑',
  'issue.propertiesPage.removeMilestone': '移除里程碑',
  'issue.propertiesPage.noLabels': '无标签',
  'issue.propertiesPage.addLabel': '添加标签',
  'issue.propertiesPage.removeLabel': '移除标签',
  'issue.propertiesPage.noSprint': '无迭代',
  'issue.propertiesPage.setSprint': '设置迭代',
  'issue.propertiesPage.removeSprint': '移除迭代',
  'issue.propertiesPage.noParent': '无父任务',
  'issue.propertiesPage.setParent': '设置父任务',
  'issue.propertiesPage.removeParent': '移除父任务',
  'issue.propertiesPage.noDependencies': '无依赖',
  'issue.propertiesPage.addDependency': '添加依赖',
  'issue.propertiesPage.removeDependency': '移除依赖',
  'issue.propertiesPage.noRelatedIssues': '无关联问题',
  'issue.propertiesPage.addRelatedIssue': '添加关联问题',
  'issue.propertiesPage.removeRelatedIssue': '移除关联问题',
  'issue.propertiesPage.noWatchers': '无关注者',
  'issue.propertiesPage.addWatcher': '添加关注者',
  'issue.propertiesPage.removeWatcher': '移除关注者',
  'issue.propertiesPage.noSubscribers': '无订阅者',
  'issue.propertiesPage.addSubscriber': '添加订阅者',
  'issue.propertiesPage.removeSubscriber': '移除订阅者',
  'issue.propertiesPage.noEstimatedTime': '无预估时间',
  'issue.propertiesPage.setEstimatedTime': '设置预估时间',
  'issue.propertiesPage.removeEstimatedTime': '移除预估时间',
  'issue.propertiesPage.noActualTime': '无实际时间',
  'issue.propertiesPage.setActualTime': '设置实际时间',
  'issue.propertiesPage.removeActualTime': '移除实际时间',
  'issue.propertiesPage.noCategory': '无分类',
  'issue.propertiesPage.setCategory': '设置分类',
  'issue.propertiesPage.removeCategory': '移除分类',
  'issue.propertiesPage.noSeverity': '无严重程度',
  'issue.propertiesPage.setSeverity': '设置严重程度',
  'issue.propertiesPage.removeSeverity': '移除严重程度',
  'issue.propertiesPage.noType': '无类型',
  'issue.propertiesPage.setType': '设置类型',
  'issue.propertiesPage.removeType': '移除类型',
  'issue.propertiesPage.noStatus': '无状态',
  'issue.propertiesPage.setStatus': '设置状态',
  'issue.propertiesPage.removeStatus': '移除状态',
  'issue.propertiesPage.noResolution': '无解决方案',
  'issue.propertiesPage.setResolution': '设置解决方案',
  'issue.propertiesPage.removeResolution': '移除解决方案',
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
Object.entries(issuePropertiesPage).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} issue.propertiesPage keys`);
