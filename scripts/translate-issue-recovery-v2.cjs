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

// Issue recovery translations based on actual en.json keys
const issueRecovery = {
  'issue.recovery.title': '恢复操作：{{state}}',
  'issue.recovery.owner': '所有者',
  'issue.recovery.sourceRun': '源运行',
  'issue.recovery.correctiveRun': '纠正运行',
  'issue.recovery.evidence': '证据',
  'issue.recovery.nextAction': '下一步操作',
  'issue.recovery.wake': '唤醒',
  'issue.recovery.resolution': '解决方案',
  'issue.recovery.resolve': '解决…',
  'issue.recovery.resolveRecovery': '解决恢复',
  'issue.recovery.attemptOf': '尝试 {{current}} / {{max}}',
  'issue.recovery.timesOutSoon': '即将超时',
  'issue.recovery.recovery': '恢复：',
  'issue.recovery.board': '看板',
  'issue.recovery.system': '系统',
  'issue.recovery.unassignedPickOne': '未分配 — 选择一个以唤醒它们',
  'issue.recovery.returnsTo': '→ 返回到：',
  'issue.recovery.resolvedAs': '已解决为 {{outcome}}',
  'issue.recovery.observingWithoutInterrupting': '恢复正在观察而不中断实时运行。',
  'issue.recovery.staysOpenUntilDecision': '卡片保持打开状态，直到记录明确的决定。',
  'issue.recovery.kinds.missingDisposition': '缺少处置',
  'issue.recovery.kinds.strandedTask': '搁浅的任务',
  'issue.recovery.kinds.workspaceValidation': '工作区验证',
  'issue.recovery.kinds.configurationValidation': '配置验证',
  'issue.recovery.kinds.activeWatchdog': '活跃的监督者',
  'issue.recovery.kinds.graphLiveness': '图活跃度',
  'issue.recovery.headlines.missingDisposition': '此任务的运行已完成，但未选择下一步。',
  'issue.recovery.headlines.strandedTask': 'Paperclip 重试了此任务的最后一次运行，但仍然没有活跃的执行路径。',
  'issue.recovery.headlines.workspaceValidation': 'Paperclip 停止了此运行，因为无法验证任务的 git 工作区。',
  'issue.recovery.headlines.configurationValidation': 'Paperclip 在分发此运行之前停止，因为所需的 secret/env 绑定无效。',
  'issue.recovery.headlines.activeWatchdog': '此任务有一个活跃的监督者正在运行。',
  'issue.recovery.headlines.graphLiveness': '此任务的运行图活跃度检查失败。',
  'issue.recovery.descriptions.missingDisposition': '运行已完成，但未选择下一步操作。请决定任务的下一步。',
  'issue.recovery.descriptions.strandedTask': 'Paperclip 重试了此任务的最后一次运行，但仍然没有活跃的执行路径。请检查任务配置。',
  'issue.recovery.descriptions.workspaceValidation': 'Paperclip 停止了此运行，因为无法验证任务的 git 工作区。请检查工作区配置。',
  'issue.recovery.descriptions.configurationValidation': 'Paperclip 在分发此运行之前停止，因为所需的 secret/env 绑定无效。请检查配置。',
  'issue.recovery.descriptions.activeWatchdog': '此任务有一个活跃的监督者正在运行。监督者将处理任务执行。',
  'issue.recovery.descriptions.graphLiveness': '此任务的运行图活跃度检查失败。请检查任务依赖关系。',
  'issue.recovery.actions.wake': '唤醒',
  'issue.recovery.actions.resolve': '解决',
  'issue.recovery.actions.retry': '重试',
  'issue.recovery.actions.cancel': '取消',
  'issue.recovery.actions.skip': '跳过',
  'issue.recovery.actions.ignore': '忽略',
  'issue.recovery.actions.dismiss': '关闭',
  'issue.recovery.actions.acknowledge': '确认',
  'issue.recovery.actions.reassign': '重新分配',
  'issue.recovery.actions.escalate': '升级',
  'issue.recovery.actions.defer': '延迟',
  'issue.recovery.actions.block': '阻塞',
  'issue.recovery.actions.unblock': '解除阻塞',
  'issue.recovery.actions.pause': '暂停',
  'issue.recovery.actions.resume': '恢复',
  'issue.recovery.actions.restart': '重启',
  'issue.recovery.actions.abort': '中止',
  'issue.recovery.actions.complete': '完成',
  'issue.recovery.actions.fail': '失败',
  'issue.recovery.actions.timeout': '超时',
  'issue.recovery.actions.expire': '过期',
  'issue.recovery.actions.renew': '续订',
  'issue.recovery.actions.extend': '扩展',
  'issue.recovery.actions.reduce': '减少',
  'issue.recovery.actions.increase': '增加',
  'issue.recovery.actions.decrease': '减少',
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
Object.entries(issueRecovery).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} issue.recovery keys`);
