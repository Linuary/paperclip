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

zhCN.companySettings = syncStructure(zhCN.companySettings || {}, en.companySettings);
zhCN.instanceSettings = syncStructure(zhCN.instanceSettings || {}, en.instanceSettings);
zhCN.skills = syncStructure(zhCN.skills || {}, en.skills);

// CompanySettings Chinese translations
if (zhCN.companySettings) {
  const cs = zhCN.companySettings;
  cs.title = "公司设置";
  cs.selectCompany = "选择一家公司以查看设置。";
  cs.general = {
    title: "通用",
    description: "管理公司的基本设置。",
    companyName: "公司名称",
    companyNamePlaceholder: "输入公司名称",
    companyDescription: "公司描述",
    companyDescriptionPlaceholder: "输入公司描述",
    mission: "使命",
    missionPlaceholder: "描述公司的使命...",
    save: "保存",
    saving: "保存中...",
    saved: "已保存",
    saveFailed: "保存失败"
  };
  cs.members = {
    title: "成员",
    description: "管理公司成员和权限。",
    noMembers: "暂无成员。",
    inviteMember: "邀请成员",
    role: "角色",
    admin: "管理员",
    member: "成员",
    viewer: "查看者",
    remove: "移除",
    removeConfirm: "确定要移除此成员吗？",
    removed: "成员已移除",
    removeFailed: "移除成员失败"
  };
  cs.invites = {
    title: "邀请",
    description: "管理公司邀请。",
    noInvites: "暂无邀请。",
    createInvite: "创建邀请",
    inviteLink: "邀请链接",
    copyLink: "复制链接",
    linkCopied: "链接已复制",
    revoke: "撤销",
    revokeConfirm: "确定要撤销此邀请吗？",
    revoked: "邀请已撤销",
    revokeFailed: "撤销邀请失败",
    expiresAt: "过期时间",
    uses: "使用次数",
    unlimited: "无限"
  };
  cs.secrets = {
    title: "密钥",
    description: "管理公司密钥。",
    noSecrets: "暂无密钥。",
    addSecret: "添加密钥",
    secretName: "密钥名称",
    secretValue: "密钥值",
    save: "保存",
    delete: "删除",
    deleteConfirm: "确定要删除此密钥吗？",
    saved: "密钥已保存",
    saveFailed: "保存密钥失败",
    deleted: "密钥已删除",
    deleteFailed: "删除密钥失败"
  };
  cs.export = {
    title: "导出",
    description: "导出公司数据。",
    exportAll: "导出全部",
    exportSelected: "导出所选",
    exporting: "导出中...",
    exported: "导出完成",
    exportFailed: "导出失败",
    noData: "暂无数据可导出。",
    fileCount: "{{count}} 个文件",
    download: "下载"
  };
  cs.import = {
    title: "导入",
    description: "导入公司数据。",
    selectFile: "选择文件",
    importing: "导入中...",
    imported: "导入完成",
    importFailed: "导入失败",
    preview: "预览",
    confirm: "确认导入",
    cancel: "取消",
    conflicts: "冲突",
    noConflicts: "无冲突。",
    overwrite: "覆盖",
    skip: "跳过",
    merge: "合并"
  };
  cs.access = {
    title: "访问控制",
    description: "管理公司访问控制。",
    noAccess: "暂无访问控制规则。",
    addRule: "添加规则",
    ruleType: "规则类型",
    allow: "允许",
    deny: "拒绝",
    save: "保存",
    delete: "删除",
    saved: "规则已保存",
    saveFailed: "保存规则失败",
    deleted: "规则已删除",
    deleteFailed: "删除规则失败"
  };
  cs.environments = {
    title: "环境",
    description: "管理公司环境。",
    noEnvironments: "暂无环境。",
    addEnvironment: "添加环境",
    environmentName: "环境名称",
    environmentType: "环境类型",
    local: "本地",
    cloud: "云端",
    save: "保存",
    delete: "删除",
    saved: "环境已保存",
    saveFailed: "保存环境失败",
    deleted: "环境已删除",
    deleteFailed: "删除环境失败"
  };
}

