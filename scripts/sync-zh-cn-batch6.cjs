const fs = require('fs');
const en = JSON.parse(fs.readFileSync('ui/src/i18n/locales/en.json', 'utf8'));
const zhCN = JSON.parse(fs.readFileSync('ui/src/i18n/locales/zh-CN.json', 'utf8'));

function syncStructure(target, source) {
  const result = {};
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'object' && value !== null) {
      if (target[key] && typeof target[key] === 'object') {
        result[key] = syncStructure(target[key], value);
      } else {
        result[key] = value;
      }
    } else {
      result[key] = (target[key] !== undefined && typeof target[key] === 'string') ? target[key] : value;
    }
  }
  return result;
}

zhCN.routine = syncStructure(zhCN.routine || {}, en.routine);
zhCN.approval = syncStructure(zhCN.approval || {}, en.approval);
zhCN.artifact = syncStructure(zhCN.artifact || {}, en.artifact);
zhCN.boardChat = syncStructure(zhCN.boardChat || {}, en.boardChat);

// Routine Chinese translations
if (zhCN.routine) {
  const r = zhCN.routine;
  r.title = "例程";
  r.selectCompany = "选择一家公司以查看例程。";
  r.noRoutines = "暂无例程。";
  r.newRoutine = "新建例程";
  r.routineCount_one = "{{count}} 个例程";
  r.routineCount_other = "{{count}} 个例程";
  r.recentRuns = "最近运行";
  r.searchRoutines = "搜索例程...";
  r.noMatch = "没有匹配的例程。";
  r.loading = "加载中...";
  r.error = "加载例程失败。";
  r.retry = "重试";

  if (r.groups) {
    r.groups.all = "全部";
    r.groups.active = "活跃";
    r.groups.draft = "草稿";
    r.groups.paused = "已暂停";
    r.groups.archived = "已归档";
  }

  if (r.sort) {
    r.sort.name = "名称";
    r.sort.updated = "更新时间";
    r.sort.created = "创建时间";
    r.sort.lastRun = "上次运行";
    r.sort.asc = "升序";
    r.sort.desc = "降序";
  }

  if (r.group) {
    r.group.status = "状态";
    r.group.frequency = "频率";
    r.group.project = "项目";
    r.group.none = "无";
  }

  if (r.composer) {
    r.composer.title = "新建例程";
    r.composer.description = "创建一个新的例程来自动化重复性任务。";
    r.composer.namePlaceholder = "例程名称";
    r.composer.descriptionPlaceholder = "例程描述（可选）";
    r.composer.create = "创建";
    r.composer.creating = "创建中...";
    r.composer.cancel = "取消";
    r.composer.error = "创建例程失败。";
  }

  if (r.policies) {
    r.policies.title = "策略";
    r.policies.description = "配置例程的运行策略。";
    r.policies.enabled = "已启用";
    r.policies.disabled = "已禁用";
    r.policies.frequency = "频率";
    r.policies.interval = "间隔";
    r.policies.cron = "Cron 表达式";
    r.policies.webhook = "Webhook";
    r.policies.manual = "手动";
  }

  if (r.toasts) {
    r.toasts.saved = "例程已保存";
    r.toasts.saveFailed = "保存例程失败";
    r.toasts.ran = "例程已运行";
    r.toasts.runFailed = "运行例程失败";
    r.toasts.triggerCreated = "触发器已创建";
    r.toasts.triggerCreateFailed = "创建触发器失败";
    r.toasts.triggerUpdated = "触发器已更新";
    r.toasts.triggerUpdateFailed = "更新触发器失败";
    r.toasts.triggerDeleted = "触发器已删除";
    r.toasts.triggerDeleteFailed = "删除触发器失败";
    r.toasts.webhookRotated = "Webhook 密钥已轮换";
    r.toasts.webhookRotateFailed = "轮换 Webhook 密钥失败";
    r.toasts.restored = "例程已恢复";
    r.toasts.restoreFailed = "恢复例程失败";
  }

  if (r.detail) {
    r.detail.title = "例程详情";
    r.detail.overview = "概览";
    r.detail.history = "历史";
    r.detail.settings = "设置";
    r.detail.run = "运行";
    r.detail.pause = "暂停";
    r.detail.resume = "恢复";
    r.detail.archive = "归档";
    r.detail.delete = "删除";
    r.detail.save = "保存";
    r.detail.saving = "保存中...";
    r.detail.unsavedChanges = "未保存的更改";
    r.detail.discard = "放弃";
    r.detail.keepEditing = "继续编辑";
  }

  if (r.sections) {
    r.sections.overview = "概览";
    r.sections.triggers = "触发器";
    r.sections.variables = "变量";
    r.sections.instructions = "指令";
    r.sections.policies = "策略";
    r.sections.history = "历史";
  }

  if (r.dirty) {
    r.dirty.title = "标题";
    r.dirty.description = "描述";
    r.dirty.instructions = "指令";
    r.dirty.triggers = "触发器";
    r.dirty.variables = "变量";
    r.dirty.policies = "策略";
  }

  if (r.history) {
    r.history.title = "历史";
    r.history.noHistory = "暂无历史记录。";
    r.history.run = "运行";
    r.history.status = "状态";
    r.history.duration = "时长";
    r.history.cost = "成本";
    r.history.date = "日期";
    r.history.viewDetails = "查看详情";
    r.history.restore = "恢复";
    r.history.restoreConfirm = "确定要恢复到此版本吗？";
    r.history.restoring = "恢复中...";
    r.history.preview = "预览";
    r.history.diff = "差异";
    r.history.conflict = "冲突";
    r.history.conflictDescription = "此版本与当前版本有冲突。";
    r.history.resolveConflict = "解决冲突";
    r.history.overwrite = "覆盖";
    r.history.merge = "合并";
    r.history.cancel = "取消";
  }

  if (r.nav) {
    r.nav.groupRoutine = "例程";
    r.nav.groupTriggers = "触发器";
    r.nav.groupVariables = "变量";
    r.nav.groupInstructions = "指令";
    r.nav.groupPolicies = "策略";
    r.nav.groupHistory = "历史";
    r.nav.unsavedChanges = "未保存的更改";
    r.nav.routineSection = "例程部分";
  }
}

