const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
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

// instanceSettings.general
const ig = {
  'description': '配置实例范围的偏好设置，包括日志显示、键盘快捷键、备份保留和数据共享。',
  'loading': '加载通用设置中...', 'failedToLoad': '加载通用设置失败。',
  'failedToUpdate': '更新通用设置失败。', 'deploymentAndAuth': '部署和认证',
  'localTrustedMode': '本地信任模式针对本地操作员优化。浏览器请求作为本地上下文运行，无需登录。',
  'authenticatedPublic': '认证公共模式要求登录才能访问面板，适用于公共 URL。',
  'authenticatedPrivate': '认证私有模式要求登录，适用于 LAN、VPN 或其他私有网络部署。',
  'authReadiness': '认证就绪状态', 'notReady': '未就绪', 'bootstrapStatus': '引导状态',
  'setupRequired': '需要设置', 'bootstrapInvite': '引导邀请', 'none': '无',
  'censorUsername': '在日志中隐藏用户名', 'censorUsernameDesc': '隐藏主目录路径和类似的操作员可见日志输出中的用户名部分。独立的用户名提及在实时转录视图中尚未屏蔽。默认关闭。',
  'toggleCensorUsername': '切换用户名日志屏蔽', 'keyboardShortcuts': '键盘快捷键',
  'keyboardShortcutsDesc': '启用应用键盘快捷键，包括收件箱导航和全局快捷键（如创建任务或切换面板）。默认关闭。',
  'toggleKeyboardShortcuts': '切换键盘快捷键', 'logDisplay': '日志显示',
  'logDisplayDesc': '配置日志显示方式。', 'maxLogEntries': '最大日志条目数',
  'maxLogEntriesDesc': '设置显示的最大日志条目数。', 'logLevel': '日志级别',
  'logLevelDesc': '设置日志显示级别。', 'backupRetention': '备份保留',
  'backupRetentionDesc': '配置备份保留策略。', 'retentionDays': '保留天数',
  'retentionDaysDesc': '设置备份保留天数。', 'dataSharing': '数据共享',
  'dataSharingDesc': '配置数据共享设置。', 'shareUsageData': '共享使用数据',
  'shareUsageDataDesc': '匿名共享使用数据以帮助改进产品。', 'save': '保存',
  'saved': '已保存', 'saveFailed': '保存失败', 'cancel': '取消',
  'confirm': '确认', 'delete': '删除', 'edit': '编辑', 'create': '创建',
  'update': '更新', 'loading': '加载中...', 'error': '加载失败', 'retry': '重试',
  'enabled': '已启用', 'disabled': '已禁用', 'on': '开', 'off': '关',
  'true': '是', 'false': '否', 'yes': '是', 'no': '否',
};

for (const [k, v] of Object.entries(ig)) {
  s(zh, 'instanceSettings.general.' + k, v);
}

// instanceSettings.experimental
const ie = {
  'description': '这些功能可能不稳定，可能会发生变化。',
  'warning': '警告：启用这些功能可能导致数据丢失或系统不稳定。',
  'confirm': '确认启用', 'cancel': '取消', 'enable': '启用', 'disable': '禁用',
  'enabled': '已启用', 'disabled': '已禁用', 'save': '保存', 'saved': '已保存',
  'saveFailed': '保存失败', 'loading': '加载中...', 'error': '加载失败', 'retry': '重试',
  'featureFlags': '功能标志', 'featureFlagsDesc': '启用或禁用实验性功能。',
  'betaFeatures': '测试版功能', 'betaFeaturesDesc': '启用测试版功能。',
  'alphaFeatures': 'Alpha 功能', 'alphaFeaturesDesc': '启用 Alpha 功能（极度不稳定）。',
  'dangerZone': '危险区域', 'dangerZoneDesc': '这些操作可能导致数据丢失。',
  'resetToDefaults': '重置为默认', 'resetToDefaultsConfirm': '确定要重置所有实验性设置为默认值吗？',
  'resetToDefaultsSuccess': '已重置为默认值', 'resetToDefaultsFailed': '重置为默认值失败',
};

