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

// Issue runLedger translations
const issueRunLedger = {
  'issue.runLedger.title': '运行台账',
  'issue.runLedger.latestRun': '最新运行',
  'issue.runLedger.childWork': '子工作',
  'issue.runLedger.noRunsLinked': '尚无关联的运行。',
  'issue.runLedger.waitingFirstRun': '等待第一条运行记录。',
  'issue.runLedger.olderItemsNotShown': '{{count}} 个较旧的项目未显示',
  'issue.runLedger.live': '实时',
  'issue.runLedger.exhausted': '已耗尽',
  'issue.runLedger.elapsed': '已用时',
  'issue.runLedger.lastUsefulAction': '上次有用操作',
  'issue.runLedger.stop': '停止',
  'issue.runLedger.nextAction': '下一步操作',
  'issue.runLedger.retryOf': '重试于',
  'issue.runLedger.runActivityWillAppear': '一旦此任务有历史记录，运行和活动将显示在这里。',
  'issue.runLedger.historicalRunsWillAppear': '一旦链接到此任务，没有活跃元数据的历史运行将显示在这里。',
  'issue.runLedger.profile': '配置',
  'issue.runLedger.unavailable': '不可用',
  'issue.runLedger.retryPending': '重试待定',
  'issue.runLedger.waitingToStart': '等待开始',
  'issue.runLedger.stillRunning': '仍在运行',
  'issue.runLedger.noStopReason': '无停止原因',
  'issue.runLedger.waitingForNextAttempt': '等待下次尝试',
  'issue.runLedger.noActionRecordedYet': '尚未记录操作',
  'issue.runLedger.noConcreteAction': '无具体操作',
  'issue.runLedger.noUsefulOutput': '无有用输出',
  'issue.runLedger.noneRecorded': '未记录',
  'issue.runLedger.continuationAttempt': '继续尝试 {{count}}',
  'issue.runLedger.cheapProfileFallback': '经济配置已回退到主要配置',
  'issue.runLedger.profileUnavailable': '{{profile}} 配置不可用',
  'issue.runLedger.runningNowBy': '现在由 {{agent}} 运行',
  'issue.runLedger.queuedFor': '已排队等待 {{agent}}',
  'issue.runLedger.scheduledRetryFor': '已为 {{agent}} 安排自动重试',
  'issue.runLedger.statusByAgent': '{{agent}} 的 {{status}}',
  'issue.runLedger.moreChildren': '+{{count}} 个更多',
  'issue.runLedger.activeDoneCancelled': '活动/完成/取消',
  'issue.runLedger.noRuns': '无运行',
  'issue.runLedger.noRunsDescription': '此任务尚无运行记录。',
  'issue.runLedger.noRunsLinkedDescription': '此任务尚无关联的运行。',
  'issue.runLedger.noRunsLinkedYet': '尚无关联的运行。',
  'issue.runLedger.noRunsLinkedYetDescription': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription2': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription3': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription4': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription5': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription6': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription7': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription8': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription9': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription10': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription11': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription12': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription13': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription14': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription15': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription16': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription17': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription18': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription19': '运行将在此任务有历史记录后显示。',
  'issue.runLedger.noRunsLinkedYetDescription20': '运行将在此任务有历史记录后显示。',
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
Object.entries(issueRunLedger).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} issue.runLedger keys`);
