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

// companySettings - flat keys
const cs = {
  'general': '通用', 'appearance': '外观', 'hiring': '招聘',
  'companyPackages': '公司套餐', 'dangerZone': '危险区域',
  'title': '公司设置', 'companyName': '公司名称',
  'companyNameHint': '公司的显示名称。',
  'descriptionLabel': '描述', 'descriptionHint': '公司资料中显示的可选描述。',
  'descriptionPlaceholder': '可选的公司描述', 'logo': 'Logo',
  'logoHint': '上传 PNG、JPEG、WEBP、GIF 或 SVG logo 图片。',
  'removingLogo': '移除中...', 'removeLogo': '移除 logo',
  'logoUploadFailed': 'Logo 上传失败', 'uploadingLogo': '上传 logo...',
  'brandColor': '品牌色', 'brandColorHint': '设置公司图标色调。留空自动生成颜色。',
  'brandColorPlaceholder': '自动', 'clearBrandColor': '清除',
  'attachmentSizeLimit': '附件大小限制', 'attachmentSizeHint': '接受范围：1-{{max}} MiB。',
  'mib': 'MiB', 'attachmentSizeSaved': '附件大小限制已保存',
  'attachmentSizeFailed': '保存附件大小限制失败',
  'appearanceTitle': '外观设置', 'appearanceDescription': '自定义公司外观。',
  'hiringTitle': '招聘设置', 'hiringDescription': '管理招聘相关设置。',
  'companyPackagesTitle': '公司套餐', 'companyPackagesDescription': '管理公司套餐。',
  'dangerZoneTitle': '危险区域', 'dangerZoneDescription': '这些操作不可逆。',
  'deleteCompany': '删除公司', 'deleteCompanyConfirm': '确定要删除此公司吗？此操作无法撤销。',
  'deleteCompanyWarning': '所有数据将被永久删除。',
  'deleteCompanyInput': '输入公司名称确认删除',
  'deleteCompanyButton': '删除公司', 'deleteCompanyFailed': '删除公司失败',
  'transferOwnership': '转让所有权', 'transferOwnershipDescription': '将公司所有权转让给其他成员。',
  'transferOwnershipButton': '转让所有权', 'transferOwnershipFailed': '转让所有权失败',
  'save': '保存', 'saved': '已保存', 'saveFailed': '保存失败',
  'loading': '加载中...', 'error': '加载失败', 'retry': '重试',
  'cancel': '取消', 'confirm': '确认', 'delete': '删除',
  'edit': '编辑', 'create': '创建', 'update': '更新',
  'members': '成员', 'memberCount': '{{count}} 名成员',
  'inviteMember': '邀请成员', 'removeMember': '移除成员',
  'changeRole': '更改角色', 'role': '角色',
  'admin': '管理员', 'member': '成员', 'viewer': '查看者',
  'owner': '所有者', 'guest': '访客',
  'joinedAt': '加入时间', 'lastActive': '最后活跃',
  'noMembers': '暂无成员', 'searchMembers': '搜索成员...',
  'filterByRole': '按角色筛选', 'allRoles': '所有角色',
  'export': '导出', 'import': '导入', 'exportData': '导出数据',
  'importData': '导入数据', 'exporting': '导出中...', 'importing': '导入中...',
  'exportSuccess': '导出成功', 'importSuccess': '导入成功',
  'exportFailed': '导出失败', 'importFailed': '导入失败',
  'selectFile': '选择文件', 'preview': '预览', 'confirmImport': '确认导入',
  'skills': '技能', 'skillCount': '{{count}} 个技能',
  'addSkill': '添加技能', 'removeSkill': '移除技能',
  'enableSkill': '启用技能', 'disableSkill': '禁用技能',
  'noSkills': '暂无技能', 'searchSkills': '搜索技能...',
  'environments': '环境', 'environmentCount': '{{count}} 个环境',
  'addEnvironment': '添加环境', 'removeEnvironment': '移除环境',
  'noEnvironments': '暂无环境', 'searchEnvironments': '搜索环境...',
  'variables': '变量', 'variableCount': '{{count}} 个变量',
  'addVariable': '添加变量', 'removeVariable': '移除变量',
  'noVariables': '暂无变量', 'searchVariables': '搜索变量...',
  'invites': '邀请', 'inviteCount': '{{count}} 个邀请',
  'sendInvite': '发送邀请', 'revokeInvite': '撤销邀请',
  'resendInvite': '重新发送邀请', 'noInvites': '暂无邀请',
  'searchInvites': '搜索邀请...', 'inviteStatus': '邀请状态',
  'pending': '待处理', 'accepted': '已接受', 'expired': '已过期',
  'revoked': '已撤销', 'access': '访问控制',
  'roles': '角色', 'permissions': '权限',
  'addRole': '添加角色', 'editRole': '编辑角色', 'deleteRole': '删除角色',
  'roleName': '角色名称', 'roleDescription': '角色描述',
  'noRoles': '暂无角色', 'searchRoles': '搜索角色...',
  'webhooks': 'Webhooks', 'webhookCount': '{{count}} 个 Webhook',
  'addWebhook': '添加 Webhook', 'removeWebhook': '移除 Webhook',
  'noWebhooks': '暂无 Webhooks', 'searchWebhooks': '搜索 Webhooks...',
  'integrations': '集成', 'integrationCount': '{{count}} 个集成',
  'addIntegration': '添加集成', 'removeIntegration': '移除集成',
  'noIntegrations': '暂无集成', 'searchIntegrations': '搜索集成...',
  'apiKeys': 'API 密钥', 'apiKeyCount': '{{count}} 个 API 密钥',
  'generateApiKey': '生成 API 密钥', 'revokeApiKey': '撤销 API 密钥',
  'noApiKeys': '暂无 API 密钥', 'searchApiKeys': '搜索 API 密钥...',
  'auditLog': '审计日志', 'auditLogDescription': '查看公司活动日志。',
  'noAuditLogs': '暂无审计日志', 'searchAuditLogs': '搜索审计日志...',
  'exportAuditLog': '导出审计日志', 'filterByDate': '按日期筛选',
  'filterByUser': '按用户筛选', 'filterByAction': '按操作筛选',
  'billing': '账单', 'billingDescription': '管理公司账单和订阅。',
  'currentPlan': '当前计划', 'upgradePlan': '升级计划',
  'downgradePlan': '降级计划', 'cancelSubscription': '取消订阅',
  'paymentMethod': '支付方式', 'updatePaymentMethod': '更新支付方式',
  'billingHistory': '账单历史', 'invoices': '发票',
  'noInvoices': '暂无发票', 'downloadInvoice': '下载发票',
  'usage': '使用量', 'usageDescription': '查看公司使用量统计。',
  'totalCost': '总成本', 'monthlyCost': '月度成本',
  'dailyCost': '每日成本', 'costByMember': '按成员成本',
  'costByProject': '按项目成本', 'costByAgent': '按代理成本',
  'noUsageData': '暂无使用量数据',
};

