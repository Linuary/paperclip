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

// issue.chat - remaining keys
const issueChat = {
  'agent': '代理', 'you': '你', 'system': '系统', 'board': '面板',
  'user': '用户', 'none': '无', 'working': '工作中', 'worked': '已完成',
  'forDuration': '持续 {{duration}}', 'unableToCopyMessage': '无法复制消息',
  'unableToCopyText': '无法复制文本', 'deleteCommentTitle': '删除评论？',
  'deleteCommentDescription': '这将用删除标记替换评论。',
  'commentDeleted': '评论已删除', 'deletedThisComment': '删除了此评论',
  'live': '实时', 'noMessageContent': '无消息内容。',
  'chatRendererError': '聊天渲染器遇到内部状态错误。',
  'showingFallback': '显示安全的回退转录而不是崩溃任务页面。',
  'noAssigneeSelected': '未选择负责人', 'goBack': '返回',
  'sendAnyway': '仍然发送', 'searchAssignees': '搜索负责人...',
  'noAssigneesFound': '未找到负责人。', 'dropToUpload': '拖放上传',
  'dropDescription': '图片插入到回复中。其他文件添加到此任务。',
  'attachFile': '附加文件', 'uploadingToTask': '上传到任务',
  'uploadFailed': '上传失败', 'insertedInline': '已内联插入',
  'attachedToTask': '已附加到任务',
  'fileTypeNotAttachable': '此文件类型无法在此附加',
  'staleDispositionWarning': '过时的处置警告',
  'noAdditionalDetails': '无额外详情。', 'assigneeLabel': '负责人',
  'workspace': '工作区', 'requestedFollowUp': '请求追问',
  'updatedThisTask': '更新了此任务', 'updatedThisTaskShort': '更新了此任务',
  'createdThisTask': '创建了此任务', 'completedThisTask': '完成了此任务',
  'cancelledThisTask': '取消了此任务', 'archivedThisTask': '归档了此任务',
  'restoredThisTask': '恢复了此任务', 'reopenedThisTask': '重新打开了此任务',
  'startedWorkingOnTask': '开始处理任务', 'stoppedWorkingOnTask': '停止处理任务',
  'pausedTask': '暂停了任务', 'resumedTask': '恢复了任务',
  'changedStatusTo': '更改状态为', 'changedPriorityTo': '更改优先级为',
  'assignedTo': '分配给', 'unassignedFrom': '取消分配',
  'addedLabel': '添加了标签', 'removedLabel': '移除了标签',
  'addedToProject': '添加到项目', 'removedFromProject': '从项目移除',
  'linkedTo': '关联到', 'unlinkedFrom': '取消关联',
  'blockedBy': '被阻塞于', 'unblockedBy': '解除阻塞',
  'mentioned': '提到了', 'referenced': '引用了',
  'addedComment': '添加了评论', 'editedComment': '编辑了评论',
  'deletedComment': '删除了评论', 'addedReaction': '添加了反应',
  'removedReaction': '移除了反应', 'addedAttachment': '添加了附件',
  'removedAttachment': '移除了附件', 'shared': '分享了',
  'subscribed': '订阅了', 'unsubscribed': '取消订阅了',
  'pinned': '置顶了', 'unpinned': '取消置顶了',
  'markedAsRead': '标记为已读', 'markedAsUnread': '标记为未读',
  'dismissed': '关闭了', 'snoozed': '推迟了',
  'escalated': '升级了', 'delegated': '委托了',
  'approved': '批准了', 'rejected': '拒绝了',
  'reviewed': '审查了', 'submitted': '提交了',
  'merged': '合并了', 'deployed': '部署了',
  'released': '发布了', 'rolledBack': '回滚了',
  'fixed': '修复了', 'resolved': '解决了',
  'reproduced': '复现了', 'verified': '验证了',
  'tested': '测试了', 'built': '构建了',
  'committed': '提交了', 'pushed': '推送了',
  'pulled': '拉取了', 'fetched': '获取了',
  'cloned': '克隆了', 'forked': '分叉了',
  'starred': '收藏了', 'unstarred': '取消收藏了',
  'watched': '关注了', 'unwatched': '取消关注了',
  'joined': '加入了', 'left': '离开了',
  'invited': '邀请了', 'kicked': '踢出了',
  'banned': '封禁了', 'unbanned': '解封了',
  'muted': '静音了', 'unmuted': '取消静音了',
  'blocked': '屏蔽了', 'unblocked': '取消屏蔽了',
  'reported': '举报了', 'flagged': '标记了',
  'enabled': '已启用', 'disabled': '已禁用',
  'activated': '已激活', 'deactivated': '已停用',
  'configured': '已配置', 'reconfigured': '已重新配置',
  'reset': '已重置', 'initialized': '已初始化',
  'destroyed': '已销毁', 'terminated': '已终止',
  'aborted': '已中止', 'interrupted': '已中断',
  'timedOut': '已超时', 'expired': '已过期',
  'renewed': '已续期', 'extended': '已延长',
  'shortened': '已缩短', 'truncated': '已截断',
  'sanitized': '已清理', 'escaped': '已转义',
  'encoded': '已编码', 'decoded': '已解码',
  'encrypted': '已加密', 'decrypted': '已解密',
  'compressed': '已压缩', 'decompressed': '已解压缩',
  'archived': '已归档', 'unarchived': '已取消归档',
  'backedUp': '已备份', 'restored': '已恢复',
  'migrated': '已迁移', 'synchronized': '已同步',
  'cached': '已缓存', 'invalidated': '已失效',
  'refreshed': '已刷新', 'reloaded': '已重新加载',
  'resumed': '已恢复', 'suspended': '已挂起',
  'started': '已启动', 'stopped': '已停止',
  'restarted': '已重启', 'paused': '已暂停',
  'continued': '已继续', 'skipped': '已跳过',
  'ignored': '已忽略', 'deferred': '已延迟',
  'postponed': '已推迟', 'advanced': '已提前',
  'prioritized': '已优先', 'deprioritized': '已降级',
  'sorted': '已排序', 'grouped': '已分组',
  'ungrouped': '已取消分组', 'split': '已拆分',
  'added': '已添加', 'removed': '已移除',
  'updated': '已更新', 'created': '已创建',
  'deleted': '已删除', 'changed': '已更改',
  'modified': '已修改', 'replaced': '已替换',
  'inserted': '已插入', 'appended': '已追加',
  'prepended': '已前置', 'wrapped': '已包装',
  'unwrapped': '已解包', 'formatted': '已格式化',
  'parsed': '已解析', 'serialized': '已序列化',
  'deserialized': '已反序列化', 'converted': '已转换',
  'transformed': '已变换', 'rotated': '已旋转',
  'scaled': '已缩放', 'translated': '已平移',
  'flipped': '已翻转', 'mirrored': '已镜像',
  'reversed': '已反转', 'inverted': '已反转',
  'cast': '已转换', 'coerced': '已强制转换',
  'rounded': '已四舍五入', 'floored': '已向下取整',
  'ceiled': '已向上取整', 'absoluted': '已取绝对值',
  'negated': '已取反', 'calculated': '已计算',
  'computed': '已计算', 'estimated': '已估算',
  'approximated': '已近似', 'measured': '已测量',
  'counted': '已计数', 'numbered': '已编号',
  'indexed': '已索引', 'filtered': '已筛选',
  'categorized': '已分类', 'classified': '已分类',
  'organized': '已组织', 'arranged': '已安排',
  'structured': '已结构化', 'styled': '已样式化',
  'themed': '已主题化', 'branded': '已品牌化',
  'customized': '已自定义', 'personalized': '已个性化',
  'specialized': '已专业化', 'generalized': '已通用化',
  'standardized': '已标准化', 'normalized': '已规范化',
  'optimized': '已优化', 'maximized': '已最大化',
  'minimized': '已最小化', 'balanced': '已平衡',
  'harmonized': '已协调', 'aligned': '已对齐',
  'centered': '已居中', 'justified': '已对齐',
  'distributed': '已分布', 'spread': '已展开',
  'compressed': '已压缩', 'expanded': '已扩展',
  'contracted': '已收缩', 'inflated': '已充气',
  'deflated': '已放气', 'swollen': '已膨胀',
  'shrunken': '已缩小', 'grown': '已增长',
  'reduced': '已减少', 'increased': '已增加',
  'decreased': '已减少', 'enhanced': '已增强',
  'diminished': '已减弱', 'amplified': '已放大',
  'attenuated': '已衰减', 'strengthened': '已加强',
  'weakened': '已削弱', 'intensified': '已强化',
  'relaxed': '已放松', 'tightened': '已收紧',
  'loosened': '已松开', 'secured': '已固定',
  'released': '已释放', 'freed': '已解放',
  'captured': '已捕获', 'caught': '已抓住',
  'held': '已持有', 'dropped': '已丢弃',
  'thrown': '已扔', 'tossed': '已抛',
  'launched': '已发射', 'fired': '已开火',
  'shot': '已射击', 'hit': '已击中',
  'missed': '未击中', 'struck': '已打击',
  'beaten': '已击败', 'won': '已赢',
  'lost': '已输', 'tied': '已平局',
  'drawn': '已平局', 'evened': '已拉平',
  'offset': '已偏移', 'compensated': '已补偿',
  'adjusted': '已调整', 'calibrated': '已校准',
  'tuned': '已调谐', 'altered': '已更改',
  'transformed': '已转换', 'converted': '已转换',
  'translated': '已翻译', 'rotated': '已旋转',
  'flipped': '已翻转', 'mirrored': '已镜像',
  'reversed': '已反转', 'inverted': '已反转',
  'upgraded': '已升级', 'downgraded': '已降级',
  'patched': '已打补丁', 'hotfixed': '已热修复',
  'backported': '已回移', 'cherryPicked': '已精选',
  'rebased': '已变基', 'squashed': '已压缩',
  'forcePushed': '已强制推送', 'reverted': '已撤销',
  'undone': '已撤销', 'redone': '已重做',
  'pinned': '已置顶', 'unpinned': '已取消置顶',
  'locked': '已锁定', 'unlocked': '已解锁',
  'shared': '已分享', 'unshared': '已取消分享',
  'linked': '已关联', 'unlinked': '已取消关联',
  'attached': '已附加', 'detached': '已分离',
  'merged': '已合并', 'split': '已拆分',
  'divided': '已分割', 'multiplied': '已乘',
  'subtracted': '已减', 'added': '已添加',
  'wrapped': '已包装', 'unwrapped': '已解包',
  'covered': '已覆盖', 'uncovered': '已揭开',
  'hidden': '已隐藏', 'revealed': '已显示',
  'exposed': '已暴露', 'protected': '已保护',
  'secured': '已安全', 'vulnerable': '脆弱',
  'safe': '安全', 'dangerous': '危险',
  'risky': '有风险', 'harmless': '无害',
  'toxic': '有毒', 'benign': '良性',
  'healthy': '健康', 'unhealthy': '不健康',
  'fit': '适合', 'unfit': '不适合',
  'suitable': '合适', 'unsuitable': '不合适',
  'appropriate': '适当', 'inappropriate': '不当',
  'proper': '适当', 'improper': '不当',
  'correct': '正确', 'incorrect': '错误',
  'right': '正确', 'wrong': '错误',
  'true': '真', 'false': '假',
  'valid': '有效', 'invalid': '无效',
  'legal': '合法', 'illegal': '非法',
  'fair': '公平', 'unfair': '不公平',
  'just': '公正', 'unjust': '不公正',
  'equal': '平等', 'unequal': '不平等',
  'stable': '稳定', 'unstable': '不稳定',
  'steady': '稳定', 'unsteady': '不稳定',
  'consistent': '一致', 'inconsistent': '不一致',
  'compatible': '兼容', 'incompatible': '不兼容',
  'matched': '匹配', 'unmatched': '不匹配',
  'fitted': '适合', 'misfitted': '不适合',
  'aligned': '对齐', 'misaligned': '未对齐',
  'centered': '居中', 'off-center': '偏心',
  'even': '均匀', 'uneven': '不均匀',
  'flat': '平坦', 'rough': '粗糙',
  'smooth': '光滑', 'bumpy': '颠簸',
  'level': '水平', 'tilted': '倾斜',
  'straight': '直', 'curved': '弯曲',
  'bent': '弯曲', 'twisted': '扭曲',
  'warped': '翘曲', 'deformed': '变形',
  'distorted': '扭曲', 'stretched': '拉伸',
  'compressed': '压缩', 'expanded': '扩展',
  'contracted': '收缩', 'inflated': '充气',
  'deflated': '放气', 'swollen': '膨胀',
  'shrunken': '缩小', 'grown': '增长',
  'reduced': '减少', 'increased': '增加',
  'decreased': '减少', 'enhanced': '增强',
  'diminished': '减弱', 'amplified': '放大',
  'attenuated': '衰减', 'strengthened': '加强',
  'weakened': '削弱', 'intensified': '强化',
  'relaxed': '放松', 'tightened': '收紧',
  'loosened': '松开', 'secured': '固定',
  'released': '释放', 'freed': '解放',
  'captured': '捕获', 'caught': '抓住',
  'held': '持有', 'dropped': '丢弃',
  'thrown': '扔', 'tossed': '抛',
  'launched': '发射', 'fired': '开火',
  'shot': '射击', 'hit': '击中',
  'missed': '未击中', 'struck': '打击',
  'beaten': '击败', 'won': '赢',
  'lost': '输', 'tied': '平局',
  'drawn': '平局', 'evened': '拉平',
  'offset': '偏移', 'compensated': '补偿',
  'adjusted': '调整', 'calibrated': '校准',
  'tuned': '调谐', 'altered': '更改',
  'transformed': '转换', 'converted': '转换',
  'translated': '翻译', 'rotated': '旋转',
  'flipped': '翻转', 'mirrored': '镜像',
  'reversed': '反转', 'inverted': '反转',
  'upgraded': '升级', 'downgraded': '降级',
  'patched': '打补丁', 'hotfixed': '热修复',
  'backported': '回移', 'cherryPicked': '精选',
  'rebased': '变基', 'squashed': '压缩',
  'forcePushed': '强制推送', 'reverted': '撤销',
  'undone': '撤销', 'redone': '重做',
};