for (const [k, v] of Object.entries(ie)) {
  s(zh, 'instanceSettings.experimental.' + k, v);
}

// instanceSettings.profile
const ip = {
  'description': '管理您的个人资料设置。',
  'name': '名称', 'nameHint': '您的显示名称。',
  'email': '邮箱', 'emailHint': '您的邮箱地址。',
  'avatar': '头像', 'avatarHint': '上传头像图片。',
  'uploadAvatar': '上传头像', 'removeAvatar': '移除头像',
  'avatarUploadFailed': '头像上传失败', 'uploadingAvatar': '上传头像中...',
  'save': '保存', 'saved': '已保存', 'saveFailed': '保存失败',
  'loading': '加载中...', 'error': '加载失败', 'retry': '重试',
  'changePassword': '修改密码', 'currentPassword': '当前密码',
  'newPassword': '新密码', 'confirmPassword': '确认密码',
  'passwordChanged': '密码已修改', 'passwordMismatch': '密码不匹配',
  'passwordTooShort': '密码太短', 'passwordTooWeak': '密码太弱',
  'currentPasswordRequired': '需要当前密码', 'incorrectCurrentPassword': '当前密码错误',
  'deleteAccount': '删除账户', 'deleteAccountConfirm': '确定要删除您的账户吗？此操作无法撤销。',
  'deleteAccountWarning': '所有数据将被永久删除。',
  'deleteAccountInput': '输入您的用户名确认删除',
  'deleteAccountButton': '删除账户', 'deleteAccountFailed': '删除账户失败',
  'twoFactorAuth': '双因素认证', 'twoFactorAuthDesc': '启用双因素认证以增加安全性。',
  'enableTwoFactor': '启用双因素认证', 'disableTwoFactor': '禁用双因素认证',
  'twoFactorEnabled': '双因素认证已启用', 'twoFactorDisabled': '双因素认证已禁用',
  'scanQrCode': '使用认证器应用扫描二维码',
  'enterCode': '输入验证码', 'verify': '验证', 'verifying': '验证中...',
  'verificationFailed': '验证失败', 'backupCodes': '备份代码',
  'backupCodesDesc': '保存这些备份代码以便在无法访问认证器时使用。',
  'copyBackupCodes': '复制备份代码', 'downloadBackupCodes': '下载备份代码',
  'regenerateBackupCodes': '重新生成备份代码',
};

for (const [k, v] of Object.entries(ip)) {
  s(zh, 'instanceSettings.profile.' + k, v);
}

// instanceSettings.heartbeats
const ih = {
  'description': '监控系统健康状态和可用性。',
  'status': '状态', 'lastCheck': '最后检查', 'interval': '间隔',
  'enabled': '已启用', 'disabled': '已禁用', 'save': '保存', 'saved': '已保存',
  'saveFailed': '保存失败', 'loading': '加载中...', 'error': '加载失败', 'retry': '重试',
  'test': '测试', 'testing': '测试中...', 'testSuccess': '测试成功', 'testFailed': '测试失败',
  'healthy': '健康', 'unhealthy': '不健康', 'degraded': '降级',
  'uptime': '正常运行时间', 'downtime': '停机时间', 'responseTime': '响应时间',
  'lastHeartbeat': '最后心跳', 'nextHeartbeat': '下次心跳',
  'consecutiveFailures': '连续失败次数', 'totalChecks': '总检查次数',
  'successfulChecks': '成功检查次数', 'failedChecks': '失败检查次数',
  'averageResponseTime': '平均响应时间', 'maxResponseTime': '最大响应时间',
  'minResponseTime': '最小响应时间',
};

for (const [k, v] of Object.entries(ih)) {
  s(zh, 'instanceSettings.heartbeats.' + k, v);
}

fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
console.log('Applied instanceSettings translations.');
