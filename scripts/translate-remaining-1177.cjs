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

const translations = {
  // skills.* remaining
  'skills.allCategories': '所有分类',
  'skills.noSkillsYet': '暂无技能。创建一个或从目录安装。',
  'skills.noSkillsMatchFilters': '没有技能匹配您的过滤器。',
  'skills.noSkillsInTab': '此标签页中暂无技能。',
  'skills.createASkill': '创建技能',
  'skills.clearFilters': '清除过滤器',
  'skills.skillCount': '{{count}} 个技能',
  'skills.forked': '已分支',
  'skills.agentCount': '{{count}} {{unit}}',
  'skills.agent': '代理',
  'skills.agents': '代理',
  'skills.mostAgents': '最多代理',
  'skills.mostStars': '最多收藏',
  'skills.mostForks': '最多分支',
  'skills.recentlyUpdated': '最近更新',
  'skills.alphabetical': '按字母顺序',
  'skills.company': '公司',
  'skills.external': '外部',
  'skills.markdownOnly': '仅 Markdown',
  'skills.markdownOnlyTooltip': '纯文本 — 无脚本、无二进制文件、无资源。',
  'skills.includesAssets': '包含资源',
  'skills.includesAssetsTooltip': '包含图片、字体或其他非脚本文件。',
  'skills.includesScripts': '包含脚本',
  'skills.includesScriptsTooltip': '包含可执行脚本。安装前请检查。',
  'skills.unknownFormat': '未知格式',
  'skills.unknownFormatTooltip': 'Paperclip 无法验证此技能为代理技能 Markdown。安装风险自负。',
  'skills.invalidTooltip': '此技能无法安装 — 内容不是有效的代理技能 Markdown。',
  'skills.installedFromCatalog': '从应用附带的技能目录安装。来源由包版本和内容哈希签名。',
  'skills.forking': '正在分支 {{name}}',
  'skills.skillShortname': '技能短名称',
  'skills.oneLinePromise': '技能的单行承诺',
  'skills.newSkill': '新技能',
  'skills.noTaglineYet': '暂无标语。',
  'skills.color': '颜色',
  'skills.engineeringReviewMemory': '工程、审阅、记忆',
  'skills.slug': '标识符',
  'skills.none': '无',
  'skills.visibleInsideCompany': '在此公司内可见。',
  'skills.onlyVisibleInLibrary': '仅在您的库中可见。',
  'skills.publicLink': '公开链接',
  'skills.comingLater': '稍后推出。',
  'skills.creating': '创建中...',
  'skills.createFork': '创建分支',
  'skills.untitled': '未命名',
  'skills.basics': '基础',
  'skills.selectCatalogSkill': '选择一个目录技能进行检查。',
  'skills.noCatalogMatch': '没有目录技能匹配此过滤器。',
  'skills.openInLibrary': '在库中打开',
  'skills.preparing': '准备中...',
  'skills.installSkill': '安装技能',
  'skills.installSkillInOrg': '在此组织中安装技能',
  'skills.updateFromCatalog': '从目录更新',
  'skills.updateAvailable': '有可用更新',
  'skills.catalogHashChanged': '目录内容哈希自安装此技能以来已更改。',
  'skills.requires': '需要',
  'skills.copiedHash': '已复制哈希',
  'skills.copyContentHash': '复制内容哈希',
  'skills.selectFileToInspect': '选择一个文件进行检查。',
  'skills.failedToLoadFile': '加载文件失败',
  'skills.trust': '信任',
  'skills.reviewRequired': '需要审阅',
  'skills.nonScriptAssets': '非脚本资源',
  'skills.provenance': '来源',
  'skills.files': '文件',
  'skills.slugOverride': '标识符覆盖',
  'skills.forceReplace': '强制替换现有同键技能',
  'skills.existingSkillWarning': '已安装键为 <key>{{key}}</key> 的现有技能（{{source}}）。安装将{{action}}。',
  'skills.overwriteCatalogContent': '覆盖目录内容',
  'skills.replaceExistingSkill': '替换现有技能',
  'skills.versions': '版本',
  'skills.noOverviewYet': '暂无概述。',
  'skills.editable': '可编辑',
  'skills.readOnly': '只读',
  'skills.loadingVersions': '加载版本中...',
  'skills.versionCount': '{{count}} 个版本',
  'skills.compare': '比较',
  'skills.noSavedVersions': '暂无保存的版本。',
  'skills.viewDiff': '查看差异',
  'skills.noAgentsAttached': '暂无代理使用此技能。使用"添加到代理"来附加。',
  'skills.addToAgent': '添加到代理',
  'skills.noAgentsAttachedYet': '暂无附加的代理。',
  'skills.andMore': '还有 {{count}} 个',
  'skills.updates': '更新',
  'skills.pinnedSourceRevision': '固定的源修订版本',
  'skills.untracked': '未跟踪',
  'skills.checkForUpdates': '检查更新',
  'skills.installUpdate': '安装更新',
  'skills.upToDate': '已是最新。',
  'skills.installedFrom': '从 {{source}} 安装',
  'skills.viewAll': '查看全部',
  'skills.installs': '安装次数',
  'skills.installCount': '安装',
  'skills.agentsInstalledTooltip': '此公司中当前安装了此技能的代理。',
  'skills.starred': '已收藏',
  'skills.star': '收藏',
  'skills.unstarThisSkill': '取消收藏此技能',
  'skills.starThisSkill': '收藏此技能',
  'skills.fork': '分支',
  'skills.forkThisSkill': '分支此技能',
  'skills.stopEditing': '停止编辑',
  'skills.saveChanges': '保存更改',
  'skills.skillNotFound': '未找到技能。',
  'skills.noAgentsSupportSkills': '此公司中暂无代理支持技能。',
  'skills.noMatches': '无匹配项。',
  'skills.filterAgents': '过滤代理',
  'skills.latest': '最新',
  'skills.skillSettings': '技能设置',
  'skills.companyVisible': '公司 — 在此公司内可见',
  'skills.privateVisible': '私有 — 仅在您的库中可见',
  'skills.publicLinkComing': '公开链接共享稍后推出。',
  'skills.removeFromLibrary': '从公司库中移除此技能。',
  'skills.detachBeforeRemoving': '在移除此技能之前，请先将其从所有代理中分离。',
  'skills.removing': '移除中…',
  'skills.removeSkillDesc': '从公司库中移除此技能。如果仍有代理使用它，移除将被阻止，直到分离完成。',
  'skills.aboutToRemoveGeneric': '您即将移除此技能。',
  'skills.currentlyUsedBy': '当前被 {{agents}} 使用。',
  'skills.detachToEnable': '将此技能从所有代理中分离以启用移除。',
  'skills.addSkillSource': '添加技能源',
  'skills.addSkillSourceDesc': '请先在字段中粘贴本地路径、GitHub URL 或 `skills.sh` 命令。',
  'skills.browseSkillsSh': '浏览 skills.sh',
  'skills.findInstallCommands': '查找安装命令并粘贴到此处。',
  'skills.searchGitHub': '搜索 GitHub',
  'skills.lookForRepos': '查找包含 `SKILL.md` 的仓库，然后将仓库 URL 粘贴到此处。',
  'skills.forkSkillDesc': '检查分支元数据并创建可编辑的公司副本。',
  'skills.createNewSkillTitle': '创建新技能',
  'skills.createSkillDesc': '在 Paperclip 工作区中创建可编辑的公司技能。',
  'skills.importSkillDesc': '粘贴本地路径、GitHub URL 或 `skills.sh` 命令以将技能导入此公司。',
  'skills.pastePlaceholder': '粘贴路径、GitHub URL 或 skills.sh 命令',
  'skills.backToStore': '返回商店',
  'skills.catalogSkillNotFound': '未找到目录技能。',
  'skills.diffSkillFiles': '差异 · 技能文件',
  'skills.old': '旧',
  'skills.initial': '初始',
  'skills.selectVersionToCompare': '选择要比较的版本。',
  'skills.sameVersion': '两侧是相同版本。',
  'skills.selectSkillToInspect': '选择一个技能以检查其文件。',
  'skills.removeBlocked': '在移除此技能之前，请先将其从所有代理中分离。',
  'skills.stopEditingBtn': '停止编辑',
  'skills.tracking': '跟踪 {{ref}}',
  'skills.locallyModified': '本地已修改',
  'skills.locallyModifiedTooltip': '安装后您已编辑此技能。来自目录的更新将覆盖您的更改。',
  'skills.usedBy': '使用者',
  'skills.copiedPath': '已复制路径',
  'skills.copySourcePath': '复制源路径',
  'skills.noAgents': '无附加代理',

  // common.*
  'common.or': '或',
  'common.saving': '保存中...',
  'common.backToRuns': '返回运行',
  'common.cached': '已缓存',
  'common.cost': '成本',
  'common.revoke': '撤销',
  'common.terminate': '终止',
  'common.live': '实时',
  'common.task': '任务',
  'common.tasks': '任务',

  // issue.newDialog remaining
  'issue.newDialog.existingWorkspaceStatus': '{{name}} · {{status}} · {{branch}}',

  // project.*
  'project.saving': '保存中',
  'project.leadLabel': '负责人',
  'project.envLabel': '环境',
  'project.targetDateLabel': '目标日期',
  'project.projectName': '项目名称',
  'project.allGoalsLinked': '所有目标已链接。',
  'project.envHint': '应用于此项目中所有任务的运行。项目值在键冲突时覆盖代理环境。',
  'project.codebase': '代码库',
  'project.codebaseHelp': '仓库标识事实来源。本地文件夹是代理写入代码的默认位置。',
  'project.codebaseHelpAria': '代码库帮助',
  'project.repo': '仓库',
  'project.notSet': '未设置。',
  'project.setRepo': '设置仓库',
  'project.changeRepo': '更改仓库',
  'project.clearRepoAria': '清除仓库',
  'project.paperclipManagedFolder': 'Paperclip 托管文件夹。',
  'project.setLocalFolder': '设置本地文件夹',
  'project.changeLocalFolder': '更改本地文件夹',
  'project.clearLocalFolderAria': '清除本地文件夹',
  'project.noUrl': '无 URL',
  'project.additionalLegacyWorkspaces': '此项目存在额外的遗留工作区记录。Paperclip 使用主工作区作为代码库视图。',
  'project.failedToSaveWorkspace': '保存工作区失败。',
  'project.failedToDeleteWorkspace': '删除工作区失败。',
  'project.failedToUpdateWorkspace': '更新工作区失败。',
  'project.executionWorkspaces': '执行工作区',
  'project.executionWorkspacesHelp': '项目拥有的隔离任务检出和执行工作区行为的默认值。',
  'project.executionWorkspacesHelpAria': '执行工作区帮助',
  'project.enableIsolatedCheckouts': '启用隔离任务检出',
  'project.enableIsolatedCheckoutsHint': '允许任务在项目的主检出和隔离执行工作区之间选择。',
  'project.newTasksDefaultIsolated': '新任务默认使用隔离检出',
  'project.newTasksDefaultIsolatedHint': '如果禁用，新任务将保持在项目的主检出上，除非有人选择加入。',
  'project.showAdvancedCheckout': '显示高级检出设置',
  'project.hideAdvancedCheckout': '隐藏高级检出设置',
  'project.hostManagedImplementation': '主机托管实现：',
  'project.gitWorktree': 'Git 工作树',
  'project.noEnvironment': '无环境',
  'project.baseRef': '基础引用',
  'project.branchTemplate': '分支模板',
  'project.worktreeParentDir': '工作树父目录',
  'project.provisionCommand': '配置命令',
  'project.teardownCommand': '拆卸命令',
  'project.provisionTeardownHint': '配置在代理执行前在派生的工作树中运行。拆卸存储在此处以供未来的清理流程使用。',
};

let translatedCount = 0;
Object.entries(translations).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} keys`);

// Recalculate progress
const zhFlat2 = flatten(zhCN);
const totalKeys = Object.keys(enFlat).length;
const translated = Object.keys(zhFlat2).filter(k => {
  if (!(k in enFlat)) return false;
  const val = zhFlat2[k];
  const enVal = enFlat[k];
  return val !== enVal && typeof val === 'string';
}).length;
const remaining = Object.keys(zhFlat2).filter(k => k in enFlat && zhFlat2[k] === enFlat[k]).length;
console.log(`Progress: ${translated}/${totalKeys} (${Math.round(translated/totalKeys*100)}%)`);
console.log(`Remaining: ${remaining}`);
