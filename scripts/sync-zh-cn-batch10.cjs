const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

// Chat composer
zh.chatComposer = {
  placeholder: '输入消息...',
  sendLabel: '发送',
  dropOverlay: '拖放文件到此处',
  attachFile: '附加文件',
  uploading: '上传中...',
  uploadFailed: '上传失败',
  attachButton: '附加',
  maxFileSize: '文件大小超限',
};

// Comment thread
zh.commentThread = {
  title: '评论',
  noComments: '暂无评论',
  addComment: '添加评论',
  placeholder: '输入评论...',
  sending: '发送中...',
  send: '发送',
  cancel: '取消',
  delete: '删除',
  deleteConfirm: '确定要删除此评论吗？',
  deleted: '评论已删除',
  edit: '编辑',
  reply: '回复',
  copyMarkdown: '复制 Markdown',
  copied: '已复制',
  copyFailed: '复制失败',
  showMore: '显示更多',
  showLess: '收起',
  timeline: '时间线',
  noEvents: '暂无事件',
  loadMore: '加载更多',
  loading: '加载中...',
  error: '加载失败',
  retry: '重试',
};

// Company switcher
zh.companySwitcher = {
  switchCompany: '切换公司',
  createCompany: '创建公司',
  manageCompanies: '管理公司',
  noCompanies: '无公司',
  currentCompany: '当前公司',
};

// Dev restart banner
zh.devRestartBanner = {
  title: '开发服务器需要重启',
  description: '检测到配置更改，需要重启服务器。',
  restart: '重启',
  restarting: '重启中...',
  dismiss: '关闭',
  reason: '原因',
  details: '详情',
  confirm: '确认重启',
  confirmDesc: '确定要重启开发服务器吗？',
  yes: '是',
  no: '否',
  autoRestart: '自动重启',
  autoRestartDesc: '服务器将在几秒后自动重启。',
  cancelAutoRestart: '取消自动重启',
  manualRestart: '手动重启',
  status: '状态',
  ready: '就绪',
  error: '错误',
  warning: '警告',
};

// Cloud access gate
zh.cloudAccessGate = {
  title: '需要云端访问',
  description: '此功能需要云端访问权限。',
  contactAdmin: '请联系管理员获取访问权限。',
  loading: '检查访问权限中...',
  denied: '访问被拒绝',
};

// Bootstrap pending
zh.bootstrapPending = {
  title: '初始化中',
  description: '正在设置您的环境...',
  loading: '加载中...',
  error: '初始化失败',
  retry: '重试',
  cliFallback: 'CLI 回退',
  cliFallbackDesc: '如果您无法通过浏览器访问，请使用 CLI。',
  copyCommand: '复制命令',
  copied: '已复制',
  openBrowser: '在浏览器中打开',
  waitingForAuth: '等待认证...',
  authComplete: '认证完成',
  authFailed: '认证失败',
  setupComplete: '设置完成',
  setupFailed: '设置失败',
  redirecting: '跳转中...',
  welcome: '欢迎',
  getStarted: '开始使用',
  learnMore: '了解更多',
};

// Env var editor
zh.envVarEditor = {
  title: '环境变量',
  addVariable: '添加变量',
  name: '名称',
  value: '值',
  secret: '密钥',
  remove: '移除',
  noVariables: '暂无环境变量',
  placeholder: '变量名',
  valuePlaceholder: '变量值',
  save: '保存',
  cancel: '取消',
  saved: '已保存',
  error: '保存失败',
  helpText: '环境变量将在运行时注入到代理进程中。',
  duplicateName: '变量名已存在',
  invalidName: '变量名无效',
};

// Execution participant picker
zh.executionParticipant = {
  title: '选择参与者',
  reviewer: '审查者',
  approver: '审批者',
  searchPlaceholder: '搜索用户...',
  noResults: '未找到用户',
  add: '添加',
  remove: '移除',
  noParticipants: '暂无参与者',
};

