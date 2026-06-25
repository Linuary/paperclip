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

zhCN.inbox = syncStructure(zhCN.inbox || {}, en.inbox);
zhCN.activity = syncStructure(zhCN.activity || {}, en.activity);
zhCN.search = syncStructure(zhCN.search || {}, en.search);
zhCN.costs = syncStructure(zhCN.costs || {}, en.costs);

// Inbox Chinese translations
if (zhCN.inbox) {
  const i = zhCN.inbox;
  i.title = "收件箱";
  i.selectCompany = "选择一家公司以查看收件箱。";
  i.noItems = "收件箱为空。";
  i.markAllAsRead = "全部标为已读";
  i.markAllAsReadConfirm = "确定要将所有项目标为已读吗？";
  i.markAllAsReadDescription = "这将把收件箱中的所有项目标为已读。";
  i.marking = "标记中...";
  i.approve = "批准";
  i.reject = "拒绝";
  i.approving = "批准中...";
  i.rejecting = "拒绝中...";
  i.retry = "重试";
  i.retrying = "重试中...";
  i.markAsRead = "标为已读";
  i.dismiss = "关闭";
  i.dismissFromInbox = "从收件箱中关闭";
  i.failedRun = "失败的运行";
  i.agentJoinRequest = "智能体加入请求";
  i.humanJoinRequest = "用户加入请求";
  i.requestedBy = "请求者：";
  i.updated = "已更新";
  i.adapter = "适配器：";
  i.fromIP = "来自 IP";
  i.noFailedRuns = "暂无失败的运行。";
  i.noApprovals = "暂无待审批。";
  i.noJoinRequests = "暂无加入请求。";
  i.noAlerts = "暂无警报。";
  i.alerts = "警报";
  i.agentError = "智能体错误";
  i.budgetAlert = "预算警报";
  i.archived = "已归档";
  i.otherResults = "其他结果";
  i.earlier = "更早";
  i.subTaskCount = "{{count}} 个子任务";
  i.newTaskInGroup = "在组中新建任务";
  i.selectAll = "全选";
  i.deselectAll = "取消全选";
  i.selectedCount = "已选 {{count}} 项";
  i.searchPlaceholder = "搜索收件箱...";
  i.filterByCategory = "按类别筛选";
  i.filterByStatus = "按状态筛选";
  i.groupBy = "分组";
  i.sortBy = "排序";
  i.nestingToggle = "嵌套切换";
  i.tabs = {
    all: "全部",
    failedRuns: "失败的运行",
    approvals: "审批",
    joinRequests: "加入请求",
    alerts: "警报"
  };
  i.groupOptions = {
    status: "状态",
    priority: "优先级",
    assignee: "分配人",
    project: "项目",
    type: "类型",
    none: "无"
  };
  i.categoryFilters = {
    failedRuns: "失败的运行",
    approvals: "审批",
    joinRequests: "加入请求",
    alerts: "警报",
    tasks: "任务",
    all: "全部"
  };
  i.approvalFilters = {
    pending: "待处理",
    approved: "已批准",
    rejected: "已拒绝",
    all: "全部"
  };
  i.emptyStates = {
    noFailedRuns: "暂无失败的运行。",
    noApprovals: "暂无待审批。",
    noJoinRequests: "暂无加入请求。",
    noAlerts: "暂无警报。",
    noItems: "收件箱为空。"
  };
  i.markAsReadSuccess = "已标为已读";
  i.markAsReadFailed = "标为已读失败";
  i.approveSuccess = "已批准";
  i.approveFailed = "批准失败";
  i.rejectSuccess = "已拒绝";
  i.rejectFailed = "拒绝失败";
  i.retrySuccess = "重试已启动";
  i.retryFailed = "重试失败";
  i.dismissSuccess = "已关闭";
  i.dismissFailed = "关闭失败";
}

// Activity Chinese translations
if (zhCN.activity) {
  const a = zhCN.activity;
  a.title = "活动";
  a.selectCompany = "选择一家公司以查看活动。";
  a.noActivity = "暂无活动。";
  a.filterPlaceholder = "筛选活动...";
  a.allTypes = "所有类型";
  a.showAllActivity = "显示所有活动";
  a.earlier = "更早";
  a.otherActivity = "其他活动";
  a.agentFeed = "智能体动态";
  a.liveActivitySubtitle = "来自您的智能体的实时活动";
  a.system = "系统";
  a.board = "面板";
  a.unknown = "未知";
  a.madeUpdates = "进行了 {{count}} 次更新";
  a.filterOptions = {
    all: "全部",
    inProgress: "进行中",
    inReview: "审核中",
    done: "已完成"
  };
  a.emptyStates = {
    noActivity: "暂无活动。",
    noMatchingActivity: "没有匹配的活动。",
    loadingActivity: "加载活动中..."
  };
  a.groupToggle = "切换分组";
  a.filterButton = "筛选";
}