// Approval Chinese translations
if (zhCN.approval) {
  const a = zhCN.approval;
  a.title = "审批";
  a.selectCompany = "选择一家公司以查看审批。";
  a.noApprovals = "暂无审批。";
  a.pending = "待处理";
  a.approved = "已批准";
  a.rejected = "已拒绝";
  a.all = "全部";
  a.approve = "批准";
  a.reject = "拒绝";
  a.approving = "批准中...";
  a.rejecting = "拒绝中...";
  a.requestedBy = "请求者：";
  a.requestedAt = "请求时间：";
  a.respondedAt = "响应时间：";
  a.respondedBy = "响应者：";
  a.comment = "评论";
  a.addComment = "添加评论...";
  a.noComment = "暂无评论。";
  a.confirmApprove = "确定要批准此请求吗？";
  a.confirmReject = "确定要拒绝此请求吗？";
  a.approveSuccess = "已批准";
  a.approveFailed = "批准失败";
  a.rejectSuccess = "已拒绝";
  a.rejectFailed = "拒绝失败";
  a.loadFailed = "加载审批详情失败。";
  a.notFound = "未找到审批。";
  a.back = "返回审批列表";
  a.details = "详情";
  a.payload = "内容";
  a.timeline = "时间线";
}

// Artifact Chinese translations
if (zhCN.artifact) {
  const a = zhCN.artifact;
  a.title = "制品";
  a.selectCompany = "选择一家公司以查看制品。";
  a.noArtifacts = "暂无制品。";
  a.searchPlaceholder = "搜索制品...";
  a.noResults = "没有匹配的制品。";
  a.loading = "加载中...";
  a.error = "加载制品失败。";
  a.retry = "重试";
  a.allStacks = "所有堆栈";
  a.filterByKind = "按类型筛选";
  a.groupBy = "分组";
  a.kind = "类型";
  a.stack = "堆栈";
  a.status = "状态";
  a.created = "创建时间";
  a.updated = "更新时间";
  a.view = "查看";
  a.download = "下载";
  a.approve = "批准";
  a.reject = "拒绝";
  a.approving = "批准中...";
  a.rejecting = "拒绝中...";
  a.pending = "待处理";
  a.approved = "已批准";
  a.rejected = "已拒绝";
  a.generating = "生成中...";
  a.generated = "已生成";
  a.failed = "失败";
  a.noDocuments = "暂无文档。";
  a.documentViewer = "文档查看器";
  a.close = "关闭";
  a.fullScreen = "全屏";
  a.exitFullScreen = "退出全屏";
  a.previous = "上一个";
  a.next = "下一个";
  a.pageOf = "第 {{current}} 页，共 {{total}} 页";
  a.approveSuccess = "已批准";
  a.approveFailed = "批准失败";
  a.rejectSuccess = "已拒绝";
  a.rejectFailed = "拒绝失败";
  a.statusBanner = {
    pending: "此制品正在等待审批。",
    approved: "此制品已批准。",
    rejected: "此制品已拒绝。",
    generating: "此制品正在生成中。"
  };
}

