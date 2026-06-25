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

// Get ALL untranslated keys
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

// Comprehensive translation map for ALL remaining keys
const translations = {
  // issue.propertiesPage
  'issue.propertiesPage.title': '属性',
  'issue.propertiesPage.status': '状态',
  'issue.propertiesPage.priority': '优先级',
  'issue.propertiesPage.assignee': '负责人',
  'issue.propertiesPage.labels': '标签',
  'issue.propertiesPage.project': '项目',
  'issue.propertiesPage.milestone': '里程碑',
  'issue.propertiesPage.dueDate': '截止日期',
  'issue.propertiesPage.estimatedTime': '预估时间',
  'issue.propertiesPage.actualTime': '实际时间',
  'issue.propertiesPage.created': '创建时间',
  'issue.propertiesPage.updated': '更新时间',
  'issue.propertiesPage.closed': '关闭时间',
  'issue.propertiesPage.started': '开始时间',
  'issue.propertiesPage.completed': '完成时间',
  'issue.propertiesPage.cancelled': '取消时间',
  'issue.propertiesPage.archived': '归档时间',
  'issue.propertiesPage.parent': '父任务',
  'issue.propertiesPage.children': '子任务',
  'issue.propertiesPage.dependencies': '依赖项',
  'issue.propertiesPage.blockedBy': '被阻塞于',
  'issue.propertiesPage.blocks': '阻塞',
  'issue.propertiesPage.relatedTo': '关联',
  'issue.propertiesPage.references': '引用',
  'issue.propertiesPage.attachments': '附件',
  'issue.propertiesPage.comments': '评论',
  'issue.propertiesPage.activity': '活动',
  'issue.propertiesPage.timeline': '时间线',
  'issue.propertiesPage.details': '详情',
  'issue.propertiesPage.metadata': '元数据',
  'issue.propertiesPage.customFields': '自定义字段',
  'issue.propertiesPage.noCustomFields': '暂无自定义字段',
  'issue.propertiesPage.edit': '编辑',
  'issue.propertiesPage.save': '保存',
  'issue.propertiesPage.cancel': '取消',
  'issue.propertiesPage.saved': '已保存',
  'issue.propertiesPage.saveFailed': '保存失败',
  'issue.propertiesPage.loading': '加载中...',
  'issue.propertiesPage.error': '加载失败',
  'issue.propertiesPage.retry': '重试',
  'issue.propertiesPage.noProject': '无项目',
  'issue.propertiesPage.noLabels': '无标签',
  'issue.propertiesPage.noMilestone': '无里程碑',
  'issue.propertiesPage.noDueDate': '无截止日期',
  'issue.propertiesPage.noParent': '无父任务',
  'issue.propertiesPage.noChildren': '无子任务',
  'issue.propertiesPage.noDependencies': '无依赖项',
  'issue.propertiesPage.noReferences': '无引用',
  'issue.propertiesPage.noAttachments': '无附件',
  'issue.propertiesPage.addLabel': '添加标签',
  'issue.propertiesPage.removeLabel': '移除标签',
  'issue.propertiesPage.addDependency': '添加依赖',
  'issue.propertiesPage.removeDependency': '移除依赖',
  'issue.propertiesPage.linkIssue': '关联问题',
  'issue.propertiesPage.unlinkIssue': '取消关联',
  'issue.propertiesPage.changeStatus': '更改状态',
  'issue.propertiesPage.changePriority': '更改优先级',
  'issue.propertiesPage.changeAssignee': '更改负责人',
  'issue.propertiesPage.setDueDate': '设置截止日期',
  'issue.propertiesPage.clearDueDate': '清除截止日期',
  'issue.propertiesPage.archive': '归档',
  'issue.propertiesPage.unarchive': '取消归档',
  'issue.propertiesPage.delete': '删除',
  'issue.propertiesPage.deleteConfirm': '确定要删除此问题吗？',
  'issue.propertiesPage.deleteWarning': '此操作无法撤销。',

  // issue.newDialog
  'issue.newDialog.title': '新建问题',
  'issue.newDialog.nameLabel': '问题名称',
  'issue.newDialog.namePlaceholder': '输入问题名称...',
  'issue.newDialog.descriptionLabel': '描述',
  'issue.newDialog.descriptionPlaceholder': '添加描述...',
  'issue.newDialog.statusLabel': '状态',
  'issue.newDialog.priorityLabel': '优先级',
  'issue.newDialog.assigneeLabel': '负责人',
  'issue.newDialog.projectLabel': '项目',
  'issue.newDialog.labelsLabel': '标签',
  'issue.newDialog.dueDateLabel': '截止日期',
  'issue.newDialog.estimatedTimeLabel': '预估时间',
  'issue.newDialog.parentLabel': '父任务',
  'issue.newDialog.create': '创建',
  'issue.newDialog.creating': '创建中...',
  'issue.newDialog.cancel': '取消',
  'issue.newDialog.error': '创建失败',
  'issue.newDialog.success': '问题已创建',
  'issue.newDialog.required': '必填',
  'issue.newDialog.optional': '可选',
  'issue.newDialog.advanced': '高级选项',
  'issue.newDialog.basic': '基本信息',
  'issue.newDialog.template': '模板',
  'issue.newDialog.noTemplate': '无模板',
  'issue.newDialog.fromTemplate': '从模板创建',
  'issue.newDialog.saveAsTemplate': '保存为模板',
  'issue.newDialog.duplicateOf': '重复于',
  'issue.newDialog.relatedTo': '关联于',
  'issue.newDialog.blockedBy': '被阻塞于',
  'issue.newDialog.blocks': '阻塞',
  'issue.newDialog.addAttachment': '添加附件',
  'issue.newDialog.removeAttachment': '移除附件',
  'issue.newDialog.addLink': '添加链接',
  'issue.newDialog.removeLink': '移除链接',
  'issue.newDialog.preview': '预览',
  'issue.newDialog.submit': '提交',
  'issue.newDialog.reset': '重置',

  // issue.runLedger
  'issue.runLedger.title': '运行记录',
  'issue.runLedger.noRuns': '暂无运行记录',
  'issue.runLedger.loading': '加载中...',
  'issue.runLedger.error': '加载失败',
  'issue.runLedger.retry': '重试',
  'issue.runLedger.runId': '运行 ID',
  'issue.runLedger.status': '状态',
  'issue.runLedger.startedAt': '开始时间',
  'issue.runLedger.completedAt': '完成时间',
  'issue.runLedger.duration': '持续时间',
  'issue.runLedger.agent': '代理',
  'issue.runLedger.model': '模型',
  'issue.runLedger.tokens': '令牌',
  'issue.runLedger.cost': '成本',
  'issue.runLedger.viewDetails': '查看详情',
  'issue.runLedger.viewLogs': '查看日志',
  'issue.runLedger.viewOutput': '查看输出',
  'issue.runLedger.rerun': '重新运行',
  'issue.runLedger.cancel': '取消',
  'issue.runLedger.cancelled': '已取消',
  'issue.runLedger.running': '运行中',
  'issue.runLedger.completed': '已完成',
  'issue.runLedger.failed': '失败',
  'issue.runLedger.pending': '待处理',
  'issue.runLedger.queued': '已排队',
  'issue.runLedger.skipped': '已跳过',
  'issue.runLedger.success': '成功',
  'issue.runLedger.filter': '筛选',
  'issue.runLedger.clearFilter': '清除筛选',
  'issue.runLedger.search': '搜索',
  'issue.runLedger.export': '导出',
  'issue.runLedger.refresh': '刷新',

  // issue.toasts
  'issue.toasts.created': '问题已创建',
  'issue.toasts.updated': '问题已更新',
  'issue.toasts.deleted': '问题已删除',
  'issue.toasts.archived': '问题已归档',
  'issue.toasts.restored': '问题已恢复',
  'issue.toasts.statusChanged': '状态已更改',
  'issue.toasts.priorityChanged': '优先级已更改',
  'issue.toasts.assigneeChanged': '负责人已更改',
  'issue.toasts.labelAdded': '标签已添加',
  'issue.toasts.labelRemoved': '标签已移除',
  'issue.toasts.commentAdded': '评论已添加',
  'issue.toasts.commentDeleted': '评论已删除',
  'issue.toasts.attachmentAdded': '附件已添加',
  'issue.toasts.attachmentDeleted': '附件已删除',
  'issue.toasts.error': '操作失败',
  'issue.toasts.retry': '重试',
  'issue.toasts.undo': '撤销',
  'issue.toasts.saveSuccess': '保存成功',
  'issue.toasts.saveFailed': '保存失败',
  'issue.toasts.deleteFailed': '删除失败',
  'issue.toasts.loadFailed': '加载失败',
  'issue.toasts.networkError': '网络错误',
  'issue.toasts.permissionDenied': '权限不足',
  'issue.toasts.notFound': '未找到',
  'issue.toasts.unknownError': '未知错误',

  // issue.recovery
  'issue.recovery.title': '恢复',
  'issue.recovery.description': '任务需要恢复操作。',
  'issue.recovery.action': '恢复操作',
  'issue.recovery.actions': '恢复选项',
  'issue.recovery.retry': '重试',
  'issue.recovery.retrying': '重试中...',
  'issue.recovery.skip': '跳过',
  'issue.recovery.abort': '中止',
  'issue.recovery.ignore': '忽略',
  'issue.recovery.escalate': '升级',
  'issue.recovery.delegate': '委托',
  'issue.recovery.manual': '手动处理',
  'issue.recovery.auto': '自动处理',
  'issue.recovery.suggested': '建议',
  'issue.recovery.viewDetails': '查看详情',
  'issue.recovery.viewHistory': '查看历史',
  'issue.recovery.noRecovery': '无需恢复',
  'issue.recovery.recoveryFailed': '恢复失败',
  'issue.recovery.recoverySuccess': '恢复成功',
  'issue.recovery.pending': '待处理',
  'issue.recovery.inProgress': '进行中',
  'issue.recovery.completed': '已完成',
  'issue.recovery.failed': '失败',
  'issue.recovery.reason': '原因',
  'issue.recovery.details': '详情',

  // issue.treeControl
  'issue.treeControl.title': '任务树',
  'issue.treeControl.expand': '展开',
  'issue.treeControl.collapse': '折叠',
  'issue.treeControl.expandAll': '全部展开',
  'issue.treeControl.collapseAll': '全部折叠',
  'issue.treeControl.addChild': '添加子任务',
  'issue.treeControl.removeChild': '移除子任务',
  'issue.treeControl.reorder': '重新排序',
  'issue.treeControl.indent': '缩进',
  'issue.treeControl.outdent': '取消缩进',
  'issue.treeControl.noChildren': '无子任务',
  'issue.treeControl.loading': '加载中...',
  'issue.treeControl.error': '加载失败',
  'issue.treeControl.dragToReorder': '拖拽重新排序',
  'issue.treeControl.viewTree': '查看树',
  'issue.treeControl.viewList': '查看列表',
  'issue.treeControl.viewBoard': '查看看板',

  // issue.list
  'issue.list.title': '问题列表',
  'issue.list.noIssues': '暂无问题',
  'issue.list.loading': '加载中...',
  'issue.list.error': '加载失败',
  'issue.list.retry': '重试',
  'issue.list.search': '搜索问题',
  'issue.list.filter': '筛选',
  'issue.list.sort': '排序',
  'issue.list.groupBy': '分组',
  'issue.list.view': '视图',
  'issue.list.listView': '列表',
  'issue.list.boardView': '看板',
  'issue.list.treeView': '树',
  'issue.list.refresh': '刷新',
  'issue.list.selectAll': '全选',
  'issue.list.deselectAll': '取消全选',
  'issue.list.bulkActions': '批量操作',
  'issue.list.selected': '已选择',
  'issue.list.noResults': '未找到结果',
  'issue.list.clearFilters': '清除筛选',
  'issue.list.saveView': '保存视图',
  'issue.list.defaultView': '默认视图',

  // issue.status
  'issue.status.backlog': '待办',
  'issue.status.todo': '待处理',
  'issue.status.inProgress': '进行中',
  'issue.status.inReview': '审查中',
  'issue.status.done': '已完成',
  'issue.status.cancelled': '已取消',
  'issue.status.blocked': '阻塞',
  'issue.status.archived': '已归档',
  'issue.status.open': '打开',
  'issue.status.closed': '关闭',
  'issue.status.reopened': '已重新打开',
  'issue.status.draft': '草稿',
  'issue.status.ready': '就绪',
  'issue.status.parked': '暂停',
  'issue.status.waiting': '等待中',
  'issue.status.scheduled': '已计划',
  'issue.status.running': '运行中',
  'issue.status.paused': '已暂停',
  'issue.status.failed': '失败',
  'issue.status.skipped': '已跳过',

  // issue.filters
  'issue.filters.title': '筛选',
  'issue.filters.status': '状态',
  'issue.filters.priority': '优先级',
  'issue.filters.assignee': '负责人',
  'issue.filters.project': '项目',
  'issue.filters.labels': '标签',
  'issue.filters.clear': '清除',
  'issue.filters.apply': '应用',
  'issue.filters.save': '保存',
  'issue.filters.reset': '重置',

  // issue.runActions
  'issue.runActions.title': '运行操作',
  'issue.runActions.start': '开始',
  'issue.runActions.stop': '停止',
  'issue.runActions.restart': '重启',
  'issue.runActions.pause': '暂停',
  'issue.runActions.resume': '恢复',
  'issue.runActions.cancel': '取消',
  'issue.runActions.retry': '重试',
  'issue.runActions.viewLogs': '查看日志',
  'issue.runActions.viewOutput': '查看输出',
  'issue.runActions.viewDetails': '查看详情',
  'issue.runActions.delete': '删除',

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

  // instanceSettings.experimental
  'instanceSettings.experimental.title': '实验性功能',
  'instanceSettings.experimental.description': '这些功能可能不稳定。',
  'instanceSettings.experimental.enable': '启用',
  'instanceSettings.experimental.disable': '禁用',
  'instanceSettings.experimental.enabled': '已启用',
  'instanceSettings.experimental.disabled': '已禁用',
  'instanceSettings.experimental.save': '保存',
  'instanceSettings.experimental.saved': '已保存',
  'instanceSettings.experimental.saveFailed': '保存失败',
  'instanceSettings.experimental.loading': '加载中...',
  'instanceSettings.experimental.error': '加载失败',
  'instanceSettings.experimental.warning': '警告：这些功能可能导致数据丢失。',
  'instanceSettings.experimental.confirm': '确认启用',
  'instanceSettings.experimental.cancel': '取消',

  // instanceSettings.general
  'instanceSettings.general.title': '通用设置',
  'instanceSettings.general.save': '保存',
  'instanceSettings.general.saved': '已保存',
  'instanceSettings.general.saveFailed': '保存失败',
  'instanceSettings.general.loading': '加载中...',
  'instanceSettings.general.error': '加载失败',
  'instanceSettings.general.retry': '重试',
  'instanceSettings.general.cancel': '取消',
  'instanceSettings.general.confirm': '确认',
  'instanceSettings.general.enabled': '已启用',
  'instanceSettings.general.disabled': '已禁用',

  // instanceSettings.heartbeats
  'instanceSettings.heartbeats.title': '心跳监控',
  'instanceSettings.heartbeats.description': '监控系统健康状态。',
  'instanceSettings.heartbeats.status': '状态',
  'instanceSettings.heartbeats.lastCheck': '最后检查',
  'instanceSettings.heartbeats.interval': '间隔',
  'instanceSettings.heartbeats.enabled': '已启用',
  'instanceSettings.heartbeats.disabled': '已禁用',
  'instanceSettings.heartbeats.save': '保存',
  'instanceSettings.heartbeats.saved': '已保存',
  'instanceSettings.heartbeats.saveFailed': '保存失败',
  'instanceSettings.heartbeats.loading': '加载中...',
  'instanceSettings.heartbeats.error': '加载失败',
  'instanceSettings.heartbeats.test': '测试',
  'instanceSettings.heartbeats.testing': '测试中...',

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

  // onboardingClassic.step2
  'onboardingClassic.step2': '步骤 2：输入凭据',
};

// Apply all translations
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
