const fs = require('fs');
const path = require('path');

const zhPath = path.join(__dirname, '..', 'ui', 'src', 'i18n', 'locales', 'zh-CN.json');
const enPath = path.join(__dirname, '..', 'ui', 'src', 'i18n', 'locales', 'en.json');

const zhCN = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Issue newDialog translations based on actual en.json structure
const issueNewDialog = {
  'issue.newDialog.newTask': '新建任务',
  'issue.newDialog.newSubTask': '新建子任务',
  'issue.newDialog.taskTitle': '任务标题',
  'issue.newDialog.addDescription': '添加描述...',
  'issue.newDialog.for': '对于',
  'issue.newDialog.in': '在',
  'issue.newDialog.project': '项目',
  'issue.newDialog.noProject': '无项目',
  'issue.newDialog.searchProjects': '搜索项目...',
  'issue.newDialog.noProjectsFound': '未找到项目。',
  'issue.newDialog.reviewer': '审阅者',
  'issue.newDialog.noReviewer': '无审阅者',
  'issue.newDialog.searchReviewers': '搜索审阅者...',
  'issue.newDialog.noReviewersFound': '未找到审阅者。',
  'issue.newDialog.approver': '审批者',
  'issue.newDialog.noApprover': '无审批者',
  'issue.newDialog.searchApprovers': '搜索审批者...',
  'issue.newDialog.noApproversFound': '未找到审批者。',
  'issue.newDialog.addReviewerApprover': '添加审阅者或审批者',
  'issue.newDialog.addReviewerApproverWatchdog': '添加审阅者、审批者或监督者',
  'issue.newDialog.subTaskOf': '子任务于',
  'issue.newDialog.executionWorkspace': '执行工作区',
  'issue.newDialog.executionWorkspaceDescription': '控制此任务在共享工作区、新的隔离工作区还是现有工作区中运行。',
  'issue.newDialog.chooseExistingWorkspace': '选择现有工作区',
  'issue.newDialog.reusingWorkspace': '正在重用来自 {{source}} 的 {{name}}。',
  'issue.newDialog.existingExecutionWorkspace': '现有执行工作区',
  'issue.newDialog.parentWorkspaceWarning': '警告：此子任务将不再使用父任务工作区',
  'issue.newDialog.modelLane': '模型通道',
  'issue.newDialog.primary': '主要',
  'issue.newDialog.cheap': '经济',
  'issue.newDialog.custom': '自定义',
  'issue.newDialog.cheapDescription': '发送 modelProfile: "cheap"',
  'issue.newDialog.cheapAdapterDefault': '适配器默认',
  'issue.newDialog.cheapUsesAgentProfile': '使用代理配置的经济配置',
  'issue.newDialog.cheapFallback': '如果没有配置经济配置，则回退到主要模型',
  'issue.newDialog.primaryDescription': '在代理的主要模型上运行。',
  'issue.newDialog.customDescription': '仅覆盖此任务的模型和工作量。',
  'issue.newDialog.model': '模型',
  'issue.newDialog.defaultModel': '默认模型',
  'issue.newDialog.searchModels': '搜索模型...',
  'issue.newDialog.noModelsFound': '未找到模型。',
  'issue.newDialog.thinkingEffort': '思考工作量',
  'issue.newDialog.enableChrome': '启用 Chrome (--chrome)',
  'issue.newDialog.documents': '文档',
  'issue.newDialog.attachments': '附件',
  'issue.newDialog.removeDocument': '移除文档',
  'issue.newDialog.removeAttachment': '移除附件',
  'issue.newDialog.priority': '优先级',
  'issue.newDialog.upload': '上传',
  'issue.newDialog.startDate': '开始日期',
  'issue.newDialog.dueDate': '截止日期',
  'issue.newDialog.discardDraft': '丢弃草稿',
  'issue.newDialog.creatingIssue': '正在创建问题...',
  'issue.newDialog.creating': '创建中...',
  'issue.newDialog.createSubTask': '创建子任务',
  'issue.newDialog.createTask': '创建任务',
  'issue.newDialog.failedToCreate': '创建任务失败。请重试。',
  'issue.newDialog.createdWithWarnings': '创建 {{ref}} 时有上传警告',
  'issue.newDialog.uploadWarnings': '{{count}} 个暂存的 {{fileWord}} 无法添加。',
  'issue.newDialog.file': '文件',
  'issue.newDialog.files': '文件',
  'issue.newDialog.openRef': '打开 {{ref}}',
  'issue.newDialog.backlogDescription': '已停放 — 分配人不会被唤醒',
  'issue.newDialog.todoDescription': '可执行 — 分配人将被唤醒',
  'issue.newDialog.assignedBacklogNote': '分配意味着可执行意图 — 仅在故意停放此任务时才保持 <b>待办</b> 状态。分配人不会被唤醒，直到状态移至 <b>待办</b> 或 <b>进行中</b>。',
  'issue.newDialog.lowTrustNote': '低信任度审阅代理。它只能在其分配的审阅边界内行动；问题、项目或运行策略定义具体范围。',
  'issue.newDialog.watchdogAgent': '监督代理',
  'issue.newDialog.watchdogInstructions': '指令',
  'issue.newDialog.watchdogInstructionsOptional': '（可选）',
  'issue.newDialog.watchdogPlaceholder': '监督者应该监督什么以及如何保持工作推进？',
  'issue.newDialog.watchdogSelectAgent': '选择代理',
  'issue.newDialog.watchdogNoAgent': '无监督代理',
  'issue.newDialog.watchdogSearchAgents': '搜索代理...',
  'issue.newDialog.watchdogNoAgentsFound': '未找到代理。',
  'issue.newDialog.watchdogRemove': '移除',
  'issue.newDialog.watchdogDone': '完成',
  'issue.newDialog.setWatchdog': '设置监督者',
  'issue.newDialog.configureWatchdog': '配置监督者',
  'issue.newDialog.claudeOptions': 'Claude 选项',
  'issue.newDialog.codexOptions': 'Codex 选项',
  'issue.newDialog.openCodeOptions': 'OpenCode 选项',
  'issue.newDialog.agentOptions': '代理选项',
  'issue.newDialog.projectDefault': '项目默认',
  'issue.newDialog.newIsolatedWorkspace': '新建隔离工作区',
  'issue.newDialog.reuseExistingWorkspace': '重用现有工作区',
  'issue.newDialog.existingWorkspaceStatus': '{{name}} · {{status}} · {{branch}}'
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