// Feed card
zh.feedCard = {
  created: '创建了',
  updated: '更新了',
  deleted: '删除了',
  commented: '评论了',
  assigned: '分配了',
  unassigned: '取消分配了',
  statusChanged: '更改了状态',
  priorityChanged: '更改了优先级',
  labelAdded: '添加了标签',
  labelRemoved: '移除了标签',
  attachmentAdded: '添加了附件',
  attachmentRemoved: '移除了附件',
  mentioned: '提到了',
  referenced: '引用了',
  merged: '合并了',
  closed: '关闭了',
  reopened: '重新打开了',
  archived: '归档了',
  restored: '恢复了',
  pinned: '置顶了',
  unpinned: '取消置顶了',
  linked: '关联了',
  unlinked: '取消关联了',
  started: '开始了',
  completed: '完成了',
  failed: '失败了',
  cancelled: '取消了',
  resumed: '恢复了',
  paused: '暂停了',
  escalated: '升级了',
  delegated: '委托了',
  approved: '批准了',
  rejected: '拒绝了',
  submitted: '提交了',
  reviewed: '审查了',
  mergedPR: '合并了 PR',
  actor: '操作者',
  target: '目标',
  time: '时间',
};

// File tree
zh.fileTree = {
  title: '文件',
  empty: '暂无文件',
  error: '加载文件失败',
  retry: '重试',
  collapse: '折叠',
  expand: '展开',
  folder: '文件夹',
  file: '文件',
  open: '打开',
  download: '下载',
  delete: '删除',
  rename: '重命名',
  newFile: '新建文件',
  newFolder: '新建文件夹',
  search: '搜索文件',
};

// File viewer
zh.fileViewer = {
  title: '文件查看器',
  loading: '加载中...',
  error: '加载文件失败',
  retry: '重试',
  close: '关闭',
  download: '下载',
  openInNewTab: '在新标签页打开',
  copyPath: '复制路径',
  copied: '已复制',
  noPreview: '无法预览此文件类型',
  binaryFile: '二进制文件',
  tooLarge: '文件太大无法预览',
  line: '行',
  column: '列',
  size: '大小',
  modified: '修改时间',
  type: '类型',
  encoding: '编码',
  permissions: '权限',
  metadata: '元数据',
  content: '内容',
  raw: '原始',
  rendered: '渲染',
  diff: '差异',
  previous: '上一个',
  next: '下一个',
  zoomIn: '放大',
  zoomOut: '缩小',
  resetZoom: '重置缩放',
  fitToScreen: '适应屏幕',
  fullScreen: '全屏',
  exitFullScreen: '退出全屏',
  search: '搜索',
  noResults: '未找到结果',
  matchCount: '{{count}} 个匹配',
  denyTitle: '访问被拒绝',
  denyDescription: '您没有权限查看此文件。',
};

// Fold curtain
zh.foldCurtain = {
  showMore: '显示更多',
  showLess: '收起',
};

// Image gallery
zh.imageGallery = {
  image: '图片',
  download: '下载',
  close: '关闭',
  previous: '上一张',
  next: '下一张',
  zoomIn: '放大',
  zoomOut: '缩小',
  rotate: '旋转',
};

// Inline editor
zh.inlineEditor = {
  clickToEdit: '点击编辑...',
  autosaving: '自动保存中...',
  saved: '已保存',
  couldNotSave: '保存失败',
  idle: '空闲',
};

// Onboarding
zh.onboarding = {
  welcome: '欢迎使用 Paperclip',
  getStarted: '开始使用',
  setupAgent: '设置代理',
  chooseAdapter: '选择适配器',
  configureEnvironment: '配置环境',
  testConnection: '测试连接',
  connectionSuccess: '连接成功',
  connectionFailed: '连接失败',
  next: '下一步',
  back: '返回',
  skip: '跳过',
  finish: '完成',
  loading: '加载中...',
  error: '出错了',
  retry: '重试',
  missionPrompt: '任务提示',
  selectModel: '选择模型',
  apiKey: 'API 密钥',
  apiKeyPlaceholder: '输入您的 API 密钥',
  baseUrl: '基础 URL',
  baseUrlPlaceholder: '输入基础 URL（可选）',
  testing: '测试中...',
  test: '测试',
  save: '保存',
  saved: '已保存',
  saveFailed: '保存失败',
  recommended: '推荐',
  advanced: '高级',
  basic: '基础',
  required: '必填',
  optional: '可选',
};