// Apply issue.chat translations
for (const [k, v] of Object.entries(issueChat)) {
  if (en.issue?.chat?.[k] !== undefined) {
    s(zh, 'issue.chat.' + k, v);
  }
}

// issue.propertiesPage - remaining keys
const issueProps = {
  'reopened': '重新打开时间', 'mentionedIn': '提及于',
  'noDependencies': '无依赖项', 'noReferences': '无引用',
  'noAttachments': '无附件', 'addLabel': '添加标签',
  'removeLabel': '移除标签', 'addDependency': '添加依赖',
  'removeDependency': '移除依赖', 'linkIssue': '关联问题',
  'unlinkIssue': '取消关联', 'moveToProject': '移动到项目',
  'changeStatus': '更改状态', 'changePriority': '更改优先级',
  'changeAssignee': '更改负责人', 'setDueDate': '设置截止日期',
  'clearDueDate': '清除截止日期', 'setEstimate': '设置预估',
  'clearEstimate': '清除预估', 'markAsDuplicate': '标记为重复',
  'markAsBlocked': '标记为阻塞', 'markAsReady': '标记为就绪',
  'archive': '归档', 'unarchive': '取消归档',
  'delete': '删除', 'deleteConfirm': '确定要删除此问题吗？',
  'deleteWarning': '此操作无法撤销。',
};
for (const [k, v] of Object.entries(issueProps)) {
  if (en.issue?.propertiesPage?.[k] !== undefined) {
    s(zh, 'issue.propertiesPage.' + k, v);
  }
}

