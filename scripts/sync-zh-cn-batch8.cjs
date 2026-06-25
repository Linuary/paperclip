const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

// Adapter section translations
zh.adapter = {
  ...zh.adapter,
  external: '外部',
  builtin: '内置',
  installedFromLocalPath: '从本地路径安装',
  installedFromNpm: '从 npm 安装',
  overridesBuiltin: '覆盖内置',
  overriddenBy: '被 {{name}} 覆盖',
  hiddenFromMenus: '从菜单隐藏',
  modelsCount: '{{count}} 个模型',
  reinstallAdapterTooltip: '重新安装适配器（从 npm 拉取最新版本）',
  reloadAdapterTooltip: '重新加载适配器（热替换）',
  showInAgentMenus: '在代理菜单中显示',
  hideFromAgentMenus: '从代理菜单中隐藏',
  removeAdapterTooltip: '移除适配器',
  reinstallDialogTitle: '重新安装适配器',
  reinstallDialogDesc: '将从 npm 拉取 {{packageName}} 的最新版本并热替换运行中的适配器模块。现有代理将在下次运行时使用新版本。',
  package: '包名',
  current: '当前',
  latestOnNpm: 'npm 最新版',
  unknown: '未知',
  checking: '检查中...',
  unavailable: '不可用',
  alreadyLatest: '已是最新版本。',
  reinstalling: '重新安装中...',
  reinstall: '重新安装',
  breadcrumbAdapters: '适配器',
  breadcrumbSettings: '设置',
  breadcrumbInstanceSettings: '实例设置',
  installedToast: '适配器已安装',
  installedBody: '类型 "{{type}}" 注册成功。',
  installedBodyWithVersion: '类型 "{{type}}" 注册成功。(v{{version}})',
  installFailed: '安装失败',
  removedToast: '适配器已移除',
  removeFailed: '移除失败',
  toggleFailed: '切换失败',
  overrideToggleFailed: '覆盖切换失败',
  reloadedToast: '适配器已重新加载',
  reloadedBody: '类型 "{{type}}" 已重新加载。',
  reloadedBodyWithVersion: '类型 "{{type}}" 已重新加载。(v{{version}})',
  reloadFailed: '重新加载失败',
  reinstalledToast: '适配器已重新安装',
  reinstalledBody: '类型 "{{type}}" 已从 npm 更新。',
  reinstalledBodyWithVersion: '类型 "{{type}}" 已从 npm 更新。(v{{version}})',
  reinstallFailed: '重新安装失败',
  loadingAdapters: '加载适配器中...',
  alpha: '测试版',
  installAdapter: '安装适配器',
  installExternalTitle: '安装外部适配器',
  installExternalDesc: '从 npm 或本地路径添加适配器。适配器包必须导出 {{code}}。',
  npmPackage: 'npm 包',
  localPath: '本地路径',
  pathToAdapterPackage: '适配器包路径',
  localPathPlaceholder: '本地路径',
  localPathHint: '支持 Linux、WSL 和 Windows 路径。Windows 路径会自动转换。',
  packageName: '包名',
  packageNamePlaceholder: 'my-paperclip-adapter',
  versionOptional: '版本（可选）',
  latestPlaceholder: '最新版',
  installing: '安装中...',
  install: '安装',
  alphaNoticeTitle: '外部适配器为测试版。',
  alphaNoticeDesc: '适配器插件系统正在积极开发中。API 和存储格式可能会更改。使用电源图标可从代理菜单中隐藏适配器而不移除它们。',
  externalAdapters: '外部适配器',
  noExternalAdapters: '未安装外部适配器',
  noExternalAdaptersDesc: '安装适配器包以扩展模型支持。',
  pauseExternalOverride: '暂停外部覆盖',
  resumeExternalOverride: '恢复外部覆盖',
  overridePausedBadge: '覆盖已暂停',
  builtinAdapters: '内置适配器',
  noBuiltinAdapters: '未找到内置适配器。',
  removeDialogTitle: '移除适配器',
  removeDialogDesc: '确定要移除 {{type}} 适配器吗？它将被注销并从适配器存储中移除。',
  npmCleanup: 'npm 包将从磁盘清理。',
  cannotBeUndone: '此操作无法撤销。',
  removing: '移除中...',
  remove: '移除',
};