// Onboarding classic
zh.onboardingClassic = {
  ...zh.onboarding,
  title: '入门设置',
  subtitle: '让我们帮您设置环境。',
  step1: '步骤 1',
  step2: '步骤 2',
  step3: '步骤 3',
  selectProvider: '选择提供商',
  enterCredentials: '输入凭据',
  verifySetup: '验证设置',
  providerDescription: '选择您的 AI 提供商。',
  credentialDescription: '输入您的 API 凭据。',
  verifyDescription: '验证您的设置是否正确。',
  success: '设置完成',
  successDescription: '您的环境已准备就绪。',
  goToDashboard: '前往仪表板',
};

// Onboarding chat
zh.onboardingChat = {
  title: '开始对话',
  subtitle: '让我帮您设置。',
  placeholder: '输入您的需求...',
  send: '发送',
  thinking: '思考中...',
  error: '出错了',
  retry: '重试',
  skip: '跳过',
  done: '完成',
};

// Auth
zh.auth = {
  title: '登录',
  subtitle: '欢迎回来',
  email: '邮箱',
  password: '密码',
  login: '登录',
  register: '注册',
  forgotPassword: '忘记密码？',
  noAccount: '没有账户？',
  hasAccount: '已有账户？',
  orContinueWith: '或继续使用',
  loading: '登录中...',
  error: '登录失败',
  invalidCredentials: '邮箱或密码错误',
  magicLink: '魔法链接',
  magicLinkSent: '魔法链接已发送到您的邮箱',
};

// Companies
zh.companies = {
  title: '公司',
  createCompany: '创建公司',
  noCompanies: '暂无公司',
  name: '名称',
  slug: '标识',
  description: '描述',
  create: '创建',
  cancel: '取消',
  creating: '创建中...',
  error: '创建失败',
  settings: '设置',
  members: '成员',
  delete: '删除',
  deleteConfirm: '确定要删除此公司吗？',
};

// Not found
zh.notFound = {
  title: '页面未找到',
  description: '您访问的页面不存在。',
  goHome: '返回首页',
  goBack: '返回',
  search: '搜索',
  help: '帮助',
};

// Invite landing
zh.inviteLanding = {
  title: '邀请',
  description: '您已被邀请加入。',
  accept: '接受邀请',
  decline: '拒绝',
  loading: '加载中...',
  error: '加载邀请失败',
  expired: '邀请已过期',
  invalid: '邀请无效',
  accepted: '邀请已接受',
  declined: '邀请已拒绝',
  loginToAccept: '登录以接受邀请',
  registerToAccept: '注册以接受邀请',
  alreadyMember: '您已经是成员',
  pending: '邀请待处理',
  acceptedBy: '已被接受',
  invitedBy: '邀请者',
  invitedAt: '邀请时间',
  role: '角色',
  permissions: '权限',
};

// Join requests
zh.joinRequests = {
  title: '加入请求',
  noRequests: '暂无请求',
  approve: '批准',
  reject: '拒绝',
  approveAll: '全部批准',
  rejectAll: '全部拒绝',
  pending: '待处理',
  approved: '已批准',
  rejected: '已拒绝',
  requestedBy: '请求者',
  requestedAt: '请求时间',
  message: '消息',
  loading: '加载中...',
  error: '操作失败',
  success: '操作成功',
};

// User profile
zh.userProfile = {
  title: '个人资料',
  name: '名称',
  email: '邮箱',
  avatar: '头像',
  save: '保存',
  cancel: '取消',
  saved: '已保存',
  error: '保存失败',
  loading: '加载中...',
  changePassword: '修改密码',
  currentPassword: '当前密码',
  newPassword: '新密码',
  confirmPassword: '确认密码',
  passwordMismatch: '密码不匹配',
  passwordChanged: '密码已修改',
  deleteAccount: '删除账户',
  deleteAccountConfirm: '确定要删除您的账户吗？此操作无法撤销。',
  usage: '使用情况',
  activity: '活动',
  preferences: '偏好设置',
};

// My issues
zh.myIssues = {
  title: '我的问题',
  noIssues: '暂无问题',
  loading: '加载中...',
};

// New agent
zh.newAgent = {
  title: '新建代理',
  name: '名称',
  description: '描述',
  create: '创建',
  cancel: '取消',
  creating: '创建中...',
  error: '创建失败',
};