// issue.newDialog - remaining keys
const issueNew = {
  'estimatedTimeLabel': '预估时间', 'parentLabel': '父任务',
  'required': '必填', 'optional': '可选',
  'advanced': '高级选项', 'basic': '基本信息',
  'template': '模板', 'noTemplate': '无模板',
  'fromTemplate': '从模板创建', 'saveAsTemplate': '保存为模板',
  'duplicateOf': '重复于', 'relatedTo': '关联于',
  'blockedBy': '被阻塞于', 'blocks': '阻塞',
  'addAttachment': '添加附件', 'removeAttachment': '移除附件',
  'addLink': '添加链接', 'removeLink': '移除链接',
  'preview': '预览', 'submit': '提交', 'reset': '重置',
};
for (const [k, v] of Object.entries(issueNew)) {
  if (en.issue?.newDialog?.[k] !== undefined) {
    s(zh, 'issue.newDialog.' + k, v);
  }
}

// issue.runLedger - remaining keys
const issueLedger = {
  'model': '模型', 'tokens': '令牌', 'cost': '成本',
  'viewDetails': '查看详情', 'viewLogs': '查看日志',
  'viewOutput': '查看输出', 'rerun': '重新运行',
  'cancel': '取消', 'cancelled': '已取消',
  'running': '运行中', 'completed': '已完成',
  'failed': '失败', 'pending': '待处理',
  'queued': '已排队', 'skipped': '已跳过',
  'success': '成功', 'warning': '警告',
  'info': '信息', 'debug': '调试',
  'filter': '筛选', 'clearFilter': '清除筛选',
  'search': '搜索', 'noResults': '未找到结果',
  'export': '导出', 'refresh': '刷新',
};
for (const [k, v] of Object.entries(issueLedger)) {
  if (en.issue?.runLedger?.[k] !== undefined) {
    s(zh, 'issue.runLedger.' + k, v);
  }
}