// Cloud section translations
zh.cloud = {
  ...zh.cloud,
  upstream: '云端上游',
  selectCompany: '选择一个公司以配置云端上游。',
  loadingExperimental: '加载实验设置中...',
  cloudSyncDisabled: '云端同步已禁用。在',
  instanceSettingsLink: '实例设置',
  cloudSyncDisabledSuffix: '中启用以显示上游连接和推送工具。',
  pushDescription: '将 {{companyName}} 推送到 Paperclip Cloud 堆栈。自动化将保持暂停直到激活。',
  openCloud: '打开云端',
  connectionApproved: '云端上游连接已批准。',
  failedToFinish: '完成连接失败。',
  noPendingConnection: '未找到待处理的云端上游连接。请重新开始连接。',
  notApproved: '云端上游连接未被批准：{{error}}',
  failedToStart: '启动连接失败。',
  pushCompleted: '推送运行完成。请在取消暂停自动化之前审查激活。',
  pushFailed: '推送运行失败。请审查运行事件并在纠正问题后重试。',
  failedToRunPush: '运行推送失败。',
  activationUpdated: '激活检查清单已更新。',
  failedToActivate: '激活导入的实体失败。',
  stepperConnect: '连接',
  stepperScan: '扫描',
  stepperPreview: '预览',
  stepperPush: '推送',
  stepperVerify: '验证',
  stepperActivate: '激活',
  activateAgentsDesc: '在取消暂停导入的代理之前确认云端密钥和适配器凭据。',
  activateRoutinesDesc: '在启用导入的例程之前审查计划和触发设置。',
  activateMonitorsDesc: '在目标堆栈经过冒烟测试后激活。',
  connectionSection: '连接',
  schema: '架构',
  maxChunk: '最大分块',
  token: '令牌',
  previewPush: '预览推送',
  cloudStackUrl: 'Paperclip Cloud 堆栈 URL',
  connect: '连接',
  previewSection: '预览',
  pushToCloud: '推送到云端',
  progressSection: '进度和完成',
  downloadReport: '下载报告',
  retry: '重试',
  rerun: '重新运行',
  runStatus: '运行 {{id}}',
  completed: '已完成',
  inProgress: '进行中',
  history: '历史记录',
  buildingManifest: '构建清单中...',
  buildingManifestElapsed: '构建清单中... {{elapsed}}秒。大型公司可能需要一分钟。',
  stillBuildingManifest: '仍在构建清单... {{elapsed}}秒。大型公司通常需要约60秒。',
  warnings: '警告',
  conflicts: '冲突',
  noConflicts: '未检测到目标冲突。',
  activationChecklist: '激活检查清单',
  importedPausedByDefault: '{{count}} 个导入的 {{plural}} 默认暂停。',
  activated: '已激活',
  activate: '激活',
  keepPaused: '保持暂停',
  zeroImported: '0 个导入',
  zeroImportedPlural: '本次运行中导入了 0 个 {{plural}}。',
  activatedCount: '{{count}} 个已激活',
  pausedCount: '{{count}} 个已暂停',
  failedToPreview: '预览推送失败。',
  payloadTooLarge: '本地公司太大无法作为单个请求预览。点击推送继续（推送步骤会分块上传），或查看文档了解分块预览选项。',
  agentsLabel: '代理',
  routinesLabel: '例程',
  monitorsLabel: '监控器',
  agentLabel: '代理',
  routineLabel: '例程',
  monitorLabel: '监控器',
  agentsPlural: '代理',
  routinesPlural: '例程',
  monitorsPlural: '监控器',
};

// Plugin section translations
zh.plugin = {
  ...zh.plugin,
  manager: {
    ...(zh.plugin?.manager || {}),
    title: '插件管理器',
    installPlugin: '安装插件',
    loading: '加载插件中...',
    failedToLoad: '加载插件失败。',
    alphaNoticeTitle: '插件为测试版。',
    alphaNoticeDesc: '插件运行时和 API 接口仍在变化。在此功能稳定之前可能会有破坏性更改。',
    availablePlugins: '可用插件',
    bundled: '捆绑',
    loadingBundled: '加载捆绑插件中...',
    failedToLoadBundled: '加载捆绑插件失败。',
    noBundled: '在此检出中未找到捆绑插件。',
    firstParty: '官方',
    example: '示例',
    notInstalled: '未安装',
    buildingPlugin: '构建插件中...',
    installedPlugins: '已安装插件',
    noInstalled: '未安装插件',
    noInstalledDesc: '安装插件以扩展功能。',
    noDescription: '未提供描述。',
    pluginError: '插件错误',
    viewFullError: '查看完整错误',
    enable: '启用',
    disable: '禁用',
    configure: '配置',
    openSettings: '打开设置',
    review: '审查',
    install: '安装插件',
    installing: '安装中...',
    uninstall: '卸载',
    uninstalling: '卸载中...',
    experimental: '实验性',
    installDescription: '输入要安装的插件的 npm 包名。',
    packageName: 'npm 包名',
    alphaWarning: '插件为测试版。',
    alphaDescription: '插件运行时和 API 接口仍在变化。在此功能稳定之前可能会有破坏性更改。',
    loadBundledError: '加载捆绑插件失败。',
    building: '构建插件中...',
    installHint: '安装插件以扩展功能。',
    uninstallTitle: '卸载插件',
    uninstallConfirm: '确定要卸载 {{name}} 吗？',
    uninstallWarning: '此操作无法撤销。',
    errorDetails: '错误详情',
    errorState: '{{name}} 进入错误状态。',
    whatErrored: '错误原因',
    noErrorSummary: '无错误摘要。',
    fullErrorOutput: '完整错误输出',
    noStoredError: '无存储的错误消息。',
    defaultErrorMessage: '插件进入错误状态但没有存储的错误消息。',
  },
  messages: {
    ...(zh.plugin?.messages || {}),
    installSuccess: '插件安装成功',
    installError: '安装插件失败',
    uninstallSuccess: '插件已卸载',
    uninstallError: '卸载插件失败',
    enableSuccess: '插件已启用',
    enableError: '启用插件失败',
    disableSuccess: '插件已禁用',
    disableError: '禁用插件失败',
  },
};

// Also translate common.enable, common.disable, common.install, common.uninstall if not set
zh.common = zh.common || {};
if (!zh.common.enable || zh.common.enable === 'Enable') zh.common.enable = '启用';
if (!zh.common.disable || zh.common.disable === 'Disable') zh.common.disable = '禁用';
if (!zh.common.install || zh.common.install === 'Install') zh.common.install = '安装';
if (!zh.common.uninstall || zh.common.uninstall === 'Uninstall') zh.common.uninstall = '卸载';

fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
console.log('Chinese translations updated for adapter, cloud, plugin sections.');

// Count translated keys
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

const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const totalKeys = countTranslated(en, en); // just count total
const translated = countTranslated(en, zh);
console.log(`Translation progress: ${translated}/${totalKeys} (${Math.round(translated/totalKeys*100)}%)`);

function countKeys(obj) {
  let c = 0;
  for (const [, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) c += countKeys(v);
    else c++;
  }
  return c;
}
console.log('Total keys:', countKeys(en));
