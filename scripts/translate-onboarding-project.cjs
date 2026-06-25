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

// onboarding
const ob = {
  'welcome': '欢迎使用 Paperclip', 'getStarted': '开始使用', 'setupAgent': '设置代理',
  'chooseAdapter': '选择适配器', 'configureEnvironment': '配置环境',
  'testConnection': '测试连接', 'connectionSuccess': '连接成功',
  'connectionFailed': '连接失败', 'next': '下一步', 'back': '返回', 'skip': '跳过',
  'finish': '完成', 'loading': '加载中...', 'error': '出错了', 'retry': '重试',
  'missionPrompt': '任务提示', 'selectModel': '选择模型', 'apiKey': 'API 密钥',
  'apiKeyPlaceholder': '输入您的 API 密钥', 'baseUrl': '基础 URL',
  'baseUrlPlaceholder': '输入基础 URL（可选）', 'testing': '测试中...', 'test': '测试',
  'save': '保存', 'saved': '已保存', 'saveFailed': '保存失败', 'recommended': '推荐',
  'advanced': '高级', 'basic': '基础', 'required': '必填', 'optional': '可选',
  'adapterInstalled': '适配器已安装', 'adapterFailed': '适配器安装失败',
  'environmentConfigured': '环境已配置', 'environmentFailed': '环境配置失败',
  'connectionTestSuccess': '连接测试成功', 'connectionTestFailed': '连接测试失败',
  'setupComplete': '设置完成', 'setupFailed': '设置失败',
  'goToDashboard': '前往仪表板', 'goToSettings': '前往设置',
  'learnMore': '了解更多', 'documentation': '文档', 'support': '支持',
  'feedback': '反馈', 'reportIssue': '报告问题',
  'termsOfService': '服务条款', 'privacyPolicy': '隐私政策',
  'iAgree': '我同意', 'iDisagree': '我不同意',
  'mustAgree': '必须同意条款才能继续',
  'selectProvider': '选择提供商', 'providerDescription': '选择您的 AI 提供商。',
  'enterCredentials': '输入凭据', 'credentialDescription': '输入您的 API 凭据。',
  'verifySetup': '验证设置', 'verifyDescription': '验证您的设置是否正确。',
  'success': '设置完成', 'successDescription': '您的环境已准备就绪。',
  'modelName': '模型名称', 'modelDescription': '选择要使用的模型。',
  'noModels': '无可用模型', 'searchModels': '搜索模型...',
  'customModel': '自定义模型', 'customModelPlaceholder': '输入模型名称...',
  'temperature': '温度', 'temperatureDescription': '控制输出的随机性。',
  'maxTokens': '最大令牌数', 'maxTokensDescription': '设置生成的最大令牌数。',
  'topP': 'Top P', 'topPDescription': '控制核采样的概率阈值。',
  'frequencyPenalty': '频率惩罚', 'frequencyPenaltyDescription': '降低重复词汇的概率。',
  'presencePenalty': '存在惩罚', 'presencePenaltyDescription': '增加新词汇的概率。',
  'stopSequences': '停止序列', 'stopSequencesDescription': '设置生成停止的序列。',
  'systemPrompt': '系统提示', 'systemPromptDescription': '设置代理的系统提示。',
  'systemPromptPlaceholder': '输入系统提示...',
  'agentName': '代理名称', 'agentNamePlaceholder': '输入代理名称...',
  'agentDescription': '代理描述', 'agentDescriptionPlaceholder': '输入代理描述...',
  'createAgent': '创建代理', 'creatingAgent': '创建代理中...',
  'agentCreated': '代理已创建', 'agentFailed': '创建代理失败',
};

for (const [k, v] of Object.entries(ob)) s(zh, 'onboarding.' + k, v);