// Team catalog
zh.teamCatalog = {
  title: '团队目录',
  noTeams: '暂无团队',
  createTeam: '创建团队',
  loading: '加载中...',
  error: '加载失败',
  name: '名称',
  description: '描述',
  members: '成员',
  install: '安装',
  uninstall: '卸载',
  configure: '配置',
  settings: '设置',
  details: '详情',
  targets: '目标',
  sources: '来源',
  skills: '技能',
  preview: '预览',
  apply: '应用',
  applying: '应用中...',
  success: '成功',
  failed: '失败',
  retry: '重试',
  cancel: '取消',
  save: '保存',
  saved: '已保存',
  saveFailed: '保存失败',
};

// Org
zh.org = {
  title: '组织',
  loading: '加载中...',
  error: '加载失败',
};

// Org chart
zh.orgChart = {
  title: '组织架构',
  loading: '加载中...',
  error: '加载失败',
  zoomIn: '放大',
  zoomOut: '缩小',
  reset: '重置',
  fullscreen: '全屏',
  exitFullscreen: '退出全屏',
};

// Board claim
zh.boardClaim = {
  title: '认领面板',
  description: '认领您的面板。',
  claim: '认领',
  claiming: '认领中...',
  claimed: '已认领',
  error: '认领失败',
  retry: '重试',
  loading: '加载中...',
  alreadyClaimed: '已被认领',
  notFound: '面板未找到',
  instructions: '按照以下步骤认领您的面板。',
  copyCode: '复制代码',
  copied: '已复制',
  openTerminal: '打开终端',
  runCommand: '运行命令',
  verify: '验证',
  verifying: '验证中...',
  verified: '已验证',
  verificationFailed: '验证失败',
};

// CLI auth
zh.cliAuth = {
  title: 'CLI 认证',
  description: '使用 CLI 进行认证。',
  code: '代码',
  copyCode: '复制代码',
  copied: '已复制',
  openBrowser: '在浏览器中打开',
  waitingForAuth: '等待认证...',
  authComplete: '认证完成',
  authFailed: '认证失败',
  retry: '重试',
  loading: '加载中...',
  instructions: '按照以下步骤完成认证。',
  step1: '打开终端',
  step2: '运行命令',
  step3: '输入代码',
  expiresIn: '有效期',
  regenerate: '重新生成',
  cancel: '取消',
};

// Approval card
zh.approvalCard = {
  title: '审批',
  pending: '待审批',
  approved: '已批准',
  rejected: '已拒绝',
  approve: '批准',
  reject: '拒绝',
  viewDetails: '查看详情',
  submittedBy: '提交者',
  submittedAt: '提交时间',
  reviewedBy: '审查者',
  reviewedAt: '审查时间',
  comments: '评论',
  noComments: '暂无评论',
};

// Approval payload
zh.approvalPayload = {
  title: '审批内容',
  loading: '加载中...',
  error: '加载失败',
  noPayload: '无内容',
  viewRaw: '查看原始',
  copy: '复制',
  copied: '已复制',
};

// Artifact card
zh.artifactCard = {
  title: '产物',
  view: '查看',
  download: '下载',
  delete: '删除',
  deleteConfirm: '确定要删除此产物吗？',
  size: '大小',
  type: '类型',
  createdAt: '创建时间',
  noArtifacts: '暂无产物',
};

// Budget cards
zh.budgetIncident = {
  title: '预算事件',
  description: '检测到预算超支。',
  amount: '金额',
  limit: '限额',
  usage: '使用量',
  period: '周期',
  acknowledge: '确认',
  details: '详情',
};

zh.budgetPolicy = {
  title: '预算策略',
  description: '管理预算策略。',
  create: '创建策略',
  edit: '编辑策略',
  delete: '删除策略',
  name: '名称',
  amount: '金额',
  period: '周期',
  save: '保存',
  cancel: '取消',
};

zh.budgetSidebar = {
  title: '预算',
  usage: '使用量',
  limit: '限额',
  remaining: '剩余',
  exceeded: '已超支',
};

zh.billerSpend = {
  title: '账单支出',
  current: '当前',
  projected: '预计',
  period: '周期',
  loading: '加载中...',
  error: '加载失败',
};

zh.accountingModel = {
  title: '计费模型',
  description: '管理计费模型。',
  select: '选择模型',
  current: '当前模型',
  change: '更改',
  save: '保存',
  cancel: '取消',
};