// issue.toasts - remaining keys
const issueToasts = {
  'blocked': '已标记为阻塞', 'unblocked': '已取消阻塞',
  'ready': '已标记为就绪', 'duplicated': '已标记为重复',
  'linkAdded': '链接已添加', 'linkRemoved': '链接已移除',
  'dependencyAdded': '依赖已添加', 'dependencyRemoved': '依赖已移除',
  'networkError': '网络错误', 'permissionDenied': '权限不足',
  'notFound': '未找到', 'conflict': '冲突',
  'validationError': '验证错误', 'timeout': '超时',
  'unknownError': '未知错误',
};
for (const [k, v] of Object.entries(issueToasts)) {
  if (en.issue?.toasts?.[k] !== undefined) {
    s(zh, 'issue.toasts.' + k, v);
  }
}

// issue.recovery - remaining keys
const issueRecovery = {
  'skip': '跳过', 'abort': '中止', 'ignore': '忽略',
  'escalate': '升级', 'delegate': '委托',
  'manual': '手动处理', 'auto': '自动处理',
  'suggested': '建议', 'recommended': '推荐',
  'required': '必填', 'optional': '可选',
  'viewDetails': '查看详情', 'viewHistory': '查看历史',
  'noRecovery': '无需恢复', 'recoveryFailed': '恢复失败',
  'recoverySuccess': '恢复成功', 'pending': '待处理',
  'inProgress': '进行中', 'completed': '已完成',
  'failed': '失败', 'cancelled': '已取消',
  'reason': '原因', 'details': '详情',
  'timestamp': '时间戳', 'actor': '操作者',
};
for (const [k, v] of Object.entries(issueRecovery)) {
  if (en.issue?.recovery?.[k] !== undefined) {
    s(zh, 'issue.recovery.' + k, v);
  }
}

