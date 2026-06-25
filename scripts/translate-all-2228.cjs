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

// Read untranslated keys
const untranslated = JSON.parse(fs.readFileSync('scripts/untranslated-final.json', 'utf8'));
console.log('Untranslated:', Object.keys(untranslated).length);

// Build a comprehensive English-to-Chinese translation function
// We'll translate common patterns and phrases
function translateValue(enVal) {
  if (typeof enVal !== 'string') return enVal;

  // Common single-word translations
  const wordDict = {
    'Daily': '每日', 'Weekly': '每周', 'Monthly': '每月', 'Yearly': '每年',
    'Status': '状态', 'Priority': '优先级', 'Type': '类型', 'Name': '名称',
    'Description': '描述', 'Title': '标题', 'Version': '版本', 'Author': '作者',
    'Tags': '标签', 'Created': '创建时间', 'Updated': '更新时间', 'Deleted': '已删除',
    'Loading...': '加载中...', 'Error': '错误', 'Success': '成功', 'Warning': '警告',
    'Save': '保存', 'Cancel': '取消', 'Delete': '删除', 'Edit': '编辑',
    'Create': '创建', 'Update': '更新', 'Search': '搜索', 'Filter': '筛选',
    'Sort': '排序', 'Enable': '启用', 'Disable': '禁用', 'Install': '安装',
    'Uninstall': '卸载', 'Active': '活跃', 'Inactive': '不活跃', 'Enabled': '已启用',
    'Disabled': '已禁用', 'Pending': '待处理', 'Accepted': '已接受', 'Expired': '已过期',
    'Revoked': '已撤销', 'Admin': '管理员', 'Member': '成员', 'Viewer': '查看者',
    'Owner': '所有者', 'Guest': '访客', 'Retry': '重试', 'Close': '关闭',
    'Back': '返回', 'Next': '下一步', 'Done': '完成', 'Submit': '提交',
    'Reset': '重置', 'Apply': '应用', 'Clear': '清除', 'Select': '选择',
    'Confirm': '确认', 'Yes': '是', 'No': '否', 'OK': '确定',
    'Add': '添加', 'Remove': '移除', 'Copy': '复制', 'Paste': '粘贴',
    'Cut': '剪切', 'Undo': '撤销', 'Redo': '重做', 'View': '查看',
    'Preview': '预览', 'Details': '详情', 'Overview': '概览', 'Settings': '设置',
    'Help': '帮助', 'About': '关于', 'More': '更多', 'Less': '更少',
    'Show more': '显示更多', 'Show less': '收起', 'Expand': '展开', 'Collapse': '折叠',
    'Refresh': '刷新', 'Online': '在线', 'Offline': '离线', 'Connected': '已连接',
    'Disconnected': '未连接', 'Running': '运行中', 'Paused': '已暂停', 'Stopped': '已停止',
    'Queued': '已排队', 'Scheduled': '已计划', 'Blocked': '阻塞', 'Ready': '就绪',
    'Parked': '暂停', 'Waiting': '等待中', 'Open': '打开', 'Closed': '关闭',
    'Reopened': '已重新打开', 'Resolved': '已解决', 'In progress': '进行中',
    'In review': '审查中', 'To do': '待处理', 'Backlog': '待办', 'Draft': '草稿',
    'Archived': '已归档', 'Critical': '紧急', 'High': '高', 'Medium': '中',
    'Low': '低', 'Urgent': '紧急', 'Normal': '普通', 'Minor': '次要',
    'Major': '重要', 'Blocker': '阻塞', 'Duration': '持续时间', 'Start': '开始',
    'End': '结束', 'Begin': '开始', 'Finish': '完成', 'Pause': '暂停',
    'Resume': '恢复', 'Stop': '停止', 'Restart': '重启', 'Skip': '跳过',
    'Abort': '中止', 'Ignore': '忽略', 'Accept': '接受', 'Reject': '拒绝',
    'Approve': '批准', 'Decline': '拒绝', 'Publish': '发布', 'Archive': '归档',
    'Restore': '恢复', 'Backup': '备份', 'Sync': '同步', 'Import': '导入',
    'Export': '导出', 'Upload': '上传', 'Download': '下载', 'Print': '打印',
    'Display': '显示', 'Hide': '隐藏', 'Show': '显示', 'Toggle': '切换',
    'Activate': '激活', 'Deactivate': '停用', 'Start': '开始', 'Reload': '重新加载',
    'Reset': '重置', 'Clear': '清除', 'Lock': '锁定', 'Unlock': '解锁',
    'Freeze': '冻结', 'Unfreeze': '解冻', 'Suspend': '挂起', 'Hibernate': '休眠',
    'Wake': '唤醒', 'Boot': '启动', 'Shutdown': '关机', 'Reboot': '重启',
    'Install': '安装', 'Uninstall': '卸载', 'Upgrade': '升级', 'Downgrade': '降级',
    'Patch': '打补丁', 'Hotfix': '热修复', 'Rollback': '回滚', 'Revert': '撤销',
    'Apply': '应用', 'Execute': '执行', 'Run': '运行', 'Invoke': '调用',
    'Trigger': '触发', 'Send': '发送', 'Receive': '接收', 'Transmit': '传输',
    'Deliver': '投递', 'Route': '路由', 'Forward': '转发', 'Redirect': '重定向',
    'Transform': '转换', 'Convert': '转换', 'Translate': '翻译', 'Map': '映射',
    'Reduce': '归约', 'Filter': '筛选', 'Aggregate': '聚合', 'Analyze': '分析',
    'Process': '处理', 'Handle': '处理', 'Manage': '管理', 'Control': '控制',
    'Adjust': '调整', 'Calibrate': '校准', 'Tune': '调谐', 'Optimize': '优化',
    'Maximize': '最大化', 'Minimize': '最小化', 'Balance': '平衡', 'Normalize': '规范化',
    'Standardize': '标准化', 'Sanitize': '清理', 'Clean': '清理', 'Purge': '清除',
    'Generate': '生成', 'Create': '创建', 'Destroy': '销毁', 'Build': '构建',
    'Compile': '编译', 'Deploy': '部署', 'Release': '发布', 'Distribute': '分发',
    'Fix': '修复', 'Repair': '修理', 'Heal': '治愈', 'Diagnose': '诊断',
    'Test': '测试', 'Debug': '调试', 'Profile': '分析', 'Monitor': '监控',
    'Log': '记录', 'Trace': '追踪', 'Audit': '审计', 'Review': '审查',
    'Validate': '验证', 'Verify': '验证', 'Check': '检查', 'Inspect': '检查',
    'Investigate': '调查', 'Research': '研究', 'Study': '学习', 'Learn': '学',
    'Teach': '教', 'Train': '训练', 'Practice': '练习', 'Work': '工作',
    'Try': '尝试', 'Attempt': '尝试', 'Aim': '瞄准', 'Target': '目标',
    'Goal': '目标', 'Objective': '目的', 'Purpose': '目的', 'Reason': '原因',
    'Cause': '原因', 'Force': '力', 'Power': '力量', 'Energy': '能量',
    'Strength': '强度', 'Weakness': '弱点', 'Advantage': '优势', 'Disadvantage': '劣势',
    'Benefit': '好处', 'Drawback': '缺点', 'Issues': '问题', 'Problems': '问题',
    'Challenges': '挑战', 'Difficulties': '困难', 'Obstacles': '障碍', 'Barriers': '障碍',
    'Restrictions': '限制', 'Constraints': '约束', 'Limitations': '限制',
    'Boundaries': '边界', 'Edges': '边缘', 'Margins': '边距', 'Spaces': '空间',
    'Gaps': '间隙', 'Intervals': '间隔', 'Distances': '距离', 'Ranges': '范围',
    'Depths': '深度', 'Widths': '宽度', 'Heights': '高度', 'Lengths': '长度',
    'Sizes': '大小', 'Volumes': '体积', 'Areas': '面积', 'Weights': '重量',
    'Speeds': '速度', 'Forces': '力', 'Energies': '能量', 'Powers': '功率',
    'Frequencies': '频率', 'Angles': '角度', 'Directions': '方向', 'Positions': '位置',
    'Locations': '地点', 'Coordinates': '坐标', 'Vectors': '向量', 'Matrices': '矩阵',
    'Functions': '函数', 'Equations': '方程', 'Formulas': '公式', 'Expressions': '表达式',
    'Statements': '语句', 'Commands': '命令', 'Instructions': '指令', 'Requests': '请求',
    'Queries': '查询', 'Questions': '问题', 'Answers': '答案', 'Responses': '响应',
    'Replies': '回复', 'Reactions': '反应', 'Actions': '操作', 'Activities': '活动',
    'Events': '事件', 'Incidents': '事件', 'Situations': '情况', 'Conditions': '条件',
    'States': '状态', 'Phases': '阶段', 'Stages': '阶段', 'Steps': '步骤',
    'Levels': '级别', 'Layers': '层', 'Ranks': '等级', 'Classes': '类别',
    'Categories': '分类', 'Types': '类型', 'Kinds': '种类', 'Forms': '形式',
    'Shapes': '形状', 'Patterns': '模式', 'Designs': '设计', 'Styles': '风格',
    'Themes': '主题', 'Topics': '话题', 'Subjects': '主题', 'Matters': '事项',
    'Organizations': '组织', 'Institutions': '机构', 'Companies': '公司',
    'Departments': '部门', 'Teams': '团队', 'Groups': '小组', 'Members': '成员',
    'Participants': '参与者', 'Guests': '客人', 'Visitors': '访客', 'Customers': '客户',
    'Clients': '客户', 'Users': '用户', 'Leaders': '领导', 'Managers': '经理',
    'Directors': '董事', 'Experts': '专家', 'Specialists': '专家', 'Developers': '开发者',
    'Engineers': '工程师', 'Scientists': '科学家', 'Researchers': '研究人员',
    'Teachers': '教师', 'Students': '学生', 'Doctors': '医生', 'Nurses': '护士',
    'Artists': '艺术家', 'Musicians': '音乐家', 'Writers': '作家', 'Actors': '演员',
    'Athletes': '运动员', 'Coaches': '教练', 'Photographers': '摄影师',
    'Designers': '设计师', 'Architects': '建筑师', 'Programmers': '程序员',
    'Administrators': '管理员', 'Operators': '操作员', 'Consultants': '顾问',
    'Volunteers': '志愿者', 'Founders': '创始人', 'Creators': '创造者',
    'Heroes': '英雄', 'Legends': '传奇', 'Stars': '明星', 'Celebrities': '名人',
    'Officials': '官员', 'Representatives': '代表', 'Delegates': '代表',
    'Ambassadors': '大使', 'Pioneers': '先驱', 'Innovators': '创新者',
    'Visionaries': '远见者', 'Geniuses': '天才', 'Masters': '大师',
    'Champions': '冠军', 'Winners': '获胜者', 'Losers': '失败者',
    'Candidates': '候选人', 'Applicants': '申请人', 'Nominees': '被提名者',
    'Contestants': '参赛者', 'Players': '选手', 'Referees': '裁判',
    'Judges': '评委', 'Editors': '编辑', 'Publishers': '出版商',
    'Producers': '制片人', 'Performers': '表演者', 'Singers': '歌手',
    'Dancers': '舞者', 'Painters': '画家', 'Sculptors': '雕塑家',
    'Planners': '规划师', 'Hackers': '黑客', 'Assistants': '助手',
    'Advisors': '顾问', 'Therapists': '治疗师', 'Psychologists': '心理学家',
    'Donors': '捐赠者', 'Patrons': '赞助人', 'Activists': '活动家',
    'Reformers': '改革者', 'Revolutionaries': '革命者', 'Believers': '信徒',
    'Skeptics': '怀疑论者', 'Optimists': '乐观主义者', 'Pessimists': '悲观主义者',
    'Realists': '现实主义者', 'Idealists': '理想主义者', 'Moderates': '温和派',
    'Liberals': '自由派', 'Conservatives': '保守派', 'Progressives': '进步派',
    'Pioneers': '先驱', 'Trailblazers': '开拓者', 'Prodigies': '神童',
    'Authorities': '权威', 'Icons': '偶像', 'Idols': '偶像', 'VIPs': '贵宾',
    'Messengers': '信使', 'Predecessors': '前任', 'Successors': '继任者',
    'Descendants': '后代', 'Ancestors': '祖先', 'Founders': '创始人',
    'Makers': '制造者', 'Builders': '建造者', 'Suppliers': '供应商',
    'Providers': '提供商', 'Vendors': '供应商', 'Merchants': '商人',
    'Traders': '交易者', 'Dealers': '经销商', 'Brokers': '经纪人',
    'Agents': '代理', 'Distributors': '分销商', 'Retailers': '零售商',
    'Consumers': '消费者', 'Buyers': '买家', 'Travelers': '旅行者',
    'Passengers': '乘客', 'Drivers': '司机', 'Pilots': '飞行员',
    'Sailors': '水手', 'Explorers': '探险家', 'Immigrants': '移民',
    'Refugees': '难民', 'Residents': '居民', 'Citizens': '公民',
    'Voters': '选民', 'Taxpayers': '纳税人', 'Colleagues': '同事',
    'Partners': '伙伴', 'Friends': '朋友', 'Neighbors': '邻居',
    'Classmates': '同学', 'Roommates': '室友',
  };

  // Check if the entire value is in the dictionary
  if (wordDict[enVal]) return wordDict[enVal];

  // For strings with interpolation, try to translate parts
  if (enVal.includes('{{')) {
    let result = enVal;
    for (const [en, zh] of Object.entries(wordDict)) {
      if (en.length > 2) {
        result = result.replace(new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g'), zh);
      }
    }
    if (result !== enVal) return result;
  }

  // Return null if no translation found
  return null;
}

// Apply translations
let applied = 0;
let skipped = 0;
for (const [key, enVal] of Object.entries(untranslated)) {
  const translation = translateValue(enVal);
  if (translation) {
    s(zh, key, translation);
    applied++;
  } else {
    skipped++;
  }
}
console.log('Applied:', applied);
console.log('Skipped (no translation found):', skipped);

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
console.log('\nTotal:', total);
console.log('Translated:', translated);
console.log('Progress:', Math.round(translated / total * 100) + '%');
console.log('Remaining:', total - translated);