// Active agents panel
zh.activeAgentsPanel = {
  title: '活跃代理',
  noAgents: '暂无活跃代理',
  loading: '加载中...',
  error: '加载失败',
  viewAll: '查看全部',
  running: '运行中',
  paused: '已暂停',
  stopped: '已停止',
};

// Activity charts
zh.activityCharts = {
  title: '活动图表',
  loading: '加载中...',
  error: '加载失败',
  noData: '暂无数据',
  period: '周期',
  tasks: '任务',
  agents: '代理',
  runs: '运行',
  cost: '成本',
};

// Activity row
zh.activityRow = {
  viewDetails: '查看详情',
  time: '时间',
  actor: '操作者',
  action: '操作',
  target: '目标',
};

// Routine components
zh.routineList = {
  title: '例程',
  noRoutines: '暂无例程',
  create: '创建例程',
  loading: '加载中...',
  error: '加载失败',
  run: '运行',
  edit: '编辑',
  delete: '删除',
  enable: '启用',
  disable: '禁用',
  schedule: '计划',
  lastRun: '上次运行',
  nextRun: '下次运行',
};

zh.routineSaveBar = {
  save: '保存',
  saving: '保存中...',
  saved: '已保存',
  discard: '放弃',
  confirm: '确认',
  cancel: '取消',
  unsavedChanges: '有未保存的更改',
};

zh.routineTrigger = {
  title: '触发器',
  manual: '手动',
  schedule: '计划',
  webhook: 'Webhook',
  event: '事件',
  configure: '配置',
  enable: '启用',
  disable: '禁用',
};

zh.routineVariables = {
  title: '变量',
  addVariable: '添加变量',
  name: '名称',
  type: '类型',
  value: '值',
  required: '必填',
  remove: '移除',
  noVariables: '暂无变量',
};

zh.scheduleEditor = {
  title: '计划编辑器',
  cron: 'Cron 表达式',
  timezone: '时区',
  nextRun: '下次运行',
  lastRun: '上次运行',
  enabled: '已启用',
  disabled: '已禁用',
  save: '保存',
  cancel: '取消',
  invalid: '无效的 Cron 表达式',
};

zh.managedRoutines = {
  title: '托管例程',
  noRoutines: '暂无托管例程',
  loading: '加载中...',
  error: '加载失败',
  install: '安装',
  uninstall: '卸载',
  configure: '配置',
};

zh.routineSections = {
  editable: {
    title: '可编辑',
    add: '添加',
    remove: '移除',
    reorder: '重新排序',
    save: '保存',
    cancel: '取消',
  },
  operate: {
    title: '操作',
    run: '运行',
    pause: '暂停',
    resume: '恢复',
    stop: '停止',
    restart: '重启',
  },
};

// Search components
zh.searchResult = {
  noResults: '未找到结果',
  loading: '加载中...',
  error: '搜索失败',
  retry: '重试',
  viewAll: '查看全部',
  relevance: '相关性',
  date: '日期',
  type: '类型',
};

zh.matchSource = {
  title: '匹配来源',
  description: '描述',
  content: '内容',
  name: '名称',
  tag: '标签',
};

// Kanban board
zh.kanbanBoard = {
  title: '看板',
  noColumns: '暂无列',
  addColumn: '添加列',
  removeColumn: '移除列',
  renameColumn: '重命名列',
  noItems: '暂无项目',
  moveItem: '移动项目',
  dragToReorder: '拖拽重新排序',
};

// Live run widget
zh.liveRun = {
  title: '实时运行',
  running: '运行中',
  completed: '已完成',
  failed: '失败',
  cancelled: '已取消',
  viewDetails: '查看详情',
  stop: '停止',
  restart: '重启',
  logs: '日志',
  output: '输出',
  errors: '错误',
  duration: '持续时间',
  startedAt: '开始时间',
};

// Workspace components
zh.workspaceFileBrowser = {
  title: '文件浏览器',
  loading: '加载中...',
  error: '加载文件失败',
  retry: '重试',
  empty: '暂无文件',
  open: '打开',
  download: '下载',
  upload: '上传',
  delete: '删除',
  rename: '重命名',
  newPath: '新建路径',
  search: '搜索',
};