// BoardChat Chinese translations
if (zhCN.boardChat) {
  const b = zhCN.boardChat;
  b.conferenceRoom = "会议室";
  b.noCompanySelected = "未选择公司";
  b.noCompanyDescription = "选择一家公司以开始对话。";
  b.yourCompany = "您的公司";
  b.chatHistory = "聊天记录";
  b.newChat = "新建聊天";
  b.connecting = "连接中...";
  b.thinking = "思考中...";
  b.assistant = "助手";
  b.streamError = "流式传输出错。";
  b.unavailableError = "服务不可用。";
  b.jumpToLatest = "跳转到最新";
  b.placeholder = "输入消息...";
  b.sendLabel = "发送";
  b.resizeBoardChat = "调整聊天窗口大小";
  b.openAgentFeed = "打开智能体动态";
  b.welcomeBody = "欢迎使用 {{companyName}} 的会议室！";
  b.missionLineWithText = "{{ceoName}} 的使命：{{missionText}}";
  b.missionLineEmpty = "{{ceoName}} 尚未定义使命。";
  b.chipDraftBrief = "起草简报";
  b.chipDraftBriefPrompt = "为 {{companyName}} 起草一份简报。";
  b.chipHiringPlan = "招聘计划";
  b.chipHiringPlanPrompt = "为 {{companyName}} 制定招聘计划。";
  b.chipFirst30Days = "前 30 天";
  b.chipFirst30DaysPrompt = "为 {{companyName}} 制定前 30 天计划。";
  b.chipIntroPitch = "介绍 pitch";
  b.chipIntroPitchPrompt = "为 {{companyName}} 撰写介绍 pitch。";
}

fs.writeFileSync('ui/src/i18n/locales/zh-CN.json', JSON.stringify(zhCN, null, 2) + '\n');

function countKeys(obj) {
  let c = 0;
  for (const v of Object.values(obj)) {
    if (typeof v === 'object' && v !== null) c += countKeys(v);
    else c++;
  }
  return c;
}

function findMissing(target, source, prefix) {
  prefix = prefix || '';
  const missing = [];
  for (const key of Object.keys(source)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key] || typeof target[key] !== 'object') {
        missing.push(fullKey + ' (section)');
      } else {
        missing.push.apply(missing, findMissing(target[key], source[key], fullKey));
      }
    } else if (!(key in target)) {
      missing.push(fullKey);
    }
  }
  return missing;
}

function countEnglish(target, source) {
  let english = 0, total = 0, chinese = 0;
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'object' && value !== null) {
      if (target[key] && typeof target[key] === 'object') {
        const sub = countEnglish(target[key], value);
        english += sub.english; total += sub.total; chinese += sub.chinese;
      }
    } else {
      total++;
      if (target[key] === value) english++;
      else if (target[key]) chinese++;
    }
  }
  return { english, total, chinese };
}

console.log('en.json keys:', countKeys(en));
console.log('zh-CN.json keys:', countKeys(zhCN));
var missing = findMissing(zhCN, en);
console.log('Missing in zh-CN:', missing.length);
if (missing.length > 0) {
  console.log('First 10:', missing.slice(0, 10));
} else {
  console.log('All keys are in sync!');
}
var progress = countEnglish(zhCN, en);
console.log('Translation progress:', progress.chinese + '/' + progress.total + ' (' + Math.round(progress.chinese / progress.total * 100) + '%)');
