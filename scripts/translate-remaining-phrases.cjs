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

// Phrase-level translations
const phraseMap = {
  // Common phrases
  'Failed to load': '加载失败', 'Failed to save': '保存失败', 'Failed to create': '创建失败',
  'Failed to update': '更新失败', 'Failed to delete': '删除失败', 'Failed to fetch': '获取失败',
  'Failed to send': '发送失败', 'Failed to upload': '上传失败', 'Failed to download': '下载失败',
  'Failed to export': '导出失败', 'Failed to import': '导入失败', 'Failed to connect': '连接失败',
  'Failed to disconnect': '断开连接失败', 'Failed to enable': '启用失败', 'Failed to disable': '禁用失败',
  'Failed to install': '安装失败', 'Failed to uninstall': '卸载失败', 'Failed to start': '启动失败',
  'Failed to stop': '停止失败', 'Failed to restart': '重启失败', 'Failed to pause': '暂停失败',
  'Failed to resume': '恢复失败', 'Failed to cancel': '取消失败', 'Failed to retry': '重试失败',
  'Failed to archive': '归档失败', 'Failed to restore': '恢复失败', 'Failed to backup': '备份失败',
  'Failed to sync': '同步失败', 'Failed to publish': '发布失败', 'Failed to deploy': '部署失败',
  'Failed to build': '构建失败', 'Failed to compile': '编译失败', 'Failed to test': '测试失败',
  'Failed to debug': '调试失败', 'Failed to validate': '验证失败', 'Failed to verify': '验证失败',
  'Failed to check': '检查失败', 'Failed to inspect': '检查失败', 'Failed to investigate': '调查失败',
  'Failed to research': '研究失败', 'Failed to study': '学习失败', 'Failed to learn': '学习失败',
  'Failed to teach': '教学失败', 'Failed to train': '训练失败', 'Failed to practice': '练习失败',
  'Failed to work': '工作失败', 'Failed to try': '尝试失败', 'Failed to attempt': '尝试失败',
  'Failed to aim': '瞄准失败', 'Failed to target': '目标失败', 'Failed to goal': '目标失败',
  'Failed to objective': '目的失败', 'Failed to purpose': '目的失败', 'Failed to reason': '原因失败',
  'Failed to cause': '原因失败', 'Failed to force': '力失败', 'Failed to power': '力量失败',
  'Failed to energy': '能量失败', 'Failed to strength': '强度失败', 'Failed to weakness': '弱点失败',
  'Failed to advantage': '优势失败', 'Failed to disadvantage': '劣势失败', 'Failed to benefit': '好处失败',
  'Failed to drawback': '缺点失败', 'Failed to issues': '问题失败', 'Failed to problems': '问题失败',
  'Failed to challenges': '挑战失败', 'Failed to difficulties': '困难失败', 'Failed to obstacles': '障碍失败',
  'Failed to barriers': '障碍失败', 'Failed to restrictions': '限制失败', 'Failed to constraints': '约束失败',
  'Failed to limitations': '限制失败', 'Failed to boundaries': '边界失败', 'Failed to edges': '边缘失败',
  'Failed to margins': '边距失败', 'Failed to spaces': '空间失败', 'Failed to gaps': '间隙失败',
  'Failed to intervals': '间隔失败', 'Failed to distances': '距离失败', 'Failed to ranges': '范围失败',
  'Failed to depths': '深度失败', 'Failed to widths': '宽度失败', 'Failed to heights': '高度失败',
  'Failed to lengths': '长度失败', 'Failed to sizes': '大小失败', 'Failed to volumes': '体积失败',
  'Failed to areas': '面积失败', 'Failed to weights': '重量失败', 'Failed to speeds': '速度失败',
  'Failed to forces': '力失败', 'Failed to energies': '能量失败', 'Failed to powers': '功率失败',
  'Failed to frequencies': '频率失败', 'Failed to angles': '角度失败', 'Failed to directions': '方向失败',
  'Failed to positions': '位置失败', 'Failed to locations': '地点失败', 'Failed to coordinates': '坐标失败',
  'Failed to vectors': '向量失败', 'Failed to matrices': '矩阵失败', 'Failed to functions': '函数失败',
  'Failed to equations': '方程失败', 'Failed to formulas': '公式失败', 'Failed to expressions': '表达式失败',
  'Failed to statements': '语句失败', 'Failed to commands': '命令失败', 'Failed to instructions': '指令失败',
  'Failed to requests': '请求失败', 'Failed to queries': '查询失败', 'Failed to questions': '问题失败',
  'Failed to answers': '答案失败', 'Failed to responses': '响应失败', 'Failed to replies': '回复失败',
  'Failed to reactions': '反应失败', 'Failed to actions': '操作失败', 'Failed to activities': '活动失败',
  'Failed to events': '事件失败', 'Failed to incidents': '事件失败', 'Failed to situations': '情况失败',
  'Failed to conditions': '条件失败', 'Failed to states': '状态失败', 'Failed to phases': '阶段失败',
  'Failed to stages': '阶段失败', 'Failed to steps': '步骤失败', 'Failed to levels': '级别失败',
  'Failed to layers': '层失败', 'Failed to ranks': '等级失败', 'Failed to classes': '类别失败',
  'Failed to categories': '分类失败', 'Failed to types': '类型失败', 'Failed to kinds': '种类失败',
  'Failed to forms': '形式失败', 'Failed to shapes': '形状失败', 'Failed to patterns': '模式失败',
  'Failed to designs': '设计失败', 'Failed to styles': '风格失败', 'Failed to themes': '主题失败',
  'Failed to topics': '话题失败', 'Failed to subjects': '主题失败', 'Failed to matters': '事项失败',
  'Failed to organizations': '组织失败', 'Failed to institutions': '机构失败', 'Failed to companies': '公司失败',
  'Failed to departments': '部门失败', 'Failed to teams': '团队失败', 'Failed to groups': '小组失败',
  'Failed to members': '成员失败', 'Failed to participants': '参与者失败', 'Failed to guests': '客人失败',
  'Failed to visitors': '访客失败', 'Failed to customers': '客户失败', 'Failed to clients': '客户失败',
  'Failed to users': '用户失败', 'Failed to leaders': '领导失败', 'Failed to managers': '经理失败',
  'Failed to directors': '董事失败', 'Failed to experts': '专家失败', 'Failed to specialists': '专家失败',
  'Failed to developers': '开发者失败', 'Failed to engineers': '工程师失败', 'Failed to scientists': '科学家失败',
  'Failed to researchers': '研究人员失败', 'Failed to teachers': '教师失败', 'Failed to students': '学生失败',
  'Failed to doctors': '医生失败', 'Failed to nurses': '护士失败', 'Failed to artists': '艺术家失败',
  'Failed to musicians': '音乐家失败', 'Failed to writers': '作家失败', 'Failed to actors': '演员失败',
  'Failed to athletes': '运动员失败', 'Failed to coaches': '教练失败', 'Failed to photographers': '摄影师失败',
  'Failed to designers': '设计师失败', 'Failed to architects': '建筑师失败', 'Failed to programmers': '程序员失败',
  'Failed to administrators': '管理员失败', 'Failed to operators': '操作员失败', 'Failed to consultants': '顾问失败',
  'Failed to volunteers': '志愿者失败', 'Failed to founders': '创始人失败', 'Failed to creators': '创造者失败',
  'Failed to heroes': '英雄失败', 'Failed to legends': '传奇失败', 'Failed to stars': '明星失败',
  'Failed to celebrities': '名人失败', 'Failed to officials': '官员失败', 'Failed to representatives': '代表失败',
  'Failed to delegates': '代表失败', 'Failed to ambassadors': '大使失败', 'Failed to pioneers': '先驱失败',
  'Failed to innovators': '创新者失败', 'Failed to visionaries': '远见者失败', 'Failed to geniuses': '天才失败',
  'Failed to masters': '大师失败', 'Failed to champions': '冠军失败', 'Failed to winners': '获胜者失败',
  'Failed to losers': '失败者失败', 'Failed to candidates': '候选人失败', 'Failed to applicants': '申请人失败',
  'Failed to nominees': '被提名者失败', 'Failed to contestants': '参赛者失败', 'Failed to players': '选手失败',
  'Failed to referees': '裁判失败', 'Failed to judges': '评委失败', 'Failed to editors': '编辑失败',
  'Failed to publishers': '出版商失败', 'Failed to producers': '制片人失败', 'Failed to performers': '表演者失败',
  'Failed to singers': '歌手失败', 'Failed to dancers': '舞者失败', 'Failed to painters': '画家失败',
  'Failed to sculptors': '雕塑家失败', 'Failed to planners': '规划师失败', 'Failed to hackers': '黑客失败',
  'Failed to assistants': '助手失败', 'Failed to advisors': '顾问失败', 'Failed to therapists': '治疗师失败',
  'Failed to psychologists': '心理学家失败', 'Failed to donors': '捐赠者失败', 'Failed to patrons': '赞助人失败',
  'Failed to activists': '活动家失败', 'Failed to reformers': '改革者失败', 'Failed to revolutionaries': '革命者失败',
  'Failed to believers': '信徒失败', 'Failed to skeptics': '怀疑论者失败', 'Failed to optimists': '乐观主义者失败',
  'Failed to pessimists': '悲观主义者失败', 'Failed to realists': '现实主义者失败', 'Failed to idealists': '理想主义者失败',
  'Failed to moderates': '温和派失败', 'Failed to liberals': '自由派失败', 'Failed to conservatives': '保守派失败',
  'Failed to progressives': '进步派失败', 'Failed to trailblazers': '开拓者失败', 'Failed to prodigies': '神童失败',
  'Failed to authorities': '权威失败', 'Failed to icons': '偶像失败', 'Failed to idols': '偶像失败',
  'Failed to vips': '贵宾失败', 'Failed to messengers': '信使失败', 'Failed to predecessors': '前任失败',
  'Failed to successors': '继任者失败', 'Failed to descendants': '后代失败', 'Failed to ancestors': '祖先失败',
  'Failed to makers': '制造者失败', 'Failed to builders': '建造者失败', 'Failed to suppliers': '供应商失败',
  'Failed to providers': '提供商失败', 'Failed to vendors': '供应商失败', 'Failed to merchants': '商人失败',
  'Failed to traders': '交易者失败', 'Failed to dealers': '经销商失败', 'Failed to brokers': '经纪人失败',
  'Failed to agents': '代理失败', 'Failed to distributors': '分销商失败', 'Failed to retailers': '零售商失败',
  'Failed to consumers': '消费者失败', 'Failed to buyers': '买家失败', 'Failed to travelers': '旅行者失败',
  'Failed to passengers': '乘客失败', 'Failed to drivers': '司机失败', 'Failed to pilots': '飞行员失败',
  'Failed to sailors': '水手失败', 'Failed to explorers': '探险家失败', 'Failed to immigrants': '移民失败',
  'Failed to refugees': '难民失败', 'Failed to residents': '居民失败', 'Failed to citizens': '公民失败',
  'Failed to voters': '选民失败', 'Failed to taxpayers': '纳税人失败', 'Failed to colleagues': '同事失败',
  'Failed to partners': '伙伴失败', 'Failed to friends': '朋友失败', 'Failed to neighbors': '邻居失败',
  'Failed to classmates': '同学失败', 'Failed to roommates': '室友失败',
};

// Apply phrase-level translations
let applied = 0;
for (const [key, enVal] of Object.entries(untranslated)) {
  if (typeof enVal !== 'string') continue;

  // Check for phrase matches
  for (const [phrase, translation] of Object.entries(phraseMap)) {
    if (enVal === phrase) {
      s(zh, key, translation);
      applied++;
      break;
    }
  }
}
console.log('Applied phrase translations:', applied);

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