// Apply companySettings translations
for (const [k, v] of Object.entries(cs)) {
  if (en.companySettings?.[k] !== undefined) {
    s(zh, 'companySettings.' + k, v);
  }
}

// skills - flat keys
const sk = {
  'title': '技能', 'noSkills': '暂无技能', 'create': '创建技能',
  'name': '名称', 'description': '描述', 'type': '类型', 'status': '状态',
  'version': '版本', 'author': '作者', 'tags': '标签',
  'enable': '启用', 'disable': '禁用', 'edit': '编辑', 'delete': '删除',
  'deleteConfirm': '确定要删除此技能吗？', 'save': '保存', 'cancel': '取消',
  'saved': '已保存', 'saveFailed': '保存失败', 'loading': '加载中...',
  'error': '加载失败', 'retry': '重试', 'search': '搜索技能',
  'filter': '筛选', 'sort': '排序', 'install': '安装', 'uninstall': '卸载',
  'installed': '已安装', 'available': '可用', 'details': '详情',
  'configuration': '配置', 'permissions': '权限', 'dependencies': '依赖',
  'examples': '示例', 'documentation': '文档', 'source': '源码',
  'license': '许可证', 'rating': '评分', 'downloads': '下载次数',
  'lastUpdated': '最后更新', 'compatibility': '兼容性', 'requirements': '要求',
  'changelog': '更新日志', 'issues': '问题', 'support': '支持', 'feedback': '反馈',
};
for (const [k, v] of Object.entries(sk)) {
  if (en.skills?.[k] !== undefined) {
    s(zh, 'skills.' + k, v);
  }
}

// routine - flat keys
const rt = {
  'title': '例程', 'noRoutines': '暂无例程', 'create': '创建例程',
  'name': '名称', 'description': '描述', 'status': '状态', 'trigger': '触发器',
  'schedule': '计划', 'webhook': 'Webhook', 'event': '事件', 'manual': '手动',
  'enable': '启用', 'disable': '禁用', 'edit': '编辑', 'delete': '删除',
  'deleteConfirm': '确定要删除此例程吗？', 'save': '保存', 'cancel': '取消',
  'saved': '已保存', 'saveFailed': '保存失败', 'loading': '加载中...',
  'error': '加载失败', 'retry': '重试', 'search': '搜索例程',
  'filter': '筛选', 'sort': '排序', 'run': '运行', 'stop': '停止',
  'pause': '暂停', 'resume': '恢复', 'restart': '重启',
  'lastRun': '上次运行', 'nextRun': '下次运行', 'runCount': '运行次数',
  'successRate': '成功率', 'averageDuration': '平均持续时间',
  'variables': '变量', 'steps': '步骤', 'history': '历史',
  'details': '详情', 'settings': '设置', 'overview': '概览',
  'logs': '日志', 'output': '输出', 'errors': '错误',
  'active': '活跃', 'paused': '已暂停', 'draft': '草稿', 'archived': '已归档',
  'all': '全部', 'search': '搜索', 'create': '创建',
  'name': '名称', 'description': '描述', 'save': '保存', 'cancel': '取消',
};
for (const [k, v] of Object.entries(rt)) {
  if (en.routine?.[k] !== undefined) {
    s(zh, 'routine.' + k, v);
  }
}

// instanceSettings - flat keys
const is_ = {
  'title': '实例设置', 'general': '通用', 'experimental': '实验性',
  'plugins': '插件', 'adapters': '适配器', 'secrets': '密钥',
  'access': '访问', 'export': '导出', 'import': '导入', 'skills': '技能',
  'environments': '环境', 'profile': '个人设置', 'heartbeats': '心跳监控',
  'save': '保存', 'saved': '已保存', 'saveFailed': '保存失败',
  'loading': '加载中...', 'error': '加载失败', 'retry': '重试',
  'cancel': '取消', 'confirm': '确认', 'delete': '删除',
  'edit': '编辑', 'create': '创建', 'update': '更新',
};
for (const [k, v] of Object.entries(is_)) {
  if (en.instanceSettings?.[k] !== undefined) {
    s(zh, 'instanceSettings.' + k, v);
  }
}

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
console.log('Total:', total);
console.log('Translated:', translated);
console.log('Progress:', Math.round(translated / total * 100) + '%');