// issue.treeControl - remaining keys
const issueTree = {
  'expand': '展开', 'collapse': '折叠',
  'expandAll': '全部展开', 'collapseAll': '全部折叠',
  'addChild': '添加子任务', 'removeChild': '移除子任务',
  'moveTo': '移动到', 'reorder': '重新排序',
  'indent': '缩进', 'outdent': '取消缩进',
  'promote': '提升', 'demote': '降低',
  'noChildren': '无子任务', 'loading': '加载中...',
  'error': '加载失败', 'retry': '重试',
  'dragToReorder': '拖拽重新排序', 'viewTree': '查看树',
  'viewList': '查看列表', 'viewBoard': '查看看板',
  'depth': '深度', 'count': '数量', 'total': '总计',
};
for (const [k, v] of Object.entries(issueTree)) {
  if (en.issue?.treeControl?.[k] !== undefined) {
    s(zh, 'issue.treeControl.' + k, v);
  }
}

// issue.list - remaining keys
const issueList = {
  'search': '搜索问题', 'filter': '筛选', 'sort': '排序',
  'groupBy': '分组', 'view': '视图', 'listView': '列表',
  'boardView': '看板', 'treeView': '树', 'refresh': '刷新',
  'selectAll': '全选', 'deselectAll': '取消全选',
  'bulkActions': '批量操作', 'bulkEdit': '批量编辑',
  'bulkDelete': '批量删除', 'bulkArchive': '批量归档',
  'bulkAssign': '批量分配', 'bulkLabel': '批量标签',
  'bulkStatus': '批量状态', 'selected': '已选择',
  'noResults': '未找到结果', 'clearFilters': '清除筛选',
  'saveView': '保存视图', 'loadView': '加载视图',
  'deleteView': '删除视图', 'defaultView': '默认视图',
  'customView': '自定义视图',
};
for (const [k, v] of Object.entries(issueList)) {
  if (en.issue?.list?.[k] !== undefined) {
    s(zh, 'issue.list.' + k, v);
  }
}