zh.workspaceRuntime = {
  title: '运行时控制',
  start: '启动',
  stop: '停止',
  restart: '重启',
  status: '状态',
  running: '运行中',
  stopped: '已停止',
  error: '错误',
  loading: '加载中...',
  logs: '日志',
  environment: '环境',
  variables: '变量',
};

zh.worktreeBanner = {
  title: '工作树',
  description: '您正在使用工作树。',
  switch: '切换',
  create: '创建',
  delete: '删除',
  merge: '合并',
  current: '当前',
  branch: '分支',
  path: '路径',
};

// System notice
zh.systemNotice = {
  title: '系统通知',
  dismiss: '关闭',
  details: '详情',
  loading: '加载中...',
  error: '加载失败',
  noNotices: '暂无通知',
};

// Theme toggle
zh.themeToggle = {
  light: '浅色',
  dark: '深色',
  system: '系统',
  toggle: '切换主题',
};

// Path instructions
zh.pathInstructions = {
  title: '路径说明',
  description: '按照以下步骤设置路径。',
  copy: '复制',
  copied: '已复制',
  close: '关闭',
};

// Secret binding picker
zh.secretBinding = {
  title: '密钥绑定',
  selectSecret: '选择密钥',
  noSecrets: '暂无密钥',
  loading: '加载中...',
  error: '加载失败',
  search: '搜索密钥',
  create: '创建密钥',
  manage: '管理密钥',
};

// Agent bubble action row
zh.agentBubbleAction = {
  title: '代理操作',
  retry: '重试',
  edit: '编辑',
  delete: '删除',
  copy: '复制',
  share: '分享',
  more: '更多',
};

// Agent config primitives
zh.agentConfig = {
  title: '代理配置',
  name: '名称',
  description: '描述',
  model: '模型',
  temperature: '温度',
  maxTokens: '最大令牌数',
  systemPrompt: '系统提示',
  save: '保存',
  cancel: '取消',
  saved: '已保存',
  error: '保存失败',
};

// Interrupt handoff
zh.interruptHandoff = {
  title: '中断交接',
  description: '代理请求中断。',
  accept: '接受',
  reject: '拒绝',
  reason: '原因',
  details: '详情',
  loading: '加载中...',
  error: '操作失败',
};

// Document annotation
zh.documentAnnotation = {
  title: '文档注释',
  addAnnotation: '添加注释',
  editAnnotation: '编辑注释',
  deleteAnnotation: '删除注释',
  noAnnotations: '暂无注释',
  save: '保存',
  cancel: '取消',
  placeholder: '输入注释...',
};

// Document diff modal
zh.documentDiff = {
  title: '文档差异',
  loading: '加载中...',
  error: '加载失败',
  noChanges: '无更改',
  accept: '接受',
  reject: '拒绝',
  merge: '合并',
  close: '关闭',
};

// Instance sidebar
zh.instanceSidebar = {
  title: '实例',
  general: '通用',
  settings: '设置',
  experimental: '实验性',
  plugins: '插件',
  adapters: '适配器',
  secrets: '密钥',
  environments: '环境',
  access: '访问',
  export: '导出',
  import: '导入',
  skills: '技能',
};

// Sidebar company menu
zh.sidebarCompanyMenu = {
  switchCompany: '切换公司',
  createCompany: '创建公司',
  settings: '设置',
  members: '成员',
  invite: '邀请',
  logout: '退出',
};

// Source resolved fold callout
zh.sourceResolvedFold = {
  title: '来源已解析',
  description: '来源已成功解析。',
  view: '查看',
  dismiss: '关闭',
};

// Status icon
zh.statusIcon = {
  running: '运行中',
  completed: '已完成',
  failed: '失败',
  cancelled: '已取消',
  pending: '待处理',
  paused: '已暂停',
};

// Trust preset section
zh.trustPreset = {
  title: '信任预设',
  description: '管理信任预设。',
  low: '低',
  medium: '中',
  high: '高',
  custom: '自定义',
  save: '保存',
  cancel: '取消',
};

// Output feedback buttons
zh.outputFeedback = {
  helpful: '有帮助',
  notHelpful: '无帮助',
  feedback: '反馈',
  thankYou: '谢谢您的反馈',
  addComment: '添加评论',
  placeholder: '告诉我们如何改进...',
  submit: '提交',
  cancel: '取消',
};

