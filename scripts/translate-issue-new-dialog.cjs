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

// Issue newDialog translations
const issueNewDialog = {
  'issue.newDialog.title': '新建问题',
  'issue.newDialog.createIssue': '创建问题',
  'issue.newDialog.creating': '创建中...',
  'issue.newDialog.cancel': '取消',
  'issue.newDialog.titleLabel': '标题',
  'issue.newDialog.titlePlaceholder': '输入问题标题...',
  'issue.newDialog.descriptionLabel': '描述',
  'issue.newDialog.descriptionPlaceholder': '输入问题描述...',
  'issue.newDialog.assigneeLabel': '分配给',
  'issue.newDialog.assigneePlaceholder': '选择分配人...',
  'issue.newDialog.priorityLabel': '优先级',
  'issue.newDialog.priorityPlaceholder': '选择优先级...',
  'issue.newDialog.sizeLabel': '大小',
  'issue.newDialog.sizePlaceholder': '选择大小...',
  'issue.newDialog.dueDateLabel': '截止日期',
  'issue.newDialog.dueDatePlaceholder': '选择截止日期...',
  'issue.newDialog.startDateLabel': '开始日期',
  'issue.newDialog.startDatePlaceholder': '选择开始日期...',
  'issue.newDialog.projectLabel': '项目',
  'issue.newDialog.projectPlaceholder': '选择项目...',
  'issue.newDialog.milestoneLabel': '里程碑',
  'issue.newDialog.milestonePlaceholder': '选择里程碑...',
  'issue.newDialog.labelsLabel': '标签',
  'issue.newDialog.labelsPlaceholder': '选择标签...',
  'issue.newDialog.sprintLabel': '迭代',
  'issue.newDialog.sprintPlaceholder': '选择迭代...',
  'issue.newDialog.parentLabel': '父任务',
  'issue.newDialog.parentPlaceholder': '选择父任务...',
  'issue.newDialog.dependenciesLabel': '依赖',
  'issue.newDialog.dependenciesPlaceholder': '选择依赖...',
  'issue.newDialog.relatedIssuesLabel': '关联问题',
  'issue.newDialog.relatedIssuesPlaceholder': '选择关联问题...',
  'issue.newDialog.watchersLabel': '关注者',
  'issue.newDialog.watchersPlaceholder': '选择关注者...',
  'issue.newDialog.subscribersLabel': '订阅者',
  'issue.newDialog.subscribersPlaceholder': '选择订阅者...',
  'issue.newDialog.estimatedTimeLabel': '预估时间',
  'issue.newDialog.estimatedTimePlaceholder': '输入预估时间...',
  'issue.newDialog.categoryLabel': '分类',
  'issue.newDialog.categoryPlaceholder': '选择分类...',
  'issue.newDialog.severityLabel': '严重程度',
  'issue.newDialog.severityPlaceholder': '选择严重程度...',
  'issue.newDialog.typeLabel': '类型',
  'issue.newDialog.typePlaceholder': '选择类型...',
  'issue.newDialog.statusLabel': '状态',
  'issue.newDialog.statusPlaceholder': '选择状态...',
  'issue.newDialog.resolutionLabel': '解决方案',
  'issue.newDialog.resolutionPlaceholder': '选择解决方案...',
  'issue.newDialog.templateLabel': '模板',
  'issue.newDialog.templatePlaceholder': '选择模板...',
  'issue.newDialog.tagsLabel': '标签',
  'issue.newDialog.tagsPlaceholder': '输入标签...',
  'issue.newDialog.blockersLabel': '阻塞项',
  'issue.newDialog.blockersPlaceholder': '添加阻塞项...',
  'issue.newDialog.attachmentsLabel': '附件',
  'issue.newDialog.attachmentsPlaceholder': '添加附件...',
  'issue.newDialog.commentsLabel': '评论',
  'issue.newDialog.commentsPlaceholder': '添加评论...',
  'issue.newDialog.activityLabel': '活动',
  'issue.newDialog.activityPlaceholder': '查看活动...',
  'issue.newDialog.subtasksLabel': '子任务',
  'issue.newDialog.subtasksPlaceholder': '添加子任务...',
  'issue.newDialog.checklistLabel': '检查清单',
  'issue.newDialog.checklistPlaceholder': '添加检查项...',
  'issue.newDialog.timeTrackingLabel': '时间追踪',
  'issue.newDialog.timeTrackingPlaceholder': '记录时间...',
  'issue.newDialog.customFieldsLabel': '自定义字段',
  'issue.newDialog.customFieldsPlaceholder': '填写自定义字段...',
  'issue.newDialog.reviewLabel': '审阅',
  'issue.newDialog.reviewPlaceholder': '请求审阅...',
  'issue.newDialog.approvalLabel': '审批',
  'issue.newDialog.approvalPlaceholder': '请求审批...',
  'issue.newDialog.workflowLabel': '工作流',
  'issue.newDialog.workflowPlaceholder': '选择工作流...',
  'issue.newDialog.automationLabel': '自动化',
  'issue.newDialog.automationPlaceholder': '配置自动化...',
  'issue.newDialog.notificationsLabel': '通知',
  'issue.newDialog.notificationsPlaceholder': '配置通知...',
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
Object.entries(issueNewDialog).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} issue.newDialog keys`);