// onboardingClassic
const oc = {
  'title': '入门设置', 'subtitle': '让我们帮您设置环境。',
  'step1': '步骤 1：选择提供商', 'step2': '步骤 2：输入凭据',
  'step3': '步骤 3：验证设置', 'step4': '步骤 4：完成',
  'selectProvider': '选择提供商', 'enterCredentials': '输入凭据',
  'verifySetup': '验证设置', 'success': '设置完成',
  'successDescription': '您的环境已准备就绪。', 'goToDashboard': '前往仪表板',
  'next': '下一步', 'back': '返回', 'skip': '跳过', 'finish': '完成',
  'loading': '加载中...', 'error': '出错了', 'retry': '重试',
  'save': '保存', 'saved': '已保存', 'saveFailed': '保存失败',
  'test': '测试', 'testing': '测试中...', 'testSuccess': '测试成功',
  'testFailed': '测试失败', 'apiKey': 'API 密钥',
  'apiKeyPlaceholder': '输入您的 API 密钥', 'baseUrl': '基础 URL',
  'baseUrlPlaceholder': '输入基础 URL（可选）', 'selectModel': '选择模型',
  'noModels': '无可用模型', 'recommended': '推荐', 'optional': '可选',
  'required': '必填', 'errors.apiKeyRequired': 'API 密钥必填',
  'errors.modelRequired': '请选择模型', 'errors.connectionFailed': '连接失败',
  'errors.invalidApiKey': 'API 密钥无效', 'errors.invalidBaseUrl': '基础 URL 无效',
  'errors.timeout': '连接超时', 'errors.unknown': '未知错误', 'errors.retry': '重试',
  'tabs.model': '模型', 'tabs.environment': '环境', 'tabs.advanced': '高级',
  'footer.poweredBy': '由 Paperclip 驱动', 'footer.privacy': '隐私政策',
  'footer.terms': '服务条款', 'adapterResult.title': '适配器结果',
  'adapterResult.success': '配置成功', 'adapterResult.failed': '配置失败',
  'adapterResult.details': '详情', 'adapterResult.retry': '重试',
};

for (const [k, v] of Object.entries(oc)) s(zh, 'onboardingClassic.' + k, v);

// onboardingChat
const oca = {
  'title': '开始对话', 'subtitle': '让我帮您设置。',
  'placeholder': '输入您的需求...', 'send': '发送', 'thinking': '思考中...',
  'error': '出错了', 'retry': '重试', 'skip': '跳过', 'done': '完成',
  'welcomeMessage.title': '欢迎', 'welcomeMessage.subtitle': '让我帮您开始。',
  'welcomeMessage.getStarted': '开始使用', 'welcomeMessage.learnMore': '了解更多',
  'welcomeMessage.skip': '跳过设置', 'welcomeMessage.or': '或',
  'welcomeMessage.importSettings': '导入设置',
  'welcomeMessage.description': '告诉我您想做什么，我会帮您设置。',
};

for (const [k, v] of Object.entries(oca)) s(zh, 'onboardingChat.' + k, v);

// project
const pj = {
  'title': '项目', 'noProjects': '暂无项目', 'create': '创建项目',
  'name': '名称', 'description': '描述', 'status': '状态', 'priority': '优先级',
  'owner': '所有者', 'members': '成员', 'labels': '标签',
  'createdAt': '创建时间', 'updatedAt': '更新时间', 'loading': '加载中...',
  'error': '加载失败', 'retry': '重试', 'edit': '编辑', 'delete': '删除',
  'deleteConfirm': '确定要删除此项目吗？', 'archive': '归档', 'unarchive': '取消归档',
  'search': '搜索项目', 'filter': '筛选', 'sort': '排序', 'view': '视图',
  'details': '详情', 'settings': '设置', 'issues': '问题', 'workspaces': '工作区',
  'documents': '文档', 'activity': '活动', 'overview': '概览',
  'localFolder': '本地文件夹', 'repoUrl': '仓库 URL',
  'repoUrlError': '仓库 URL 无效', 'localFolderError': '本地文件夹路径无效',
  'statusBacklog': '待办', 'statusPlanned': '已计划', 'statusInProgress': '进行中',
  'statusCompleted': '已完成', 'statusCancelled': '已取消',
  'noDescription': '无描述', 'noOwner': '无所有者', 'noMembers': '无成员',
  'noLabels': '无标签', 'addMember': '添加成员', 'removeMember': '移除成员',
  'addLabel': '添加标签', 'removeLabel': '移除标签', 'setOwner': '设置所有者',
  'changeStatus': '更改状态', 'changePriority': '更改优先级',
  'dialog.newProject': '新建项目', 'dialog.projectNamePlaceholder': '项目名称',
  'dialog.addDescription': '添加描述...', 'dialog.repoUrl': '仓库 URL',
  'dialog.optional': '可选',
  'dialog.repoUrlTooltip': '关联 GitHub 仓库以便代理可以克隆、读取和推送代码。',
  'dialog.localFolder': '本地文件夹',
  'dialog.localFolderTooltip': '设置本机上的绝对路径，本地代理将在此读写项目文件。',
  'dialog.goal': '目标', 'dialog.addGoal': '+ 目标', 'dialog.noGoal': '无目标',
  'dialog.allGoalsSelected': '所有目标已选择。', 'dialog.targetDate': '目标日期',
  'dialog.failedToCreate': '创建项目失败。', 'dialog.creating': '创建中...',
  'dialog.createProject': '创建项目', 'dialog.removeGoal': '移除目标 {{title}}',
};

