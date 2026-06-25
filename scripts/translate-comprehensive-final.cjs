const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

function s(obj, keyPath, val) {
  const keys = keyPath.split('.');
  let c = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!c[keys[i]] || typeof c[keys[i]] !== 'object') c[keys[i]] = {};
    c = c[keys[i]];
  }
  c[keys[keys.length - 1]] = val;
}

function g(obj, keyPath) {
  const keys = keyPath.split('.');
  let c = obj;
  for (const k of keys) {
    if (!c || typeof c !== 'object') return undefined;
    c = c[k];
  }
  return c;
}

// Get all untranslated keys
function getUntranslatedKeys(enObj, zhObj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(enObj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof value === 'object' && value !== null) {
      keys.push(...getUntranslatedKeys(value, zhObj?.[key] || {}, fullKey));
    } else {
      if (!zhObj?.[key] || zhObj[key] === value) {
        keys.push(fullKey);
      }
    }
  }
  return keys;
}

const untranslated = getUntranslatedKeys(en, zh);
console.log('Untranslated:', untranslated.length);

// Comprehensive translation map - key -> Chinese translation
const translations = {
  // instanceSettings.general
  'instanceSettings.general.daily': '每日',
  'instanceSettings.general.weekly': '每周',
  'instanceSettings.general.monthly': '每月',
  'instanceSettings.general.daysCount': '{{count}} 天',
  'instanceSettings.general.dayCount': '1 天',
  'instanceSettings.general.weeksCount': '{{count}} 周',
  'instanceSettings.general.weekCount': '1 周',
  'instanceSettings.general.monthsCount': '{{count}} 月',
  'instanceSettings.general.monthCount': '1 月',
  'instanceSettings.general.aiFeedbackSharing': 'AI 反馈共享',
  'instanceSettings.general.aiFeedbackDesc': '控制点赞和踩的投票是否可以将投票的 AI 输出发送到 Paperclip Labs。投票始终在本地保存。',
  'instanceSettings.general.readTermsOfService': '阅读我们的服务条款',
  'instanceSettings.general.noDefaultSaved': '尚未保存默认值。下一个点赞或踩的选择将询问一次，然后在此处保存答案。',
  'instanceSettings.general.alwaysAllow': '始终允许',
  'instanceSettings.general.alwaysAllowDesc': '自动共享投票的 AI 输出。',
  'instanceSettings.general.dontAllow': '不允许',
  'instanceSettings.general.dontAllowDesc': '仅在本地保存投票的 AI 输出。',
  'instanceSettings.general.signOut': '退出登录',
  'instanceSettings.general.signOutDesc': '退出此 Paperclip 实例。您将被重定向到登录页面。',
  'instanceSettings.general.signingOut': '退出中...',
  'instanceSettings.general.failedToSignOut': '退出失败。',

  // instanceSettings.heartbeats
  'instanceSettings.heartbeats.failedToLoad': '加载调度器心跳失败。',
  'instanceSettings.heartbeats.active': '活跃',
  'instanceSettings.heartbeats.company': '公司',
  'instanceSettings.heartbeats.companies': '公司',
  'instanceSettings.heartbeats.disableAllConfirm': '禁用所有 {{count}} 个已启用的 {{noun}} 的定时器心跳？',
  'instanceSettings.heartbeats.disabling': '禁用中...',
  'instanceSettings.heartbeats.disableAll': '全部禁用',
  'instanceSettings.heartbeats.noHeartbeats': '没有调度器心跳匹配当前条件。',
  'instanceSettings.heartbeats.never': '从不',
  'instanceSettings.heartbeats.fullAgentConfig': '完整代理配置',
  'instanceSettings.heartbeats.disableTimerHeartbeat': '禁用定时器心跳',
  'instanceSettings.heartbeats.enableTimerHeartbeat': '启用定时器心跳',
  'instanceSettings.heartbeats.failedToUpdate': '更新心跳失败。',
  'instanceSettings.heartbeats.failedToDisableAll': '禁用所有心跳失败。',
  'instanceSettings.heartbeats.failedToDisableOne': '禁用 1 个定时器心跳失败：{{detail}}',
  'instanceSettings.heartbeats.failedToDisableMultiple': '禁用 {{failures}} 个定时器心跳失败（共 {{total}} 个）。第一个错误：{{detail}}',
  'instanceSettings.heartbeats.unknownError': '未知错误',

  // instanceSettings.experimental
  'instanceSettings.experimental.failedToLoad': '加载实验设置失败。',
  'instanceSettings.experimental.failedToUpdate': '更新实验设置失败。',
  'instanceSettings.experimental.warningTitle': '实验功能可能随时中断。',
  'instanceSettings.experimental.warningDesc': '这些功能是可选的，不提供兼容性保证。它们可能会在没有通知的情况下更改、中断或被移除。避免在关键或生产工作流中依赖它们。',
  'instanceSettings.experimental.enableEnvironments': '启用环境',
  'instanceSettings.experimental.enableEnvironmentsDesc': '在公司设置中显示环境管理，并允许项目和代理环境分配控制。',
  'instanceSettings.experimental.toggleEnvironments': '切换环境实验设置',

  // issue.runLedger
  'issue.runLedger.latestRun': '最新运行',
  'issue.runLedger.childWork': '子任务',
  'issue.runLedger.noRunsLinked': '没有关联的运行记录',
  'issue.runLedger.waitingFirstRun': '等待第一次运行',
  'issue.runLedger.olderItemsNotShown': '未显示较旧的项目',
  'issue.runLedger.live': '实时',
  'issue.runLedger.exhausted': '已耗尽',
  'issue.runLedger.elapsed': '已用时间',
  'issue.runLedger.lastUsefulAction': '最后有效操作',

  // issue.recovery
  'issue.recovery.owner': '所有者',
  'issue.recovery.sourceRun': '源运行',
  'issue.recovery.correctiveRun': '纠正运行',
  'issue.recovery.evidence': '证据',
  'issue.recovery.nextAction': '下一步操作',
  'issue.recovery.wake': '唤醒',
  'issue.recovery.resolution': '解决方案',
  'issue.recovery.resolve': '解决',
  'issue.recovery.resolveRecovery': '解决恢复',

  // issue.list
  'issue.list.searchTasks': '搜索任务',
  'issue.list.newTask': '新建任务',
  'issue.list.createTask': '创建任务',
  'issue.list.listView': '列表视图',
  'issue.list.boardView': '看板视图',
  'issue.list.sort': '排序',
  'issue.list.group': '分组',
  'issue.list.workflow': '工作流',
  'issue.list.status': '状态',
  'issue.list.priority': '优先级',

  // issue.status
  'issue.status.backlog': '待办',
  'issue.status.todo': '待处理',
  'issue.status.inProgress': '进行中',
  'issue.status.inReview': '审查中',
  'issue.status.done': '已完成',
  'issue.status.blocked': '阻塞',
  'issue.status.cancelled': '已取消',

  // issue (top-level)
  'issue.title': '问题',
  'issue.newTask': '新建任务',
  'issue.createTask': '创建任务',
  'issue.selectCompanyToView': '选择公司以查看',
  'issue.task': '任务',
  'issue.subTask': '子任务',
  'issue.subTasks': '子任务',
  'issue.newSubTask': '新建子任务',
  'issue.addSubTask': '添加子任务',
  'issue.artifacts': '产物',
  'issue.live': '实时',
  'issue.routine': '例程',
  'issue.productivityReview': '生产力审查',
  'issue.blockedByParkedWork': '被暂停的工作阻塞',
  'issue.blockedByParkedWorkTitle': '被暂停的工作阻塞',
  'issue.noProject': '无项目',
  'issue.thisTaskIsHidden': '此任务已隐藏',
  'issue.addDescription': '添加描述...',
  'issue.uploadAttachment': '上传附件',
  'issue.uploading': '上传中...',
  'issue.upload': '上传',
  'issue.copyTaskAsMarkdown': '复制任务为 Markdown',
  'issue.showProperties': '显示属性',
  'issue.moreTaskActions': '更多任务操作',
  'issue.hideThisTask': '隐藏此任务',
  'issue.properties': '属性',
  'issue.chooseTaskColumns': '选择任务列',
  'issue.status': '状态',
  'issue.priority': '优先级',
  'issue.tabs': '标签页',
  'issue.chatDetail': '聊天详情',
  'issue.costSummary': '成本摘要',
  'issue.treeControl': '任务树',
  'issue.toasts': '通知',
  'issue.runActions': '运行操作',
  'issue.assignee': '负责人',
  'issue.filters': '筛选',
  'issue.list': '列表',
  'issue.propertiesPage': '属性页面',
  'issue.row': '行',
  'issue.columns': '列',
  'issue.assignedBacklog': '已分配待办',
  'issue.attachments': '附件',
  'issue.blocked': '阻塞',
  'issue.continuationHandoff': '继续交接',
  'issue.monitor': '监控',
  'issue.output': '输出',
  'issue.planDecomposition': '计划分解',
  'issue.references': '引用',
  'issue.relatedWork': '相关工作',
  'issue.scheduledRetry': '计划重试',
  'issue.sibling': '兄弟任务',
  'issue.documents': '文档',
  'issue.interaction': '交互',
  'issue.workspace': '工作区',

  // routine
  'routine.title': '例程',
  'routine.subtitle': '管理自动化例程',
  'routine.createRoutine': '创建例程',
  'routine.selectCompany': '选择公司',
  'routine.routineCount_one': '{{count}} 个例程',
  'routine.routineCount_other': '{{count}} 个例程',
  'routine.recentRuns': '最近运行',
  'routine.noActiveRoutines': '无活跃例程',
  'routine.failedToLoad': '加载例程失败',
  'routine.groups': '分组',
  'routine.sort': '排序',
  'routine.group': '分组',
  'routine.composer': '编辑器',
  'routine.policies': '策略',
  'routine.toasts': '通知',
  'routine.detail': '详情',
  'routine.sections': '部分',
  'routine.dirty': '未保存',
  'routine.history': '历史',
  'routine.nav': '导航',
  'routine.dialog': '对话框',

  // routine.history
  'routine.history.title': '历史记录',
  'routine.history.noHistory': '暂无历史记录',
  'routine.history.loading': '加载中...',
  'routine.history.error': '加载失败',
  'routine.history.retry': '重试',
  'routine.history.runId': '运行 ID',
  'routine.history.status': '状态',
  'routine.history.startedAt': '开始时间',
  'routine.history.completedAt': '完成时间',
  'routine.history.duration': '持续时间',
  'routine.history.trigger': '触发器',
  'routine.history.viewDetails': '查看详情',
  'routine.history.export': '导出',
  'routine.history.refresh': '刷新',
  'routine.history.filter': '筛选',
  'routine.history.clearFilter': '清除筛选',
  'routine.history.search': '搜索',

  // routine.toasts
  'routine.toasts.created': '例程已创建',
  'routine.toasts.updated': '例程已更新',
  'routine.toasts.deleted': '例程已删除',
  'routine.toasts.enabled': '例程已启用',
  'routine.toasts.disabled': '例程已禁用',
  'routine.toasts.started': '例程已启动',
  'routine.toasts.stopped': '例程已停止',
  'routine.toasts.paused': '例程已暂停',
  'routine.toasts.resumed': '例程已恢复',
  'routine.toasts.error': '操作失败',
  'routine.toasts.saveSuccess': '保存成功',
  'routine.toasts.saveFailed': '保存失败',
  'routine.toasts.deleteFailed': '删除失败',
  'routine.toasts.runStarted': '运行已开始',
  'routine.toasts.runCompleted': '运行已完成',
  'routine.toasts.runFailed': '运行失败',
  'routine.toasts.runCancelled': '运行已取消',

  // routine.composer
  'routine.composer.title': '例程编辑器',
  'routine.composer.name': '名称',
  'routine.composer.description': '描述',
  'routine.composer.trigger': '触发器',
  'routine.composer.schedule': '计划',
  'routine.composer.webhook': 'Webhook',
  'routine.composer.event': '事件',
  'routine.composer.manual': '手动',
  'routine.composer.steps': '步骤',
  'routine.composer.addStep': '添加步骤',
  'routine.composer.removeStep': '移除步骤',
  'routine.composer.save': '保存',
  'routine.composer.cancel': '取消',
  'routine.composer.saved': '已保存',
  'routine.composer.saveFailed': '保存失败',
  'routine.composer.preview': '预览',
  'routine.composer.test': '测试',
  'routine.composer.run': '运行',

  // secrets.form
  'secrets.form.name': '名称',
  'secrets.form.key': '密钥',
  'secrets.form.provider': '提供商',
  'secrets.form.value': '值',
  'secrets.form.description': '描述',
  'secrets.form.newValue': '新值',
  'secrets.form.updatedReference': '更新的引用',
  'secrets.form.ready': '就绪',
  'secrets.form.warning': '警告',
  'secrets.form.comingSoon': '即将推出',

  // executionWorkspace.close
  'executionWorkspace.close.title': '关闭工作区',
  'executionWorkspace.close.description': '关闭前请完成或确认以下事项。',
  'executionWorkspace.close.archive': '归档',
  'executionWorkspace.close.cancel': '取消',
  'executionWorkspace.close.confirm': '确认关闭',
  'executionWorkspace.close.blockingTasks': '阻塞任务',
  'executionWorkspace.close.warnings': '警告',
  'executionWorkspace.close.gitStatus': 'Git 状态',
  'executionWorkspace.close.branch': '分支',
  'executionWorkspace.close.uncommittedChanges': '未提交的更改',
  'executionWorkspace.close.files': '文件',
  'executionWorkspace.close.staged': '已暂存',
  'executionWorkspace.close.unstaged': '未暂存',
  'executionWorkspace.close.untracked': '未跟踪',
  'executionWorkspace.close.commitMessage': '提交消息',
  'executionWorkspace.close.commitMessagePlaceholder': '输入提交消息...',
  'executionWorkspace.close.commitAndClose': '提交并关闭',
  'executionWorkspace.close.discardAndClose': '丢弃并关闭',
  'executionWorkspace.close.noBlockingTasks': '无阻塞任务。',
  'executionWorkspace.close.noWarnings': '无警告。',
  'executionWorkspace.close.ready': '就绪',
  'executionWorkspace.close.notReady': '未就绪',
  'executionWorkspace.close.loading': '加载中...',
  'executionWorkspace.close.error': '错误',
  'executionWorkspace.close.success': '成功',
  'executionWorkspace.close.failed': '失败',
  'executionWorkspace.close.retry': '重试',
  'executionWorkspace.close.force': '强制',
  'executionWorkspace.close.forceClose': '强制关闭',
  'executionWorkspace.close.forceCloseWarning': '强制关闭可能会丢失未保存的工作。',

  // onboardingClassic
  'onboardingClassic.step2': '步骤 2：输入凭据',
};

// Apply translations
let applied = 0;
for (const [key, val] of Object.entries(translations)) {
  const enVal = g(en, key);
  if (enVal !== undefined && typeof enVal === 'string') {
    s(zh, key, val);
    applied++;
  }
}
console.log('Applied:', applied);

// Write
fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');

// Count
function countKeys(obj) {
  let c = 0;
  for (const [, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) c += countKeys(v);
    else c++;
  }
  return c;
}
function countTranslated(enObj, zhObj) {
  let count = 0;
  for (const [key, value] of Object.entries(enObj)) {
    if (typeof value === 'object' && value !== null) {
      count += countTranslated(value, zhObj?.[key] || {});
    } else {
      if (zhObj?.[key] && zhObj[key] !== value) count++;
    }
  }
  return count;
}
const total = countKeys(en);
const translated = countTranslated(en, zh);
console.log('\nTotal:', total);
console.log('Translated:', translated);
console.log('Progress:', Math.round(translated / total * 100) + '%');
console.log('Remaining:', total - translated);
