const fs = require('fs');
const path = require('path');
const dir = 'ui/src/i18n/locales';
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(dir, 'zh-CN.json'), 'utf8'));

// Helper: set nested key
function setKey(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]] || typeof current[keys[i]] !== 'object') current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

// Helper: get nested key
function getKey(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;
  for (const k of keys) {
    if (!current || typeof current !== 'object') return undefined;
    current = current[k];
  }
  return current;
}

// Collect all untranslated keys
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
console.log('Untranslated keys:', untranslated.length);

// Translation dictionary - maps English values to Chinese translations
const translations = {
  // Common
  'Save': '保存', 'Cancel': '取消', 'Close': '关闭', 'Delete': '删除',
  'Edit': '编辑', 'Create': '创建', 'Update': '更新', 'Submit': '提交',
  'Back': '返回', 'Next': '下一步', 'Done': '完成', 'Finish': '完成',
  'Loading...': '加载中...', 'Error': '错误', 'Success': '成功',
  'Warning': '警告', 'Info': '信息', 'Confirm': '确认', 'Yes': '是',
  'No': '否', 'OK': '确定', 'Add': '添加', 'Remove': '移除',
  'Search': '搜索', 'Filter': '筛选', 'Sort': '排序', 'Refresh': '刷新',
  'Reset': '重置', 'Apply': '应用', 'Clear': '清除', 'Select': '选择',
  'Select all': '全选', 'Deselect all': '取消全选', 'None': '无',
  'Name': '名称', 'Description': '描述', 'Type': '类型', 'Status': '状态',
  'Priority': '优先级', 'Date': '日期', 'Time': '时间', 'Size': '大小',
  'Version': '版本', 'Author': '作者', 'Title': '标题', 'Content': '内容',
  'Settings': '设置', 'General': '通用', 'Advanced': '高级', 'Basic': '基础',
  'Enabled': '已启用', 'Disabled': '已禁用', 'Active': '活跃', 'Inactive': '不活跃',
  'Online': '在线', 'Offline': '离线', 'Connected': '已连接', 'Disconnected': '未连接',
  'Pending': '待处理', 'Processing': '处理中', 'Completed': '已完成', 'Failed': '失败',
  'Cancelled': '已取消', 'Archived': '已归档', 'Deleted': '已删除', 'Draft': '草稿',
  'Published': '已发布', 'Unpublished': '未发布', 'Public': '公开', 'Private': '私有',
  'Required': '必填', 'Optional': '可选', 'Recommended': '推荐', 'Experimental': '实验性',
  'Copied!': '已复制！', 'Copy failed': '复制失败', 'Copy': '复制',
  'Download': '下载', 'Upload': '上传', 'Import': '导入', 'Export': '导出',
  'Retry': '重试', 'Undo': '撤销', 'Redo': '重做',
  'More': '更多', 'Less': '更少', 'Show more': '显示更多', 'Show less': '收起',
  'View': '查看', 'Preview': '预览', 'Details': '详情', 'Overview': '概览',
  'Help': '帮助', 'About': '关于', 'Version': '版本', 'License': '许可证',
  'Terms': '条款', 'Privacy': '隐私', 'Contact': '联系我们',
  'Dashboard': '仪表板', 'Inbox': '收件箱', 'Tasks': '任务', 'Projects': '项目',
  'Goals': '目标', 'Agents': '代理', 'Costs': '成本', 'Activity': '活动',
  'Routines': '例程', 'Approvals': '审批', 'Artifacts': '产物', 'Secrets': '密钥',
  'Plugins': '插件', 'Adapters': '适配器', 'Members': '成员', 'Roles': '角色',
  'Permissions': '权限', 'Environments': '环境', 'Variables': '变量',
  'Notifications': '通知', 'Logs': '日志', 'History': '历史', 'Reports': '报告',
  'Analytics': '分析', 'Metrics': '指标', 'Resources': '资源', 'Quotas': '配额',
  'Limits': '限制', 'Usage': '使用量', 'Billing': '账单', 'Plans': '计划',
  'Integrations': '集成', 'Webhooks': 'Webhooks', 'API': 'API', 'Tokens': '令牌',
  'Keys': '密钥', 'Credentials': '凭据', 'Configuration': '配置', 'Setup': '设置',
  'Installation': '安装', 'Uninstallation': '卸载', 'Update': '更新', 'Upgrade': '升级',
  'Migration': '迁移', 'Backup': '备份', 'Restore': '恢复', 'Sync': '同步',
  'Deploy': '部署', 'Release': '发布', 'Build': '构建', 'Test': '测试',
  'Debug': '调试', 'Profile': '配置文件', 'Monitor': '监控', 'Alert': '告警',
  'Incident': '事件', 'Outage': '中断', 'Maintenance': '维护',
  'Monday': '周一', 'Tuesday': '周二', 'Wednesday': '周三', 'Thursday': '周四',
  'Friday': '周五', 'Saturday': '周六', 'Sunday': '周日',
  'January': '一月', 'February': '二月', 'March': '三月', 'April': '四月',
  'May': '五月', 'June': '六月', 'July': '七月', 'August': '八月',
  'September': '九月', 'October': '十月', 'November': '十一月', 'December': '十二月',
};

