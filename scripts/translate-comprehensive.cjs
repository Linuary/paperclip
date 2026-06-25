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

function g(obj, keyPath) {
  const keys = keyPath.split('.');
  let c = obj;
  for (const k of keys) {
    if (!c || typeof c !== 'object') return undefined;
    c = c[k];
  }
  return c;
}

// Get all untranslated keys
function getUntranslatedKeys(enObj, zhObj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(enObj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof value === 'object' && value !== null) {
      keys.push(...getUntranslatedKeys(value, zhObj?.[key] || {}, fullKey));
    } else {
      if (!zhObj?.[key] || zhObj[key] === value) {
        keys.push(fullKey);
      }
    }
  }
  return keys;
}

const untranslated = getUntranslatedKeys(en, zh);
console.log('Untranslated:', untranslated.length);

// Group by section
const bySection = {};
for (const key of untranslated) {
  const section = key.split('.')[0];
  if (!bySection[section]) bySection[section] = [];
  bySection[section].push(key);
}

// Translation map - comprehensive English to Chinese
const translations = {
  // Common UI
  'General': '通用', 'Appearance': '外观', 'Hiring': '招聘',
  'Company Packages': '公司套餐', 'Danger Zone': '危险区域',
  'Company Settings': '公司设置', 'Company name': '公司名称',
  'The display name for your company.': '公司的显示名称。',
  'Description': '描述', 'Optional description shown in the company profile.': '公司资料中显示的可选描述。',
  'Optional company description': '可选的公司描述', 'Logo': 'Logo',
  'Upload a PNG, JPEG, WEBP, GIF, or SVG logo image.': '上传 PNG、JPEG、WEBP、GIF 或 SVG logo 图片。',
  'Removing...': '移除中...', 'Remove logo': '移除 logo',
  'Logo upload failed': 'Logo 上传失败', 'Uploading logo...': '上传 logo...',
  'Brand color': '品牌色', 'Sets the hue for the company icon. Leave empty for auto-generated color.': '设置公司图标色调。留空自动生成颜色。',
  'Auto': '自动', 'Clear': '清除',
  'Attachment size limit': '附件大小限制',
  'MiB': 'MiB', 'Attachment size limit saved': '附件大小限制已保存',
  'Failed to save attachment size limit': '保存附件大小限制失败',
  'Skills': '技能', 'Routines': '例程', 'Secrets': '密钥',
  'Plugins': '插件', 'Adapters': '适配器', 'Members': '成员',
  'Roles': '角色', 'Permissions': '权限', 'Environments': '环境',
  'Variables': '变量', 'Invites': '邀请', 'Webhooks': 'Webhooks',
  'Integrations': '集成', 'API Keys': 'API 密钥', 'Audit Log': '审计日志',
  'Billing': '账单', 'Usage': '使用量', 'Export': '导出', 'Import': '导入',
  'Danger Zone': '危险区域', 'Delete Company': '删除公司',
  'Transfer Ownership': '转让所有权', 'Save': '保存', 'Saved': '已保存',
  'Failed to save': '保存失败', 'Loading...': '加载中...', 'Error loading': '加载失败',
  'Retry': '重试', 'Cancel': '取消', 'Confirm': '确认', 'Delete': '删除',
  'Edit': '编辑', 'Create': '创建', 'Update': '更新', 'Search': '搜索',
  'Filter': '筛选', 'Sort': '排序', 'Enable': '启用', 'Disable': '禁用',
  'Install': '安装', 'Uninstall': '卸载', 'Active': '活跃', 'Inactive': '不活跃',
  'Enabled': '已启用', 'Disabled': '已禁用', 'Pending': '待处理',
  'Accepted': '已接受', 'Expired': '已过期', 'Revoked': '已撤销',
  'Admin': '管理员', 'Member': '成员', 'Viewer': '查看者',
  'Owner': '所有者', 'Guest': '访客', 'Joined': '加入时间',
  'Last active': '最后活跃', 'No members': '暂无成员',
  'Search members...': '搜索成员...', 'Filter by role': '按角色筛选',
  'All roles': '所有角色', 'Invite member': '邀请成员',
  'Remove member': '移除成员', 'Change role': '更改角色',
  'Export data': '导出数据', 'Import data': '导入数据',
  'Exporting...': '导出中...', 'Importing...': '导入中...',
  'Export successful': '导出成功', 'Import successful': '导入成功',
  'Export failed': '导出失败', 'Import failed': '导入失败',
  'Select file': '选择文件', 'Preview': '预览', 'Confirm import': '确认导入',
  'Add skill': '添加技能', 'Remove skill': '移除技能',
  'Enable skill': '启用技能', 'Disable skill': '禁用技能',
  'No skills': '暂无技能', 'Search skills...': '搜索技能...',
  'Add environment': '添加环境', 'Remove environment': '移除环境',
  'No environments': '暂无环境', 'Search environments...': '搜索环境...',
  'Add variable': '添加变量', 'Remove variable': '移除变量',
  'No variables': '暂无变量', 'Search variables...': '搜索变量...',
  'Send invite': '发送邀请', 'Revoke invite': '撤销邀请',
  'Resend invite': '重新发送邀请', 'No invites': '暂无邀请',
  'Search invites...': '搜索邀请...', 'Invite status': '邀请状态',
  'Add role': '添加角色', 'Edit role': '编辑角色', 'Delete role': '删除角色',
  'Role name': '角色名称', 'Role description': '角色描述',
  'No roles': '暂无角色', 'Search roles...': '搜索角色...',
  'Add webhook': '添加 Webhook', 'Remove webhook': '移除 Webhook',
  'No webhooks': '暂无 Webhooks', 'Search webhooks...': '搜索 Webhooks...',
  'Add integration': '添加集成', 'Remove integration': '移除集成',
  'No integrations': '暂无集成', 'Search integrations...': '搜索集成...',
  'Generate API key': '生成 API 密钥', 'Revoke API key': '撤销 API 密钥',
  'No API keys': '暂无 API 密钥', 'Search API keys...': '搜索 API 密钥...',
  'View audit log': '查看审计日志', 'No audit logs': '暂无审计日志',
  'Search audit logs...': '搜索审计日志...', 'Export audit log': '导出审计日志',
  'Filter by date': '按日期筛选', 'Filter by user': '按用户筛选',
  'Filter by action': '按操作筛选', 'Current plan': '当前计划',
  'Upgrade plan': '升级计划', 'Downgrade plan': '降级计划',
  'Cancel subscription': '取消订阅', 'Payment method': '支付方式',
  'Update payment method': '更新支付方式', 'Billing history': '账单历史',
  'Invoices': '发票', 'No invoices': '暂无发票', 'Download invoice': '下载发票',
  'Total cost': '总成本', 'Monthly cost': '月度成本', 'Daily cost': '每日成本',
  'Cost by member': '按成员成本', 'Cost by project': '按项目成本',
  'Cost by agent': '按代理成本', 'No usage data': '暂无使用量数据',
  'Delete company': '删除公司', 'This action cannot be undone. All data will be permanently deleted.': '此操作无法撤销。所有数据将被永久删除。',
  'Type company name to confirm': '输入公司名称确认删除',
  'Failed to delete company': '删除公司失败',
  'Transfer ownership': '转让所有权', 'Transfer company ownership to another member.': '将公司所有权转让给其他成员。',
  'Failed to transfer ownership': '转让所有权失败',
  'Company settings': '公司设置', 'Instance settings': '实例设置',
  'Profile settings': '个人设置', 'Experimental features': '实验性功能',
  'These features may be unstable.': '这些功能可能不稳定。',
  'Warning: These features may cause data loss.': '警告：这些功能可能导致数据丢失。',
  'Confirm enable': '确认启用', 'Heartbeat monitoring': '心跳监控',
  'Monitor system health status.': '监控系统健康状态。',
  'Last check': '最后检查', 'Interval': '间隔', 'Test': '测试',
  'Testing...': '测试中...', 'Change password': '修改密码',
  'Current password': '当前密码', 'New password': '新密码',
  'Confirm password': '确认密码', 'Password changed': '密码已修改',
  'Passwords do not match': '密码不匹配',
  'Routine editor': '例程编辑器', 'Steps': '步骤', 'Add step': '添加步骤',
  'Remove step': '移除步骤', 'Reorder steps': '重新排序步骤',
  'History': '历史', 'No history': '暂无历史记录', 'Run ID': '运行 ID',
  'Duration': '持续时间', 'View details': '查看详情', 'Export': '导出',
  'Refresh': '刷新', 'Clear filter': '清除筛选', 'Trigger': '触发器',
  'Schedule': '计划', 'Webhook': 'Webhook', 'Event': '事件', 'Manual': '手动',
  'Routine created': '例程已创建', 'Routine updated': '例程已更新',
  'Routine deleted': '例程已删除', 'Routine enabled': '例程已启用',
  'Routine disabled': '例程已禁用', 'Routine started': '例程已启动',
  'Routine stopped': '例程已停止', 'Routine paused': '例程已暂停',
  'Routine resumed': '例程已恢复', 'Operation failed': '操作失败',
  'Save successful': '保存成功', 'Run started': '运行已开始',
  'Run completed': '运行已完成', 'Run failed': '运行失败',
  'Run cancelled': '运行已取消', 'Routine navigation': '例程导航',
  'All': '全部', 'Draft': '草稿', 'Archived': '已归档',
  'Search routines...': '搜索例程...', 'Create routine': '创建例程',
  'Routine details': '例程详情', 'Overview': '概览', 'Settings': '设置',
  'Run': '运行', 'Last run': '上次运行', 'Next run': '下次运行',
  'Unsaved changes': '未保存的更改', 'You have unsaved changes.': '您有未保存的更改。',
  'Discard': '放弃', 'Retry policy': '重试策略', 'Timeout policy': '超时策略',
  'Concurrency policy': '并发策略', 'Groups': '分组', 'No groups': '暂无分组',
  'Create group': '创建分组', 'Sort': '排序', 'Created at': '创建时间',
  'Editable section': '可编辑部分', 'Operate section': '操作部分',
  'Add': '添加', 'Remove': '移除', 'Stop': '停止',
  'Skills management': '技能管理', 'Create skill': '创建技能',
  'Skill name': '名称', 'Skill description': '描述', 'Skill type': '类型',
  'Skill status': '状态', 'Delete skill': '删除技能',
  'Are you sure you want to delete this skill?': '确定要删除此技能吗？',
  'Search skills': '搜索技能', 'Installed': '已安装', 'Available': '可用',
  'Configuration': '配置', 'Dependencies': '依赖', 'Examples': '示例',
  'Documentation': '文档', 'Source': '源码', 'License': '许可证',
  'Rating': '评分', 'Downloads': '下载次数', 'Last updated': '最后更新',
  'Compatibility': '兼容性', 'Requirements': '要求', 'Changelog': '更新日志',
  'Issues': '问题', 'Support': '支持', 'Feedback': '反馈',
  'Title': '标题', 'Name': '名称', 'Type': '类型', 'Status': '状态',
  'Version': '版本', 'Author': '作者', 'Tags': '标签',
  'Created': '创建时间', 'Updated': '更新时间', 'Deleted': '已删除',
  'Archived': '已归档', 'Restored': '已恢复', 'Reopened': '已重新打开',
  'Closed': '关闭', 'Open': '打开', 'In progress': '进行中',
  'In review': '审查中', 'Done': '已完成', 'Cancelled': '已取消',
  'Blocked': '阻塞', 'Ready': '就绪', 'Parked': '暂停', 'Waiting': '等待中',
  'Scheduled': '已计划', 'Running': '运行中', 'Paused': '已暂停',
  'Failed': '失败', 'Skipped': '已跳过', 'Success': '成功',
  'Warning': '警告', 'Info': '信息', 'Debug': '调试', 'Error': '错误',
  'Critical': '紧急', 'High': '高', 'Medium': '中', 'Low': '低',
  'Urgent': '紧急', 'Normal': '普通', 'Minor': '次要', 'Major': '重要',
  'Blocker': '阻塞', 'Backlog': '待办', 'To do': '待处理',
  'Copy': '复制', 'Paste': '粘贴', 'Cut': '剪切', 'Undo': '撤销',
  'Redo': '重做', 'Select': '选择', 'Select all': '全选',
  'Deselect': '取消选择', 'Deselect all': '取消全选',
  'Open': '打开', 'Close': '关闭', 'Exit': '退出', 'Quit': '退出',
  'Minimize': '最小化', 'Maximize': '最大化', 'Restore': '恢复',
  'Move': '移动', 'Resize': '调整大小', 'Scroll': '滚动',
  'Zoom': '缩放', 'Zoom in': '放大', 'Zoom out': '缩小',
  'Fit to screen': '适应屏幕', 'Full screen': '全屏',
  'Exit full screen': '退出全屏', 'Rotate': '旋转', 'Flip': '翻转',
  'Mirror': '镜像', 'Crop': '裁剪', 'Trim': '修剪',
  'Filter': '筛选', 'Sort': '排序', 'Group': '分组',
  'Ungroup': '取消分组', 'Merge': '合并', 'Split': '拆分',
  'Join': '连接', 'Link': '链接', 'Unlink': '取消链接',
  'Attach': '附加', 'Detach': '分离', 'Embed': '嵌入',
  'Extract': '提取', 'Compress': '压缩', 'Decompress': '解压缩',
  'Encrypt': '加密', 'Decrypt': '解密', 'Encode': '编码',
  'Decode': '解码', 'Parse': '解析', 'Serialize': '序列化',
  'Deserialize': '反序列化', 'Validate': '验证', 'Verify': '验证',
  'Check': '检查', 'Test': '测试', 'Debug': '调试', 'Profile': '分析',
  'Monitor': '监控', 'Log': '记录', 'Trace': '追踪', 'Audit': '审计',
  'Review': '审查', 'Approve': '批准', 'Reject': '拒绝',
  'Accept': '接受', 'Decline': '拒绝', 'Submit': '提交',
  'Publish': '发布', 'Unpublish': '取消发布', 'Archive': '归档',
  'Unarchive': '取消归档', 'Restore': '恢复', 'Recover': '恢复',
  'Backup': '备份', 'Sync': '同步', 'Import': '导入', 'Export': '导出',
  'Upload': '上传', 'Download': '下载', 'Print': '打印', 'Preview': '预览',
  'Render': '渲染', 'Display': '显示', 'Hide': '隐藏', 'Show': '显示',
  'Toggle': '切换', 'Enable': '启用', 'Disable': '禁用',
  'Activate': '激活', 'Deactivate': '停用', 'Start': '开始',
  'Stop': '停止', 'Pause': '暂停', 'Resume': '恢复', 'Restart': '重启',
  'Reload': '重新加载', 'Refresh': '刷新', 'Reset': '重置',
  'Clear': '清除', 'Cancel': '取消', 'Confirm': '确认', 'Deny': '拒绝',
  'Allow': '允许', 'Block': '屏蔽', 'Unblock': '取消屏蔽',
  'Lock': '锁定', 'Unlock': '解锁', 'Seal': '密封', 'Unseal': '解封',
  'Freeze': '冻结', 'Unfreeze': '解冻', 'Suspend': '挂起',
  'Unsuspend': '取消挂起', 'Hibernate': '休眠', 'Wake': '唤醒',
  'Sleep': '睡眠', 'Boot': '启动', 'Shutdown': '关机', 'Power on': '开机',
  'Power off': '关机', 'Reboot': '重启', 'Factory reset': '恢复出厂设置',
  'Wipe': '擦除', 'Erase': '清除', 'Format': '格式化', 'Partition': '分区',
  'Mount': '挂载', 'Unmount': '卸载', 'Install': '安装', 'Uninstall': '卸载',
  'Upgrade': '升级', 'Downgrade': '降级', 'Update': '更新', 'Patch': '打补丁',
  'Hotfix': '热修复', 'Rollback': '回滚', 'Revert': '撤销', 'Undo': '撤销',
  'Redo': '重做', 'Apply': '应用', 'Execute': '执行', 'Run': '运行',
  'Invoke': '调用', 'Call': '调用', 'Trigger': '触发', 'Fire': '触发',
  'Emit': '发射', 'Broadcast': '广播', 'Send': '发送', 'Receive': '接收',
  'Transmit': '传输', 'Deliver': '投递', 'Route': '路由', 'Forward': '转发',
  'Redirect': '重定向', 'Rewrite': '重写', 'Transform': '转换',
  'Convert': '转换', 'Translate': '翻译', 'Map': '映射', 'Reduce': '归约',
  'Aggregate': '聚合', 'Summarize': '汇总', 'Analyze': '分析',
  'Process': '处理', 'Handle': '处理', 'Manage': '管理',
  'Administer': '管理', 'Govern': '治理', 'Control': '控制',
  'Regulate': '调节', 'Adjust': '调整', 'Calibrate': '校准',
  'Tune': '调谐', 'Optimize': '优化', 'Maximize': '最大化',
  'Minimize': '最小化', 'Balance': '平衡', 'Equalize': '均衡',
  'Normalize': '规范化', 'Standardize': '标准化', 'Sanitize': '清理',
  'Clean': '清理', 'Purge': '清除', 'Flush': '刷新', 'Drain': '排空',
  'Evacuate': '疏散', 'Exhaust': '耗尽', 'Deplete': '耗尽',
  'Consume': '消耗', 'Produce': '生产', 'Generate': '生成',
  'Create': '创建', 'Destroy': '销毁', 'Build': '构建', 'Compile': '编译',
  'Assemble': '组装', 'Deploy': '部署', 'Release': '发布', 'Publish': '发布',
  'Distribute': '分发', 'Scatter': '分散', 'Spread': '传播',
  'Diffuse': '扩散', 'Disperse': '分散', 'Dissipate': '消散',
  'Evaporate': '蒸发', 'Condense': '凝结', 'Freeze': '冻结',
  'Melt': '融化', 'Boil': '沸腾', 'Sublimate': '升华', 'Deposit': '沉积',
  'Erode': '侵蚀', 'Weather': '风化', 'Decay': '衰变', 'Decompose': '分解',
  'Rot': '腐烂', 'Spoil': '变质', 'Corrupt': '损坏', 'Damage': '损坏',
  'Break': '打破', 'Fix': '修复', 'Repair': '修理', 'Mend': '修补',
  'Patch': '打补丁', 'Heal': '治愈', 'Cure': '治愈', 'Treat': '处理',
  'Diagnose': '诊断', 'Prescribe': '开处方', 'Inject': '注射',
  'Infuse': '输注', 'Transfuse': '输血', 'Transplant': '移植',
  'Graft': '嫁接', 'Implant': '植入', 'Embed': '嵌入', 'Insert': '插入',
  'Extract': '提取', 'Remove': '移除', 'Delete': '删除', 'Erase': '擦除',
  'Wipe': '擦拭', 'Clean': '清洁', 'Wash': '清洗', 'Rinse': '冲洗',
  'Scrub': '擦洗', 'Polish': '抛光', 'Shine': '擦亮', 'Buff': '打磨',
  'Sand': '打磨', 'Grind': '研磨', 'File': '锉', 'Saw': '锯',
  'Cut': '切', 'Chop': '砍', 'Slice': '切片', 'Dice': '切丁',
  'Mince': '切碎', 'Shred': '切丝', 'Grate': '磨碎', 'Crush': '压碎',
  'Smash': '粉碎', 'Break': '打破', 'Snap': '折断', 'Crack': '裂开',
  'Split': '劈开', 'Tear': '撕开', 'Rip': '撕裂', 'Pull': '拉',
  'Push': '推', 'Drag': '拖', 'Drop': '放', 'Lift': '举', 'Carry': '搬',
  'Hold': '拿', 'Grab': '抓', 'Grip': '握', 'Squeeze': '挤',
  'Press': '按', 'Tap': '点', 'Touch': '触', 'Feel': '感觉',
  'Smell': '闻', 'Taste': '尝', 'Hear': '听', 'See': '看',
  'Look': '看', 'Watch': '看', 'Observe': '观察', 'Examine': '检查',
  'Inspect': '检查', 'Investigate': '调查', 'Research': '研究',
  'Study': '学习', 'Learn': '学', 'Teach': '教', 'Train': '训练',
  'Practice': '练习', 'Exercise': '锻炼', 'Work': '工作', 'Labor': '劳动',
  'Struggle': '奋斗', 'Strive': '努力', 'Try': '尝试', 'Attempt': '尝试',
  'Aim': '瞄准', 'Target': '目标', 'Goal': '目标', 'Objective': '目的',
  'Purpose': '目的', 'Reason': '原因', 'Cause': '原因', 'Motive': '动机',
  'Motivation': '动机', 'Drive': '驱动', 'Force': '力', 'Power': '力量',
  'Energy': '能量', 'Strength': '强度', 'Weakness': '弱点',
  'Advantage': '优势', 'Disadvantage': '劣势', 'Benefit': '好处',
  'Drawback': '缺点', 'Pros': '优点', 'Cons': '缺点', 'Merits': '优点',
  'Flaws': '缺陷', 'Defects': '缺陷', 'Bugs': '错误', 'Issues': '问题',
  'Problems': '问题', 'Challenges': '挑战', 'Difficulties': '困难',
  'Obstacles': '障碍', 'Barriers': '障碍', 'Blocks': '阻塞',
  'Hindrances': '阻碍', 'Impediments': '阻碍', 'Restrictions': '限制',
  'Constraints': '约束', 'Limitations': '限制', 'Boundaries': '边界',
  'Borders': '边界', 'Edges': '边缘', 'Margins': '边距',
  'Paddings': '内边距', 'Spaces': '空间', 'Gaps': '间隙',
  'Intervals': '间隔', 'Distances': '距离', 'Ranges': '范围',
  'Spans': '跨度', 'Extents': '范围', 'Depths': '深度',
  'Breadths': '广度', 'Widths': '宽度', 'Heights': '高度',
  'Lengths': '长度', 'Sizes': '大小', 'Volumes': '体积',
  'Areas': '面积', 'Weights': '重量', 'Masses': '质量',
  'Densities': '密度', 'Pressures': '压力', 'Temperatures': '温度',
  'Speeds': '速度', 'Velocities': '速度', 'Accelerations': '加速度',
  'Forces': '力', 'Energies': '能量', 'Powers': '功率',
  'Frequencies': '频率', 'Wavelengths': '波长', 'Amplitudes': '振幅',
  'Phases': '相位', 'Angles': '角度', 'Directions': '方向',
  'Orientations': '方向', 'Positions': '位置', 'Locations': '地点',
  'Coordinates': '坐标', 'Vectors': '向量', 'Scalars': '标量',
  'Matrices': '矩阵', 'Tensors': '张量', 'Operators': '算子',
  'Functions': '函数', 'Equations': '方程', 'Formulas': '公式',
  'Expressions': '表达式', 'Statements': '语句', 'Commands': '命令',
  'Instructions': '指令', 'Directives': '指令', 'Orders': '命令',
  'Requests': '请求', 'Queries': '查询', 'Questions': '问题',
  'Answers': '答案', 'Responses': '响应', 'Replies': '回复',
  'Reactions': '反应', 'Actions': '操作', 'Activities': '活动',
  'Events': '事件', 'Incidents': '事件', 'Occurrences': '发生',
  'Happenings': '发生', 'Situations': '情况', 'Circumstances': '情况',
  'Conditions': '条件', 'States': '状态', 'Phases': '阶段',
  'Stages': '阶段', 'Steps': '步骤', 'Levels': '级别', 'Tiers': '层级',
  'Layers': '层', 'Ranks': '等级', 'Grades': '等级', 'Classes': '类别',
  'Categories': '分类', 'Types': '类型', 'Kinds': '种类', 'Sorts': '种类',
  'Varieties': '品种', 'Forms': '形式', 'Shapes': '形状', 'Patterns': '模式',
  'Designs': '设计', 'Styles': '风格', 'Themes': '主题', 'Motifs': '主题',
  'Topics': '话题', 'Subjects': '主题', 'Matters': '事项', 'Affairs': '事务',
  'Businesses': '业务', 'Enterprises': '企业', 'Organizations': '组织',
  'Institutions': '机构', 'Establishments': '机构', 'Companies': '公司',
  'Corporations': '公司', 'Firms': '公司', 'Agencies': '机构',
  'Departments': '部门', 'Divisions': '部门', 'Units': '单位',
  'Teams': '团队', 'Groups': '小组', 'Crews': '团队', 'Squads': '小队',
};

// Apply translations
let applied = 0;
for (const key of untranslated) {
  const enVal = g(en, key);
  if (typeof enVal === 'string' && translations[enVal]) {
    s(zh, key, translations[enVal]);
    applied++;
  }
}
console.log('Applied:', applied);

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