// Search Chinese translations
if (zhCN.search) {
  const s = zhCN.search;
  s.title = "搜索";
  s.placeholder = "搜索任务、项目、智能体...";
  s.searching = "搜索中...";
  s.noResults = "暂无结果。";
  s.noResultsFor = "没有找到 \"{{query}}\" 的结果。";
  s.tryDifferent = "尝试不同的搜索词。";
  s.resultsCount = "{{count}} 条结果";
  s.relevance = "相关性";
  s.updating = "更新中...";
  s.recentSearches = "最近搜索";
  s.tips = "搜索提示";
  s.tip1 = "使用引号进行精确匹配";
  s.tip2 = "使用 status:open 等筛选器";
  s.tip3 = "搜索任务、项目和智能体";
  s.initialTitle = "搜索 Paperclip";
  s.initialDescription = "搜索任务、项目、智能体等。";
  s.errorTitle = "搜索出错";
  s.errorMessage = "搜索过程中出现问题。";
  s.retry = "重试";
  s.filterView = "筛选视图";
  s.scopeSuggestions = "搜索范围建议";
  s.scopeLabels = {
    tasks: "任务",
    projects: "项目",
    agents: "智能体",
    goals: "目标",
    routines: "例程",
    all: "全部"
  };
  s.subgroupLabels = {
    tasks: "任务",
    projects: "项目",
    agents: "智能体",
    goals: "目标",
    routines: "例程",
    comments: "评论",
    documents: "文档"
  };
}

// Costs Chinese translations
if (zhCN.costs) {
  const c = zhCN.costs;
  c.title = "成本";
  c.selectCompany = "选择一家公司以查看成本。";
  c.noCostData = "暂无成本数据。";
  c.description = "查看和管理您的 AI 支出。";
  c.dateRange = "日期范围";
  c.to = "至";
  c.selectDateRange = "选择开始和结束日期";
  c.inferenceSpend = "推理支出";
  c.budget = "预算";
  c.financeNet = "财务净额";
  c.financeEvents = "财务事件";
  c.tabs = {
    overview: "概览",
    inference: "推理",
    budget: "预算",
    finance: "财务",
    providers: "提供商"
  };
  c.inferenceCard = {
    title: "推理支出",
    description: "AI 模型推理成本。",
    budgetAmount: "预算金额",
    unlimitedBudget: "无限预算",
    usageLabel: "使用量",
    utilizationText: "利用率 {{percent}}%"
  };
  c.byAgent = {
    title: "按智能体",
    description: "按智能体分列的推理成本。",
    noData: "暂无智能体成本数据。",
    inputTokens: "输入 token",
    outputTokens: "输出 token",
    apiCalls: "API 调用",
    subscriptionCount: "订阅数"
  };
  c.byProject = {
    title: "按项目",
    description: "按项目分列的推理成本。",
    noData: "暂无项目成本数据。",
    unattributed: "未归属"
  };
  c.budgetControl = {
    title: "预算控制",
    description: "管理预算策略和限额。",
    monthlyBudget: "月度预算",
    spent: "已支出",
    remaining: "剩余",
    utilization: "利用率"
  };
  c.activeIncidents = {
    title: "活跃事件",
    noIncidents: "暂无活跃事件。"
  };
  c.scopeBudgets = {
    company: "公司预算",
    agent: "智能体预算",
    project: "项目预算",
    companyDesc: "公司级别的预算策略。",
    agentDesc: "智能体级别的预算策略。",
    projectDesc: "项目级别的预算策略。",
    noBudgets: "暂无预算策略。"
  };
  c.finance = {
    title: "财务",
    noEvents: "暂无财务事件。",
    byBiller: "按计费方",
    allProviders: "所有提供商",
    allBillers: "所有计费方",
    noBillableEvents: "暂无可计费事件。"
  };
  c.allProviders = "所有提供商";
  c.allBillers = "所有计费方";
  c.noCostEvents = "暂无成本事件。";
  c.timeline = {
    emptyMessage: "暂无财务时间线数据。"
  };
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