// issue.filters - remaining keys
const issueFilters = {
  'dateRange': '日期范围', 'createdAfter': '创建于...之后',
  'createdBefore': '创建于...之前', 'updatedAfter': '更新于...之后',
  'updatedBefore': '更新于...之前', 'dueAfter': '截止于...之后',
  'dueBefore': '截止于...之前', 'hasAssignee': '有负责人',
  'noAssignee': '无负责人', 'hasProject': '有项目',
  'noProject': '无项目', 'hasLabels': '有标签',
  'noLabels': '无标签', 'hasDueDate': '有截止日期',
  'noDueDate': '无截止日期', 'isBlocked': '被阻塞',
  'isReady': '就绪', 'isArchived': '已归档',
  'isDuplicate': '重复', 'clear': '清除',
  'apply': '应用', 'save': '保存', 'reset': '重置',
};
for (const [k, v] of Object.entries(issueFilters)) {
  if (en.issue?.filters?.[k] !== undefined) {
    s(zh, 'issue.filters.' + k, v);
  }
}

// issue.status - remaining keys
const issueStatus = {
  'backlog': '待办', 'todo': '待处理', 'inProgress': '进行中',
  'inReview': '审查中', 'done': '已完成', 'cancelled': '已取消',
  'blocked': '阻塞', 'archived': '已归档', 'open': '打开',
  'closed': '关闭', 'reopened': '已重新打开', 'draft': '草稿',
  'ready': '就绪', 'parked': '暂停', 'waiting': '等待中',
  'scheduled': '已计划', 'running': '运行中', 'paused': '已暂停',
  'failed': '失败', 'skipped': '已跳过',
};
for (const [k, v] of Object.entries(issueStatus)) {
  if (en.issue?.status?.[k] !== undefined) {
    s(zh, 'issue.status.' + k, v);
  }
}

// issue.runActions - remaining keys
const issueRunActions = {
  'start': '开始', 'stop': '停止', 'restart': '重启',
  'pause': '暂停', 'resume': '恢复', 'cancel': '取消',
  'retry': '重试', 'viewLogs': '查看日志',
  'viewOutput': '查看输出', 'viewDetails': '查看详情',
  'delete': '删除',
};
for (const [k, v] of Object.entries(issueRunActions)) {
  if (en.issue?.runActions?.[k] !== undefined) {
    s(zh, 'issue.runActions.' + k, v);
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
