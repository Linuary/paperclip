const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

// Project dialog translations
if (!zh.project) zh.project = {};
zh.project.dialog = {
  newProject: '新建项目',
  projectNamePlaceholder: '项目名称',
  addDescription: '添加描述...',
  repoUrl: '仓库 URL',
  optional: '可选',
  repoUrlTooltip: '关联 GitHub 仓库以便代理可以克隆、读取和推送代码。',
  localFolder: '本地文件夹',
  localFolderTooltip: '设置本机上的绝对路径，本地代理将在此读写项目文件。',
  goal: '目标',
  addGoal: '+ 目标',
  noGoal: '无目标',
  allGoalsSelected: '所有目标已选择。',
  targetDate: '目标日期',
  failedToCreate: '创建项目失败。',
  creating: '创建中...',
  createProject: '创建项目',
  removeGoal: '移除目标 {{title}}',
};

// Goal dialog translations
if (!zh.goal) zh.goal = {};
zh.goal.dialog = {
  newGoal: '新建目标',
  newSubGoal: '新建子目标',
  goalTitlePlaceholder: '目标标题',
  addDescription: '添加描述...',
  levelCompany: '公司',
  levelTeam: '团队',
  levelAgent: '代理',
  levelTask: '任务',
  parentGoal: '父目标',
  noParent: '无父目标',
  creating: '创建中...',
  createGoal: '创建目标',
  createSubGoal: '创建子目标',
};

// Agent dialog translations
if (!zh.agent) zh.agent = {};
zh.agent.dialog = {
  addNewAgent: '添加新代理',
  recommendation: '推荐：让 CEO 帮你设置代理，或者邀请外部协作者加入。',
  askCeo: '询问 CEO',
  askCeoTitle: '询问 CEO',
  askCeoDescription: 'CEO 将帮助你设置代理。',
  configureRuntime: '配置运行时',
  inviteExternal: '邀请外部协作者',
  inviteExternalHint: '发送邀请链接，让外部协作者加入。',
  chooseRuntime: '选择运行时环境。',
  recommended: '推荐',
  inviteHeading: '邀请协作者',
  inviteDescription: '生成邀请链接发送给协作者。',
  optionalMessage: '可选消息',
  optionalMessagePlaceholder: '添加个人消息...',
  inviteInfo: '邀请链接有效期为 7 天。',
  generating: '生成中...',
  generatePrompt: '生成邀请',
  onboardingPrompt: '入门提示',
  sendPromptHint: '此提示将发送给协作者。',
  copied: '已复制',
  copiedPrompt: '提示已复制',
  copyPrompt: '复制提示',
  inviteCreated: '邀请已创建',
  promptReadyCopied: '提示已准备好并复制到剪贴板',
  promptReady: '提示已准备好',
  inviteCreateFailed: '创建邀请失败',
  clipboardUnavailable: '剪贴板不可用',
  copyManuallyBelow: '请手动复制以下内容：',
  copyManuallyAbove: '请手动复制以上内容。',
};

// CommandPalette translations
zh.commandPalette = {
  searchPlaceholder: '搜索任务、代理、项目...',
  noQuickMatchPrefix: '没有快速匹配。',
  noQuickMatchMiddle: '尝试',
  searchAll: '搜索全部',
  noQuickMatchSuffix: '查看更多结果。',
  noResults: '未找到结果。',
  searchGroup: '搜索',
  searchAllFor: '搜索全部',
  openFullSearch: '打开完整搜索',
  actionsGroup: '操作',
  createNewTask: '创建新任务',
  openFileInIssue: '在问题中打开文件...',
  createNewAgent: '创建新代理',
  createNewProject: '创建新项目',
  pagesGroup: '页面',
  dashboard: '仪表板',
  inbox: '收件箱',
  tasks: '任务',
  projects: '项目',
  goals: '目标',
  agents: '代理',
  costs: '成本',
  activity: '活动',
  tasksGroup: '任务',
  agentsGroup: '代理',
  projectsGroup: '项目',
};

// Keyboard shortcuts translations
zh.keyboardShortcuts = {
  title: '键盘快捷键',
  pressEsc: '按 Esc',
  toClose: '关闭',
  shortcutsDisabled: '快捷键已禁用',
  then: '然后',
  sections: {
    inbox: '收件箱',
    taskDetail: '任务详情',
    global: '全局',
  },
  moveDown: '下移',
  moveUp: '上移',
  collapseSelectedGroup: '折叠选中分组',
  expandSelectedGroup: '展开选中分组',
  openSelectedItem: '打开选中项',
  archiveItem: '归档项目',
  markAsRead: '标记为已读',
  markAsUnread: '标记为未读',
  quickArchiveToInbox: '快速归档到收件箱',
  goToInbox: '前往收件箱',
  focusCommentComposer: '聚焦评论编辑器',
  searchCurrentPage: '搜索当前页面',
  newTask: '新建任务',
  toggleSidebar: '切换侧边栏',
  collapseOrExpandSidebar: '折叠或展开侧边栏',
  togglePanel: '切换面板',
  showKeyboardShortcuts: '显示键盘快捷键',
};

// ExecutionWorkspace close dialog translations
zh.executionWorkspace = {
  close: {
    title: '关闭工作区',
    description: '关闭前请完成或确认以下事项。',
    archive: '归档',
    archiveDescriptionPrefix: '归档工作区',
    archiveDescriptionSuffix: '将保留快照但停止所有运行中的任务。',
    cancel: '取消',
    confirm: '确认关闭',
    blockingTasks: '阻塞任务',
    warnings: '警告',
    gitStatus: 'Git 状态',
    branch: '分支',
    uncommittedChanges: '未提交的更改',
    files: '文件',
    staged: '已暂存',
    unstaged: '未暂存',
    untracked: '未跟踪',
    commitMessage: '提交消息',
    commitMessagePlaceholder: '输入提交消息...',
    commitAndClose: '提交并关闭',
    discardAndClose: '丢弃并关闭',
    noBlockingTasks: '无阻塞任务。',
    noWarnings: '无警告。',
    ready: '就绪',
    notReady: '未就绪',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    failed: '失败',
    retry: '重试',
    force: '强制',
    forceClose: '强制关闭',
    forceCloseWarning: '强制关闭可能会丢失未保存的工作。',
    saveDraft: '保存草稿',
    discardDraft: '丢弃草稿',
    draftSaved: '草稿已保存',
    draftDiscarded: '草稿已丢弃',
    closeWithoutSaving: '不保存直接关闭',
    unsavedChanges: '有未保存的更改',
    unsavedChangesWarning: '您有未保存的更改。确定要关闭吗？',
  },
};

// Routine dialog translations
if (!zh.routine) zh.routine = {};
zh.routine.dialog = {
  title: '运行例程',
  description: '配置运行参数。',
  agentLabel: '代理',
  agentPlaceholder: '选择代理',
  projectLabel: '项目',
  projectPlaceholder: '选择项目',
  noValue: '无值',
  trueValue: '是',
  falseValue: '否',
  required: '必填',
  invalidType: '类型无效',
  cancel: '取消',
  run: '运行',
  running: '运行中...',
  variables: '变量',
  noVariables: '此例程没有变量。',
  selectAgent: '选择代理',
  selectProject: '选择项目',
  noAgents: '无可用代理',
  noProjects: '无可用项目',
  searchAgents: '搜索代理...',
  searchProjects: '搜索项目...',
};

fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
console.log('Chinese translations updated for batch 9 sections.');

// Count progress
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
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
console.log('en.json total keys:', total);
console.log('zh-CN translated keys:', translated);
console.log('Progress:', Math.round(translated/total*100) + '%');