// Priority icon
zh.priorityIcon = {
  critical: '紧急',
  high: '高',
  medium: '中',
  low: '低',
  none: '无',
};

// Productivity review badge
zh.productivityReview = {
  title: '生产力审查',
  good: '良好',
  average: '一般',
  poor: '较差',
  noData: '无数据',
};

// Provider quota card
zh.providerQuota = {
  title: '提供商配额',
  usage: '使用量',
  limit: '限额',
  remaining: '剩余',
  exceeded: '已超支',
  loading: '加载中...',
  error: '加载失败',
};

// Project workspace summary
zh.projectWorkspaceSummary = {
  title: '项目工作区摘要',
  workspaces: '工作区',
  active: '活跃',
  inactive: '不活跃',
  loading: '加载中...',
  error: '加载失败',
};

// Membership action
zh.membershipAction = {
  join: '加入',
  leave: '离开',
  invite: '邀请',
  remove: '移除',
  approve: '批准',
  reject: '拒绝',
  pending: '待处理',
  member: '成员',
  admin: '管理员',
  owner: '所有者',
};

// Execution workspace detail
zh.executionWorkspaceDetail = {
  title: '执行工作区详情',
  loading: '加载中...',
  error: '加载失败',
  status: '状态',
  branch: '分支',
  commit: '提交',
  files: '文件',
  logs: '日志',
  environment: '环境',
  variables: '变量',
  start: '启动',
  stop: '停止',
  restart: '重启',
  delete: '删除',
  viewFiles: '查看文件',
  viewLogs: '查看日志',
};

// Project workspace detail
zh.projectWorkspaceDetail = {
  title: '项目工作区详情',
  loading: '加载中...',
  error: '加载失败',
  workspaces: '工作区',
  create: '创建工作区',
  delete: '删除',
  configure: '配置',
  status: '状态',
  branch: '分支',
  path: '路径',
};

// Company settings plugin page
zh.companySettingsPlugin = {
  title: '插件设置',
  loading: '加载中...',
  error: '加载失败',
  configure: '配置',
  enable: '启用',
  disable: '禁用',
  uninstall: '卸载',
  settings: '设置',
  details: '详情',
  permissions: '权限',
  health: '健康状态',
};

// Instance access
zh.instanceAccess = {
  title: '实例访问',
  loading: '加载中...',
  error: '加载失败',
  users: '用户',
  roles: '角色',
  permissions: '权限',
  add: '添加',
  remove: '移除',
  edit: '编辑',
  save: '保存',
  cancel: '取消',
};

// Cloud upstream UX lab
zh.cloudUpstreamUxLab = {
  title: '云端上游 UX 实验室',
  description: '实验性云端上游功能。',
  loading: '加载中...',
  error: '加载失败',
};

// Plugin page
zh.pluginPage = {
  title: '插件',
  loading: '加载中...',
  error: '加载失败',
  install: '安装',
  uninstall: '卸载',
  configure: '配置',
  enable: '启用',
  disable: '禁用',
  settings: '设置',
  details: '详情',
  permissions: '权限',
  health: '健康状态',
};

// Design guide
zh.designGuide = {
  title: '设计指南',
  description: '组件设计指南。',
  colors: '颜色',
  typography: '排版',
  spacing: '间距',
  components: '组件',
  icons: '图标',
  loading: '加载中...',
};

// Routine sections
zh.routineSections = {
  editable: {
    title: '可编辑部分',
    add: '添加',
    remove: '移除',
    reorder: '重新排序',
    save: '保存',
    cancel: '取消',
  },
  operate: {
    title: '操作部分',
    run: '运行',
    pause: '暂停',
    resume: '恢复',
    stop: '停止',
    restart: '重启',
  },
};

// Toast viewport
zh.toastViewport = {
  dismiss: '关闭',
  retry: '重试',
  undo: '撤销',
};

// Scroll to bottom
zh.scrollToBottom = {
  scrollToBottom: '滚动到底部',
  newMessages: '新消息',
};

// Resizable sidebar pane
zh.resizableSidebar = {
  resize: '调整大小',
  collapse: '折叠',
  expand: '展开',
};

