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

// companySettings - remaining keys
const cs = {
  'general.title': '通用设置', 'general.name': '公司名称', 'general.slug': '公司标识',
  'general.description': '描述', 'general.logo': 'Logo', 'general.save': '保存',
  'general.saved': '已保存', 'general.saveFailed': '保存失败', 'general.loading': '加载中...',
  'general.error': '加载失败', 'members.title': '成员管理', 'members.noMembers': '暂无成员',
  'members.invite': '邀请成员', 'members.remove': '移除', 'members.role': '角色',
  'members.joinedAt': '加入时间', 'members.loading': '加载中...', 'members.error': '加载失败',
  'members.inviteSent': '邀请已发送', 'members.inviteFailed': '发送邀请失败',
  'members.removeConfirm': '确定要移除此成员吗？', 'members.removed': '成员已移除',
  'members.removeFailed': '移除失败', 'access.title': '访问控制', 'access.loading': '加载中...',
  'access.error': '加载失败', 'access.roles': '角色', 'access.permissions': '权限',
  'access.addRole': '添加角色', 'access.editRole': '编辑角色', 'access.deleteRole': '删除角色',
  'access.deleteConfirm': '确定要删除此角色吗？', 'access.roleName': '角色名称',
  'access.roleDescription': '角色描述', 'access.save': '保存', 'access.cancel': '取消',
  'access.saved': '已保存', 'access.saveFailed': '保存失败',
  'environments.title': '环境管理', 'environments.noEnvironments': '暂无环境',
  'environments.create': '创建环境', 'environments.name': '名称', 'environments.description': '描述',
  'environments.variables': '变量', 'environments.addVariable': '添加变量',
  'environments.removeVariable': '移除变量', 'environments.save': '保存', 'environments.cancel': '取消',
  'environments.saved': '已保存', 'environments.saveFailed': '保存失败',
  'environments.delete': '删除', 'environments.deleteConfirm': '确定要删除此环境吗？',
  'environments.deleted': '环境已删除', 'environments.deleteFailed': '删除失败',
  'environments.loading': '加载中...', 'environments.error': '加载失败',
  'invites.title': '邀请管理', 'invites.noInvites': '暂无邀请', 'invites.send': '发送邀请',
  'invites.email': '邮箱', 'invites.role': '角色', 'invites.status': '状态',
  'invites.sentAt': '发送时间', 'invites.expiresAt': '过期时间', 'invites.resend': '重新发送',
  'invites.revoke': '撤销', 'invites.revokeConfirm': '确定要撤销此邀请吗？',
  'invites.revoked': '邀请已撤销', 'invites.revokeFailed': '撤销失败',
  'invites.loading': '加载中...', 'invites.error': '加载失败',
  'export.title': '导出', 'export.description': '导出公司数据。', 'export.export': '导出',
  'export.exporting': '导出中...', 'export.success': '导出成功', 'export.error': '导出失败',
  'export.format': '格式', 'export.includeAgents': '包含代理', 'export.includeProjects': '包含项目',
  'export.includeRoutines': '包含例程', 'import.title': '导入', 'import.description': '导入公司数据。',
  'import.import': '导入', 'import.importing': '导入中...', 'import.success': '导入成功',
  'import.error': '导入失败', 'import.selectFile': '选择文件', 'import.preview': '预览',
  'import.confirm': '确认导入', 'import.cancel': '取消',
  'skills.title': '技能管理', 'skills.noSkills': '暂无技能', 'skills.create': '创建技能',
  'skills.name': '名称', 'skills.description': '描述', 'skills.type': '类型',
  'skills.status': '状态', 'skills.enable': '启用', 'skills.disable': '禁用',
  'skills.edit': '编辑', 'skills.delete': '删除', 'skills.deleteConfirm': '确定要删除此技能吗？',
  'skills.save': '保存', 'skills.cancel': '取消', 'skills.saved': '已保存',
  'skills.saveFailed': '保存失败', 'skills.loading': '加载中...', 'skills.error': '加载失败',
};