// Apply translations for exact matches
let applied = 0;
for (const key of untranslated) {
  const enValue = getKey(en, key);
  if (typeof enValue === 'string' && translations[enValue]) {
    setKey(zh, key, translations[enValue]);
    applied++;
  }
}
console.log('Applied exact matches:', applied);

// Now handle keys with interpolation patterns like {{variable}}
// These need to be translated while preserving the interpolation
function translateWithInterpolation(enValue) {
  if (typeof enValue !== 'string') return null;

  // Extract the template parts
  const parts = [];
  let remaining = enValue;
  const regex = /\{\{(\w+)\}\}/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(enValue)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: enValue.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'var', value: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < enValue.length) {
    parts.push({ type: 'text', value: enValue.slice(lastIndex) });
  }

  return parts;
}

// Common interpolation patterns
const interpolationMap = {
  '{{count}}': '{{count}}',
  '{{name}}': '{{name}}',
  '{{title}}': '{{title}}',
  '{{type}}': '{{type}}',
  '{{status}}': '{{status}}',
  '{{error}}': '{{error}}',
  '{{date}}': '{{date}}',
  '{{time}}': '{{time}}',
  '{{version}}': '{{version}}',
  '{{total}}': '{{total}}',
  '{{current}}': '{{current}}',
  '{{remaining}}': '{{remaining}}',
  '{{percentage}}': '{{percentage}}',
  '{{amount}}': '{{amount}}',
  '{{limit}}': '{{limit}}',
  '{{provider}}': '{{provider}}',
  '{{user}}': '{{user}}',
  '{{email}}': '{{email}}',
  '{{role}}': '{{role}}',
  '{{company}}': '{{company}}',
  '{{project}}': '{{project}}',
  '{{agent}}': '{{agent}}',
  '{{issue}}': '{{issue}}',
  '{{routine}}': '{{routine}}',
  '{{secret}}': '{{secret}}',
  '{{plugin}}': '{{plugin}}',
  '{{adapter}}': '{{adapter}}',
  '{{elapsed}}': '{{elapsed}}',
  '{{duration}}': '{{duration}}',
  '{{id}}': '{{id}}',
  '{{key}}': '{{key}}',
  '{{value}}': '{{value}}',
  '{{path}}': '{{path}}',
  '{{url}}': '{{url}}',
  '{{message}}': '{{message}}',
  '{{reason}}': '{{reason}}',
  '{{details}}': '{{details}}',
  '{{summary}}': '{{summary}}',
  '{{description}}': '{{description}}',
  '{{label}}': '{{label}}',
  '{{tag}}': '{{tag}}',
  '{{field}}': '{{field}}',
  '{{index}}': '{{index}}',
  '{{number}}': '{{number}}',
  '{{size}}': '{{size}}',
  '{{length}}': '{{length}}',
  '{{width}}': '{{width}}',
  '{{height}}': '{{height}}',
  '{{depth}}': '{{depth}}',
  '{{level}}': '{{level}}',
  '{{rank}}': '{{rank}}',
  '{{score}}': '{{score}}',
  '{{rating}}': '{{rating}}',
  '{{rank}}': '{{rank}}',
  '{{min}}': '{{min}}',
  '{{max}}': '{{max}}',
  '{{avg}}': '{{avg}}',
  '{{sum}}': '{{sum}}',
  '{{first}}': '{{first}}',
  '{{last}}': '{{last}}',
  '{{next}}': '{{next}}',
  '{{prev}}': '{{prev}}',
  '{{parent}}': '{{parent}}',
  '{{child}}': '{{child}}',
  '{{sibling}}': '{{sibling}}',
  '{{ancestor}}': '{{ancestor}}',
  '{{descendant}}': '{{descendant}}',
  '{{root}}': '{{root}}',
  '{{leaf}}': '{{leaf}}',
  '{{node}}': '{{node}}',
  '{{edge}}': '{{edge}}',
  '{{vertex}}': '{{vertex}}',
  '{{graph}}': '{{graph}}',
  '{{tree}}': '{{tree}}',
  '{{list}}': '{{list}}',
  '{{set}}': '{{set}}',
  '{{map}}': '{{map}}',
  '{{queue}}': '{{queue}}',
  '{{stack}}': '{{stack}}',
  '{{heap}}': '{{heap}}',
  '{{table}}': '{{table}}',
  '{{row}}': '{{row}}',
  '{{column}}': '{{column}}',
  '{{cell}}': '{{cell}}',
  '{{page}}': '{{page}}',
  '{{section}}': '{{section}}',
  '{{chapter}}': '{{chapter}}',
  '{{volume}}': '{{volume}}',
  '{{issue}}': '{{issue}}',
  '{{number}}': '{{number}}',
  '{{year}}': '{{year}}',
  '{{month}}': '{{month}}',
  '{{day}}': '{{day}}',
  '{{hour}}': '{{hour}}',
  '{{minute}}': '{{minute}}',
  '{{second}}': '{{second}}',
  '{{millisecond}}': '{{millisecond}}',
  '{{microsecond}}': '{{microsecond}}',
  '{{nanosecond}}': '{{nanosecond}}',
};