// Route error boundary
zh.routeError = {
  title: '页面出错',
  description: '加载页面时出错。',
  retry: '重试',
  goHome: '返回首页',
  details: '详情',
};

// Json schema form
zh.jsonSchemaForm = {
  required: '必填',
  optional: '可选',
  add: '添加',
  remove: '移除',
  save: '保存',
  cancel: '取消',
  error: '验证失败',
  loading: '加载中...',
};

// Markdown editor
zh.markdownEditor = {
  placeholder: '输入 Markdown...',
  preview: '预览',
  edit: '编辑',
  bold: '粗体',
  italic: '斜体',
  link: '链接',
  image: '图片',
  code: '代码',
  list: '列表',
  heading: '标题',
  quote: '引用',
  save: '保存',
  cancel: '取消',
};

// Markdown body
zh.markdownBody = {
  loading: '加载中...',
  error: '加载失败',
  retry: '重试',
  copy: '复制',
  copied: '已复制',
};

// Inline entity selector
zh.inlineEntitySelector = {
  placeholder: '选择...',
  noResults: '未找到结果',
  search: '搜索',
  loading: '加载中...',
  error: '加载失败',
};

// Agent bubble action row
zh.agentBubbleActionRow = {
  retry: '重试',
  edit: '编辑',
  delete: '删除',
  copy: '复制',
  share: '分享',
  more: '更多',
  viewRun: '查看运行',
  viewOutput: '查看输出',
};

// Blocked inbox view
zh.blockedInboxView = {
  title: '已阻止',
  description: '此收件箱视图已被阻止。',
  reason: '原因',
  details: '详情',
  unblock: '解除阻止',
  loading: '加载中...',
  error: '操作失败',
};

// Instance sidebar
zh.instanceSidebar = {
  title: '实例设置',
  general: '通用',
  experimental: '实验性',
  plugins: '插件',
  adapters: '适配器',
  secrets: '密钥',
  access: '访问',
  export: '导出',
  import: '导入',
  skills: '技能',
  environments: '环境',
};

// Plugins slots
zh.pluginSlots = {
  title: '插件插槽',
  loading: '加载中...',
  error: '加载失败',
  noPlugins: '暂无插件',
};

// Plugins launchers
zh.pluginLaunchers = {
  title: '插件启动器',
  launch: '启动',
  configure: '配置',
  noLaunchers: '暂无启动器',
};

// Company settings sidebar access
zh.companySettingsNav = {
  general: '通用',
  members: '成员',
  roles: '角色',
  access: '访问',
  environments: '环境',
  invites: '邀请',
  export: '导出',
  import: '导入',
  skills: '技能',
  plugins: '插件',
  settings: '设置',
};

// Mode badge
zh.modeBadge = {
  admin: '管理员',
  member: '成员',
  viewer: '查看者',
  guest: '访客',
  owner: '所有者',
};

// Agent capsule test
zh.agentCapsule = {
  viewDetails: '查看详情',
  running: '运行中',
  paused: '已暂停',
  stopped: '已停止',
  error: '错误',
};

// Document annotation panel
zh.documentAnnotationPanel = {
  title: '注释',
  add: '添加注释',
  edit: '编辑',
  delete: '删除',
  noAnnotations: '暂无注释',
  save: '保存',
  cancel: '取消',
  placeholder: '输入注释...',
};

// Issue thread interaction card classic
zh.issueThreadInteractionClassic = {
  title: '交互',
  plan: '计划',
  proposedBy: '提议者',
  created: '已创建',
  resolved: '已解决',
  viewDetails: '查看详情',
};

// Issue output video player
zh.issueOutputVideo = {
  title: '视频',
  play: '播放',
  pause: '暂停',
  mute: '静音',
  unmute: '取消静音',
  fullscreen: '全屏',
  download: '下载',
  loading: '加载中...',
  error: '加载失败',
};

// Label agent mention token
zh.labelAgentMention = {
  title: '提及代理',
  placeholder: '输入代理名称...',
  noResults: '未找到代理',
  select: '选择',
  cancel: '取消',
};

// Match source chip
zh.matchSourceChip = {
  title: '来源',
  view: '查看',
  dismiss: '关闭',
};

fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
console.log('Chinese translations updated for batch 10.');

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
