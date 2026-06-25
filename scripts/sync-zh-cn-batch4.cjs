const fs = require('fs');
const en = JSON.parse(fs.readFileSync('ui/src/i18n/locales/en.json', 'utf8'));
const zhCN = JSON.parse(fs.readFileSync('ui/src/i18n/locales/zh-CN.json', 'utf8'));

// Helper: sync structure, keep Chinese translations, fill missing with English
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

// Sync all sections
zhCN.project = syncStructure(zhCN.project || {}, en.project);
zhCN.goal = syncStructure(zhCN.goal || {}, en.goal);
zhCN.workspace = syncStructure(zhCN.workspace || {}, en.workspace);

// Now overwrite with Chinese translations for project section
if (zhCN.project) {
  const p = zhCN.project;
  p.title = "项目";
  p.selectCompany = "选择一家公司以查看项目。";
  p.noProjects = "暂无项目。";
  p.addProject = "添加项目";
  p.newProject = "新建项目";
  p.myProjects = "我的项目";
  p.otherProjects = "其他项目";
  p.projectCount_one = "{{count}} 个项目";
  p.projectCount_other = "{{count}} 个项目";
  p.taskCount_one = "{{count}} 个任务";
  p.taskCount_other = "{{count}} 个任务";
  p.searchProjects = "搜索项目...";
  p.noMatch = "没有匹配的项目。";
  p.showProperties = "显示属性";
  p.addDescription = "添加描述...";
  p.leftProject = "您已离开此项目。";
  p.dismiss = "关闭";
  p.pausedByBudget = "因预算暂停";
  p.managedBy = "由 {{name}} 管理";

  if (p.properties) {
    p.properties.name = "名称";
    p.properties.description = "描述";
    p.properties.status = "状态";
    p.properties.lead = "负责人";
    p.properties.goals = "目标";
    p.properties.env = "环境";
    p.properties.created = "创建时间";
    p.properties.updated = "更新时间";
    p.properties.targetDate = "目标日期";
    p.properties.noDescription = "暂无描述。";
    p.properties.allGoalsLinked = "所有目标已关联。";
    p.properties.envHint = "环境变量和密钥的作用域。";
  }

  if (p.status) {
    p.status.backlog = "待办";
    p.status.planned = "已计划";
    p.status.inProgress = "进行中";
    p.status.completed = "已完成";
    p.status.cancelled = "已取消";
  }

  if (p.tabs) {
    p.tabs.tasks = "任务";
    p.tabs.overview = "概览";
    p.tabs.workspaces = "工作区";
    p.tabs.configuration = "配置";
    p.tabs.budget = "预算";
  }

  if (p.sort) {
    p.sort.name = "名称";
    p.sort.updated = "更新时间";
    p.sort.created = "创建时间";
    p.sort.targetDate = "目标日期";
    p.sort.asc = "升序";
    p.sort.desc = "降序";
  }

  if (p.codebase) {
    p.codebase.title = "代码库";
    p.codebase.help = "关联代码仓库以启用工作区和代码集成功能。";
    p.codebase.repo = "仓库 URL";
    p.codebase.localFolder = "本地文件夹";
    p.codebase.connect = "连接";
    p.codebase.disconnect = "断开";
  }

  if (p.archive) {
    p.archive.title = "归档";
    p.archive.description = "归档项目将从活跃列表中移除，但数据会保留。";
    p.archive.archive = "归档";
    p.archive.unarchive = "取消归档";
    p.archive.confirmArchive = "确定要归档此项目吗？";
    p.archive.confirmUnarchive = "确定要取消归档此项目吗？";
    p.archive.archived = "项目已归档";
    p.archive.unarchived = "项目已取消归档";
    p.archive.failedArchive = "归档失败";
    p.archive.failedUnarchive = "取消归档失败";
  }
}

// Overwrite with Chinese translations for goal section
if (zhCN.goal) {
  const g = zhCN.goal;
  g.title = "目标";
  g.selectCompany = "选择一家公司以查看目标。";
  g.noGoals = "暂无目标。";
  g.addGoal = "添加目标";
  g.newGoal = "新建目标";
  g.showProperties = "显示属性";
  g.addDescription = "添加描述...";
  g.subGoals = "子目标";
  g.subGoalsCount = "{{count}} 个子目标";
  g.projectsCount = "{{count}} 个项目";
  g.subGoal = "子目标";
  g.noSubGoals = "暂无子目标。";
  g.noLinkedProjects = "暂无关联项目。";

  if (g.properties) {
    g.properties.status = "状态";
    g.properties.level = "级别";
    g.properties.owner = "负责人";
    g.properties.parentGoal = "父目标";
    g.properties.created = "创建时间";
    g.properties.updated = "更新时间";
  }
}

// Overwrite with Chinese translations for workspace section
if (zhCN.workspace) {
  const w = zhCN.workspace;
  w.title = "工作区";
  w.noActivity = "暂无活动。";
  w.workspaceCount_one = "{{count}} 个工作区";
  w.workspaceCount_other = "{{count}} 个工作区";
}

fs.writeFileSync('ui/src/i18n/locales/zh-CN.json', JSON.stringify(zhCN, null, 2) + '\n');

// Verify
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

console.log('en.json keys:', countKeys(en));
console.log('zh-CN.json keys:', countKeys(zhCN));
var missing = findMissing(zhCN, en);
console.log('Missing in zh-CN:', missing.length);
if (missing.length > 0) {
  console.log('First 10:', missing.slice(0, 10));
} else {
  console.log('All keys are in sync!');
}

// Count translation progress
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

var progress = countEnglish(zhCN, en);
console.log('Translation progress:', progress.chinese + '/' + progress.total + ' (' + Math.round(progress.chinese / progress.total * 100) + '%)');