// skills - remaining keys
const sk = {
  'title': '技能', 'noSkills': '暂无技能', 'create': '创建技能', 'name': '名称',
  'description': '描述', 'type': '类型', 'status': '状态', 'version': '版本',
  'author': '作者', 'tags': '标签', 'enable': '启用', 'disable': '禁用',
  'edit': '编辑', 'delete': '删除', 'deleteConfirm': '确定要删除此技能吗？',
  'save': '保存', 'cancel': '取消', 'saved': '已保存', 'saveFailed': '保存失败',
  'loading': '加载中...', 'error': '加载失败', 'retry': '重试', 'search': '搜索技能',
  'filter': '筛选', 'sort': '排序', 'install': '安装', 'uninstall': '卸载',
  'installed': '已安装', 'available': '可用', 'details': '详情', 'configuration': '配置',
  'permissions': '权限', 'dependencies': '依赖', 'examples': '示例', 'documentation': '文档',
  'source': '源码', 'license': '许可证', 'rating': '评分', 'downloads': '下载次数',
  'lastUpdated': '最后更新', 'compatibility': '兼容性', 'requirements': '要求',
  'changelog': '更新日志', 'issues': '问题', 'support': '支持', 'feedback': '反馈',
};

// routine - remaining keys
const rt = {
  'history.title': '历史记录', 'history.noHistory': '暂无历史记录', 'history.loading': '加载中...',
  'history.error': '加载失败', 'history.retry': '重试', 'history.runId': '运行 ID',
  'history.status': '状态', 'history.startedAt': '开始时间', 'history.completedAt': '完成时间',
  'history.duration': '持续时间', 'history.trigger': '触发器', 'history.viewDetails': '查看详情',
  'history.export': '导出', 'history.refresh': '刷新', 'history.filter': '筛选',
  'history.clearFilter': '清除筛选', 'history.search': '搜索',
  'toasts.created': '例程已创建', 'toasts.updated': '例程已更新', 'toasts.deleted': '例程已删除',
  'toasts.enabled': '例程已启用', 'toasts.disabled': '例程已禁用', 'toasts.started': '例程已启动',
  'toasts.stopped': '例程已停止', 'toasts.paused': '例程已暂停', 'toasts.resumed': '例程已恢复',
  'toasts.error': '操作失败', 'toasts.saveSuccess': '保存成功', 'toasts.saveFailed': '保存失败',
  'toasts.deleteFailed': '删除失败', 'toasts.runStarted': '运行已开始',
  'toasts.runCompleted': '运行已完成', 'toasts.runFailed': '运行失败',
  'toasts.runCancelled': '运行已取消',
  'composer.title': '例程编辑器', 'composer.name': '名称', 'composer.description': '描述',
  'composer.trigger': '触发器', 'composer.schedule': '计划', 'composer.webhook': 'Webhook',
  'composer.event': '事件', 'composer.manual': '手动', 'composer.steps': '步骤',
  'composer.addStep': '添加步骤', 'composer.removeStep': '移除步骤',
  'composer.reorderSteps': '重新排序步骤', 'composer.save': '保存', 'composer.cancel': '取消',
  'composer.saved': '已保存', 'composer.saveFailed': '保存失败', 'composer.preview': '预览',
  'composer.test': '测试', 'composer.run': '运行',
  'nav.title': '例程导航', 'nav.all': '全部', 'nav.active': '活跃', 'nav.paused': '已暂停',
  'nav.draft': '草稿', 'nav.archived': '已归档', 'nav.search': '搜索例程', 'nav.filter': '筛选',
  'nav.sort': '排序', 'nav.create': '创建例程',
  'detail.title': '例程详情', 'detail.loading': '加载中...', 'detail.error': '加载失败',
  'detail.retry': '重试', 'detail.overview': '概览', 'detail.history': '历史',
  'detail.settings': '设置', 'detail.run': '运行', 'detail.edit': '编辑', 'detail.delete': '删除',
  'detail.enable': '启用', 'detail.disable': '禁用', 'detail.schedule': '计划',
  'detail.lastRun': '上次运行', 'detail.nextRun': '下次运行', 'detail.status': '状态',
  'detail.trigger': '触发器', 'detail.variables': '变量', 'detail.steps': '步骤',
  'dirty.title': '未保存的更改', 'dirty.description': '您有未保存的更改。',
  'dirty.save': '保存', 'dirty.discard': '放弃', 'dirty.cancel': '取消',
  'policies.title': '策略', 'policies.retry': '重试策略', 'policies.timeout': '超时策略',
  'policies.concurrency': '并发策略', 'policies.save': '保存', 'policies.cancel': '取消',
  'groups.title': '分组', 'groups.noGroups': '暂无分组', 'groups.create': '创建分组',
  'groups.name': '名称', 'groups.description': '描述', 'groups.save': '保存', 'groups.delete': '删除',
  'sort.title': '排序', 'sort.name': '名称', 'sort.status': '状态', 'sort.lastRun': '上次运行',
  'sort.createdAt': '创建时间',
  'sections.editable.title': '可编辑部分', 'sections.editable.add': '添加',
  'sections.editable.remove': '移除', 'sections.editable.save': '保存',
  'sections.operate.title': '操作部分', 'sections.operate.run': '运行',
  'sections.operate.pause': '暂停', 'sections.operate.resume': '恢复', 'sections.operate.stop': '停止',
};