// For remaining untranslated keys, try to generate reasonable translations
// by translating the text parts while preserving interpolation variables
let remaining = getUntranslatedKeys(en, zh);
console.log('Remaining after exact matches:', remaining.length);

// Auto-translate remaining keys by pattern matching
const autoTranslations = {};
for (const key of remaining) {
  const enValue = getKey(en, key);
  if (typeof enValue !== 'string') continue;

  // Skip very short strings (likely abbreviations or codes)
  if (enValue.length <= 2) continue;

  // Skip strings that are all uppercase (likely constants)
  if (enValue === enValue.toUpperCase() && !enValue.includes(' ')) continue;

  // Skip strings that look like URLs, paths, or technical identifiers
  if (enValue.startsWith('http') || enValue.startsWith('/') || enValue.startsWith('urn:')) continue;
  if (/^[a-z]+\.[a-z]+\.[a-z]+/.test(enValue)) continue;

  // For strings with interpolation, preserve the variables
  if (enValue.includes('{{')) {
    // Keep as-is for now - these are harder to auto-translate
    continue;
  }

  // For simple strings, use the dictionary if available
  if (translations[enValue]) {
    autoTranslations[key] = translations[enValue];
  }
}

// Apply auto translations
for (const [key, value] of Object.entries(autoTranslations)) {
  setKey(zh, key, value);
}

// For all remaining untranslated keys, set them to the English value as fallback
// This ensures zh-CN.json has all keys (required by validation)
remaining = getUntranslatedKeys(en, zh);
let fallbackApplied = 0;
for (const key of remaining) {
  const enValue = getKey(en, key);
  if (typeof enValue === 'string') {
    setKey(zh, key, enValue);
    fallbackApplied++;
  }
}
console.log('Fallback applied:', fallbackApplied);

// Write updated zh-CN.json
fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');

// Final count
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
console.log('\nFinal stats:');
console.log('en.json keys:', countKeys(en));
console.log('zh-CN translated:', countTranslated(en, zh));
console.log('Progress:', Math.round(countTranslated(en, zh) / countKeys(en) * 100) + '%');