// InstanceSettings Chinese translations
if (zhCN.instanceSettings) {
  const is = zhCN.instanceSettings;
  is.title = "实例设置";
  is.description = "管理实例级别的设置。";
  is.general = {
    title: "通用",
    description: "管理实例的通用设置。",
    deploymentMode: "部署模式",
    authReady: "认证就绪",
    bootstrapStatus: "引导状态",
    bootstrapInvite: "引导邀请",
    censorUsername: "隐藏用户名",
    censorUsernameDesc: "在日志中隐藏用户名。",
    keyboardShortcuts: "键盘快捷键",
    keyboardShortcutsDesc: "启用或禁用键盘快捷键。",
    backupRetention: "备份保留",
    backupRetentionDesc: "配置备份保留策略。",
    daily: "每日",
    weekly: "每周",
    monthly: "每月",
    dayCount: "天数",
    weekCount: "周数",
    monthCount: "月数",
    feedbackSharing: "反馈分享",
    feedbackSharingDesc: "分享使用反馈以帮助改进产品。",
    signOut: "退出登录",
    signOutDesc: "退出当前会话。",
    signingOut: "正在退出...",
    signedOut: "已退出"
  };
  is.heartbeats = {
    title: "心跳",
    description: "管理智能体心跳设置。",
    active: "活跃",
    disabled: "禁用",
    company: "公司",
    companies: "公司",
    disableAll: "禁用全部",
    disableAllConfirm: "确定要禁用所有心跳吗？",
    disableAllDesc: "这将停止所有智能体的自动心跳。",
    enable: "启用",
    disable: "禁用",
    enabled: "已启用",
    disabled: "已禁用",
    on: "开",
    off: "关",
    never: "从不",
    timerHeartbeat: "定时心跳",
    enableTimer: "启用定时心跳",
    disableTimer: "禁用定时心跳"
  };
  is.experimental = {
    title: "实验性",
    description: "实验性功能可能不稳定，请谨慎使用。",
    warning: "警告",
    warningDesc: "这些功能可能随时更改或移除。",
    enableStreamlinedNavigation: "启用精简导航",
    enableStreamlinedNavigationDesc: "使用精简的侧边栏导航结构。",
    enableConferenceRoomChat: "启用会议室聊天",
    enableConferenceRoomChatDesc: "启用会议室聊天功能。",
    enableCloudSync: "启用云同步",
    enableCloudSyncDesc: "启用云端数据同步。",
    enableIsolatedWorkspaces: "启用隔离工作区",
    enableIsolatedWorkspacesDesc: "为智能体提供隔离的工作区。",
    recoveryPreview: "恢复预览",
    recoveryPreviewDesc: "预览恢复操作的结果。",
    lookbackHours: "回看小时数",
    lookbackHoursDesc: "设置恢复操作的回看时间范围。",
    hours: "小时",
    save: "保存",
    saving: "保存中...",
    saved: "已保存",
    saveFailed: "保存失败"
  };
  is.profile = {
    title: "个人资料",
    description: "管理您的个人资料设置。",
    displayName: "显示名称",
    displayNamePlaceholder: "输入显示名称",
    email: "邮箱",
    emailDesc: "邮箱由您的认证会话管理，此处只读。",
    avatar: "头像",
    uploadAvatar: "上传头像",
    changePhoto: "更改照片",
    remove: "移除",
    uploading: "上传中...",
    uploadFailed: "上传头像失败",
    save: "保存",
    saving: "保存中...",
    saved: "已保存",
    saveFailed: "保存失败",
    language: "语言",
    languageDesc: "选择您偏好的显示语言。"
  };
}

// Skills Chinese translations
if (zhCN.skills) {
  const sk = zhCN.skills;
  sk.title = "技能";
  sk.selectCompany = "选择一家公司以查看技能。";
  sk.noSkills = "暂无技能。";
  sk.addSkill = "添加技能";
  sk.importSkill = "导入技能";
  sk.createSkill = "创建技能";
  sk.forkSkill = "复刻技能";
  sk.removeSkill = "移除技能";
  sk.removeConfirm = "确定要移除此技能吗？";
  sk.removed = "技能已移除";
  sk.removeFailed = "移除技能失败";
  sk.searchPlaceholder = "搜索技能...";
  sk.noResults = "没有匹配的技能。";
  sk.loading = "加载中...";
  sk.error = "加载技能失败。";
  sk.retry = "重试";
  sk.details = "详情";
  sk.version = "版本";
  sk.author = "作者";
  sk.description = "描述";
  sk.installed = "已安装";
  sk.notInstalled = "未安装";
  sk.install = "安装";
  sk.uninstall = "卸载";
  sk.installing = "安装中...";
  sk.uninstalling = "卸载中...";
  sk.installedSuccess = "技能已安装";
  sk.installFailed = "安装技能失败";
  sk.uninstalledSuccess = "技能已卸载";
  sk.uninstallFailed = "卸载技能失败";
  sk.sharing = "共享";
  sk.sharingDesc = "管理技能的共享设置。",
  sk.public = "公开";
  sk.private = "私有";
  sk.companyOnly = "仅公司";
  sk.save = "保存";
  sk.saving = "保存中...";
  sk.saved = "已保存";
  sk.saveFailed = "保存失败";
  sk.dangerZone = "危险区域";
  sk.dangerZoneDesc = "这些操作不可逆，请谨慎使用。";
  sk.delete = "删除";
  sk.deleteConfirm = "确定要删除此技能吗？";
  sk.deleted = "技能已删除";
  sk.deleteFailed = "删除技能失败";
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