// instanceSettings - remaining keys
const is_ = {
  'general.title': '通用设置', 'general.instanceName': '实例名称',
  'general.instanceDescription': '实例描述', 'general.save': '保存',
  'general.saved': '已保存', 'general.saveFailed': '保存失败', 'general.loading': '加载中...',
  'general.error': '加载失败', 'general.retry': '重试',
  'experimental.title': '实验性功能', 'experimental.description': '这些功能可能不稳定。',
  'experimental.enable': '启用', 'experimental.disable': '禁用', 'experimental.enabled': '已启用',
  'experimental.disabled': '已禁用', 'experimental.save': '保存', 'experimental.saved': '已保存',
  'experimental.saveFailed': '保存失败', 'experimental.loading': '加载中...',
  'experimental.error': '加载失败', 'experimental.warning': '警告：这些功能可能导致数据丢失。',
  'experimental.confirm': '确认启用', 'experimental.cancel': '取消',
  'profile.title': '个人设置', 'profile.name': '名称', 'profile.email': '邮箱',
  'profile.avatar': '头像', 'profile.save': '保存', 'profile.saved': '已保存',
  'profile.saveFailed': '保存失败', 'profile.loading': '加载中...', 'profile.error': '加载失败',
  'profile.changePassword': '修改密码', 'profile.currentPassword': '当前密码',
  'profile.newPassword': '新密码', 'profile.confirmPassword': '确认密码',
  'profile.passwordChanged': '密码已修改', 'profile.passwordMismatch': '密码不匹配',
  'heartbeats.title': '心跳监控', 'heartbeats.description': '监控系统健康状态。',
  'heartbeats.status': '状态', 'heartbeats.lastCheck': '最后检查', 'heartbeats.interval': '间隔',
  'heartbeats.enabled': '已启用', 'heartbeats.disabled': '已禁用', 'heartbeats.save': '保存',
  'heartbeats.saved': '已保存', 'heartbeats.saveFailed': '保存失败', 'heartbeats.loading': '加载中...',
  'heartbeats.error': '加载失败', 'heartbeats.test': '测试', 'heartbeats.testing': '测试中...',
};

// Apply all translations
for (const [k, v] of Object.entries(cs)) s(zh, 'companySettings.' + k, v);
for (const [k, v] of Object.entries(sk)) s(zh, 'skills.' + k, v);
for (const [k, v] of Object.entries(rt)) s(zh, 'routine.' + k, v);
for (const [k, v] of Object.entries(is_)) s(zh, 'instanceSettings.' + k, v);

fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
console.log('Applied translations for companySettings, skills, routine, instanceSettings.');