for (const [k, v] of Object.entries(pj)) s(zh, 'project.' + k, v);

// goal
const gl = {
  'title': '目标', 'noGoals': '暂无目标', 'create': '创建目标',
  'name': '名称', 'description': '描述', 'status': '状态', 'level': '级别',
  'parent': '父目标', 'children': '子目标', 'owner': '所有者',
  'createdAt': '创建时间', 'updatedAt': '更新时间', 'loading': '加载中...',
  'error': '加载失败', 'retry': '重试', 'edit': '编辑', 'delete': '删除',
  'deleteConfirm': '确定要删除此目标吗？', 'archive': '归档', 'unarchive': '取消归档',
  'search': '搜索目标', 'filter': '筛选', 'sort': '排序', 'view': '视图',
  'details': '详情', 'settings': '设置', 'issues': '问题', 'projects': '项目',
  'overview': '概览', 'noDescription': '无描述', 'noOwner': '无所有者',
  'noChildren': '无子目标', 'noParent': '无父目标',
  'addChild': '添加子目标', 'removeChild': '移除子目标',
  'setParent': '设置父目标', 'removeParent': '移除父目标',
  'changeStatus': '更改状态', 'changeLevel': '更改级别',
  'dialog.newGoal': '新建目标', 'dialog.newSubGoal': '新建子目标',
  'dialog.goalTitlePlaceholder': '目标标题', 'dialog.addDescription': '添加描述...',
  'dialog.levelCompany': '公司', 'dialog.levelTeam': '团队',
  'dialog.levelAgent': '代理', 'dialog.levelTask': '任务',
  'dialog.parentGoal': '父目标', 'dialog.noParent': '无父目标',
  'dialog.creating': '创建中...', 'dialog.createGoal': '创建目标',
  'dialog.createSubGoal': '创建子目标',
  'properties.status': '状态', 'properties.priority': '优先级',
  'properties.level': '级别', 'properties.owner': '所有者',
  'properties.parent': '父目标', 'properties.children': '子目标',
  'properties.createdAt': '创建时间', 'properties.updatedAt': '更新时间',
  'properties.loading': '加载中...', 'properties.error': '加载失败',
  'properties.save': '保存', 'properties.saved': '已保存',
  'properties.saveFailed': '保存失败', 'properties.cancel': '取消',
};

for (const [k, v] of Object.entries(gl)) s(zh, 'goal.' + k, v);

// workspace
const ws = {
  'title': '工作区', 'noWorkspaces': '暂无工作区', 'create': '创建工作区',
  'name': '名称', 'description': '描述', 'status': '状态', 'type': '类型',
  'project': '项目', 'agent': '代理', 'branch': '分支', 'path': '路径',
  'createdAt': '创建时间', 'updatedAt': '更新时间', 'loading': '加载中...',
  'error': '加载失败', 'retry': '重试', 'edit': '编辑', 'delete': '删除',
  'deleteConfirm': '确定要删除此工作区吗？', 'archive': '归档', 'unarchive': '取消归档',
  'search': '搜索工作区', 'filter': '筛选', 'sort': '排序', 'view': '视图',
  'details': '详情', 'settings': '设置', 'files': '文件', 'logs': '日志',
  'terminal': '终端', 'overview': '概览', 'noDescription': '无描述',
  'noProject': '无项目', 'noAgent': '无代理', 'noBranch': '无分支',
  'start': '启动', 'stop': '停止', 'restart': '重启', 'pause': '暂停',
  'resume': '恢复', 'running': '运行中', 'stopped': '已停止', 'paused': '已暂停',
  'error': '错误', 'pending': '待处理', 'creating': '创建中...',
  'open': '打开', 'close': '关闭', 'browse': '浏览', 'download': '下载',
  'upload': '上传', 'sync': '同步', 'clone': '克隆', 'pull': '拉取',
  'push': '推送', 'commit': '提交', 'merge': '合并', 'rebase': '变基',
};

for (const [k, v] of Object.entries(ws)) s(zh, 'workspace.' + k, v);

fs.writeFileSync(path.join(dir, 'zh-CN.json'), JSON.stringify(zh, null, 2) + '\n');
console.log('Applied onboarding, project, goal, workspace translations.');
