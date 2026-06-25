const fs = require('fs');
const en = JSON.parse(fs.readFileSync('ui/src/i18n/locales/en.json', 'utf8'));
const zhCN = JSON.parse(fs.readFileSync('ui/src/i18n/locales/zh-CN.json', 'utf8'));

// Copy issue section from en as base
zhCN.issue = JSON.parse(JSON.stringify(en.issue));

// Overwrite with Chinese translations
const zh = zhCN.issue;

zh.title = "任务";
zh.newTask = "新建任务";
zh.createTask = "创建任务";
zh.selectCompanyToView = "选择一家公司以查看任务。";
zh.task = "任务";
zh.subTask = "子任务";
zh.subTasks = "子任务";
zh.newSubTask = "新建子任务";
zh.addSubTask = "添加子任务";
zh.artifacts = "制品";
zh.live = "实时";
zh.routine = "例程";
zh.productivityReview = "生产力审核";
zh.blockedByParkedWork = "被暂停工作阻塞";
zh.noProject = "无项目";
zh.thisTaskIsHidden = "此任务已隐藏";
zh.addDescription = "添加描述...";
zh.uploadAttachment = "上传附件";
zh.uploading = "上传中...";
zh.upload = "上传";
zh.copyTaskAsMarkdown = "复制任务为 Markdown";
zh.showProperties = "显示属性";
zh.moreTaskActions = "更多任务操作";
zh.hideThisTask = "隐藏此任务";
zh.properties = "属性";
zh.chooseTaskColumns = "选择任务列";

if (zh.status) {
  zh.status.open = "开放";
  zh.status.inProgress = "进行中";
  zh.status.done = "已完成";
  zh.status.blocked = "阻塞";
  zh.status.cancelled = "已取消";
}

if (zh.priority) {
  zh.priority.urgent = "紧急";
  zh.priority.high = "高";
  zh.priority.medium = "中";
  zh.priority.low = "低";
  zh.priority.none = "无";
}

if (zh.tabs) {
  zh.tabs.chat = "对话";
  zh.tabs.activity = "活动";
  zh.tabs.relatedWork = "相关工作";
}

if (zh.chatDetail) {
  zh.chatDetail.loadingEarlierComments = "加载更早的评论...";
  zh.chatDetail.loadEarlierComments = "加载更早的评论";
  zh.chatDetail.pauseWork = "暂停工作";
  zh.chatDetail.pausing = "暂停中...";
}

if (zh.costSummary) {
  zh.costSummary.title = "成本摘要";
  zh.costSummary.noCostData = "暂无成本数据。";
  zh.costSummary.thisTask = "此任务";
  zh.costSummary.noDirectCostData = "暂无直接成本数据。";
  zh.costSummary.includingSubTasks = "包含子任务";
}

if (zh.treeControl) {
  zh.treeControl.pauseSubtree = "暂停子树";
  zh.treeControl.resumeSubtree = "恢复子树";
  zh.treeControl.cancelSubtree = "取消子树";
  zh.treeControl.restoreSubtree = "恢复子树";
  zh.treeControl.pausingSubtree = "暂停子树中...";
  zh.treeControl.resumingSubtree = "恢复子树中...";
  zh.treeControl.cancellingSubtree = "取消子树中...";
  zh.treeControl.restoringSubtree = "恢复子树中...";
  zh.treeControl.subtreePaused = "子树已暂停";
  zh.treeControl.subtreeResumed = "子树已恢复";
  zh.treeControl.subtreeCancelled = "子树已取消";
  zh.treeControl.subtreeRestored = "子树已恢复";
  zh.treeControl.failedPauseSubtree = "暂停子树失败";
  zh.treeControl.failedResumeSubtree = "恢复子树失败";
  zh.treeControl.failedCancelSubtree = "取消子树失败";
  zh.treeControl.failedRestoreSubtree = "恢复子树失败";
  zh.treeControl.pauseSubtreeDesc = "暂停此子树中的所有智能体";
  zh.treeControl.resumeSubtreeDesc = "恢复此子树中的所有智能体";
  zh.treeControl.cancelSubtreeDesc = "取消此子树中的所有任务";
  zh.treeControl.restoreSubtreeDesc = "恢复此子树中的所有任务";
  zh.treeControl.confirmPauseSubtree = "确定要暂停此子树中的所有智能体吗？";
  zh.treeControl.confirmResumeSubtree = "确定要恢复此子树中的所有智能体吗？";
  zh.treeControl.confirmCancelSubtree = "确定要取消此子树中的所有任务吗？";
  zh.treeControl.confirmRestoreSubtree = "确定要恢复此子树中的所有任务吗？";
}

if (zh.toasts) {
  zh.toasts.statusUpdated = "状态已更新";
  zh.toasts.failedUpdateStatus = "更新状态失败";
  zh.toasts.priorityUpdated = "优先级已更新";
  zh.toasts.failedUpdatePriority = "更新优先级失败";
  zh.toasts.assigneeUpdated = "分配人已更新";
  zh.toasts.failedUpdateAssignee = "更新分配人失败";
  zh.toasts.projectUpdated = "项目已更新";
  zh.toasts.failedUpdateProject = "更新项目失败";
  zh.toasts.labelsUpdated = "标签已更新";
  zh.toasts.failedUpdateLabels = "更新标签失败";
  zh.toasts.descriptionUpdated = "描述已更新";
  zh.toasts.failedUpdateDescription = "更新描述失败";
  zh.toasts.titleUpdated = "标题已更新";
  zh.toasts.failedUpdateTitle = "更新标题失败";
  zh.toasts.parentUpdated = "父任务已更新";
  zh.toasts.failedUpdateParent = "更新父任务失败";
  zh.toasts.taskCreated = "任务已创建";
  zh.toasts.failedCreateTask = "创建任务失败";
  zh.toasts.taskDeleted = "任务已删除";
  zh.toasts.failedDeleteTask = "删除任务失败";
  zh.toasts.taskArchived = "任务已归档";
  zh.toasts.failedArchiveTask = "归档任务失败";
  zh.toasts.taskRestored = "任务已恢复";
  zh.toasts.failedRestoreTask = "恢复任务失败";
  zh.toasts.attachmentUploaded = "附件已上传";
  zh.toasts.failedUploadAttachment = "上传附件失败";
  zh.toasts.commentPosted = "评论已发布";
  zh.toasts.failedPostComment = "发布评论失败";
  zh.toasts.commentDeleted = "评论已删除";
  zh.toasts.failedDeleteComment = "删除评论失败";
  zh.toasts.taskHidden = "任务已隐藏";
  zh.toasts.failedHideTask = "隐藏任务失败";
  zh.toasts.taskUnhidden = "任务已取消隐藏";
  zh.toasts.failedUnhideTask = "取消隐藏任务失败";
  zh.toasts.workPaused = "工作已暂停";
  zh.toasts.failedPauseWork = "暂停工作失败";
  zh.toasts.workResumed = "工作已恢复";
  zh.toasts.failedResumeWork = "恢复工作失败";
  zh.toasts.markedDone = "已标记为完成";
  zh.toasts.failedMarkDone = "标记完成失败";
  zh.toasts.taskCancelled = "任务已取消";
  zh.toasts.failedCancelTask = "取消任务失败";
  zh.toasts.taskRestoredFromCancel = "任务已从取消状态恢复";
  zh.toasts.failedRestoreFromCancel = "恢复任务失败";
}

if (zh.assignee) {
  zh.assignee.unassigned = "未分配";
  zh.assignee.assignToMe = "分配给我";
  zh.assignee.noAssignee = "无分配人";
  zh.assignee.searchAssignees = "搜索分配人...";
}

if (zh.filters) {
  zh.filters.title = "筛选";
  zh.filters.clear = "清除";
  zh.filters.quickFilters = "快速筛选";
  zh.filters.status = "状态";
  zh.filters.priority = "优先级";
  zh.filters.assignee = "分配人";
  zh.filters.creator = "创建者";
  zh.filters.project = "项目";
  zh.filters.labels = "标签";
  zh.filters.workspace = "工作区";
  zh.filters.visibility = "可见性";
  zh.filters.noAssignee = "无分配人";
  zh.filters.me = "我";
  zh.filters.searchCreators = "搜索创建者...";
  zh.filters.noCreatorsMatch = "没有匹配的创建者。";
  zh.filters.liveRunsOnly = "仅实时运行";
  zh.filters.hideRoutineRuns = "隐藏例程运行";
}

if (zh.list) {
  zh.list.searchTasks = "搜索任务...";
  zh.list.newTask = "新建任务";
  zh.list.createTask = "创建任务";
  zh.list.listView = "列表视图";
  zh.list.boardView = "看板视图";
  zh.list.nestingToggle = "嵌套切换";
  zh.list.boardCardDensity = "看板卡片密度";
  zh.list.coldLaneToggle = "冷通道切换";
  zh.list.cardsPerColumn = "每列卡片数";
  zh.list.perColumn = "每列";
  zh.list.resetBoardDensity = "重置看板密度";
  zh.list.chooseColumns = "选择要显示的任务列";
  zh.list.sortBy = "排序";
  zh.list.groupBy = "分组";
  zh.list.workflow = "工作流";
  zh.list.status = "状态";
  zh.list.priority = "优先级";
  zh.list.title = "标题";
  zh.list.created = "创建时间";
  zh.list.updated = "更新时间";
  zh.list.assignee = "分配人";
  zh.list.project = "项目";
  zh.list.workspace = "工作区";
  zh.list.parentTask = "父任务";
  zh.list.none = "无";
  zh.list.noTasksMatch = "没有任务匹配当前筛选或搜索条件。";
  zh.list.showingResults = "显示 {{count}} 条结果";
  zh.list.loading = "加载中...";
  zh.list.rendering = "渲染中...";
  zh.list.newTaskInGroup = "在组中新建任务";
  zh.list.subTaskCount = "{{count}} 个子任务";
  zh.list.paused = "已暂停";
  zh.list.needsNextStep = "需要下一步";
  zh.list.searchAssignees = "搜索分配人...";
  zh.list.noAssignee = "无分配人";
}

if (zh.propertiesPage) {
  zh.propertiesPage.status = "状态";
  zh.propertiesPage.priority = "优先级";
  zh.propertiesPage.labels = "标签";
  zh.propertiesPage.assignee = "分配人";
  zh.propertiesPage.model = "模型";
  zh.propertiesPage.project = "项目";
  zh.propertiesPage.parent = "父任务";
  zh.propertiesPage.blockedBy = "被阻塞";
  zh.propertiesPage.blocking = "阻塞中";
  zh.propertiesPage.subTasks = "子任务";
  zh.propertiesPage.relatedTasks = "相关任务";
  zh.propertiesPage.reviewers = "审核者";
  zh.propertiesPage.approvers = "审批者";
  zh.propertiesPage.execution = "执行";
  zh.propertiesPage.scheduledRetry = "计划重试";
  zh.propertiesPage.monitor = "监控";
  zh.propertiesPage.watchdog = "看门狗";
  zh.propertiesPage.depth = "深度";
  zh.propertiesPage.service = "服务";
  zh.propertiesPage.workspace = "工作区";
  zh.propertiesPage.branch = "分支";
  zh.propertiesPage.folder = "文件夹";
  zh.propertiesPage.createdBy = "创建者";
  zh.propertiesPage.started = "开始时间";
  zh.propertiesPage.completed = "完成时间";
  zh.propertiesPage.created = "创建时间";
  zh.propertiesPage.updated = "更新时间";
}

if (zh.runLedger) {
  zh.runLedger.title = "运行记录";
  zh.runLedger.noRuns = "暂无运行记录。";
  zh.runLedger.live = "实时";
  zh.runLedger.completed = "已完成";
  zh.runLedger.failed = "失败";
  zh.runLedger.cancelled = "已取消";
  zh.runLedger.paused = "已暂停";
  zh.runLedger.running = "运行中";
  zh.runLedger.pending = "待处理";
  zh.runLedger.silenced = "已静音";
  zh.runLedger.acknowledged = "已确认";
  zh.runLedger.muted = "已静音";
  zh.runLedger.stopReason = "停止原因";
  zh.runLedger.duration = "时长";
  zh.runLedger.cost = "成本";
  zh.runLedger.tokens = "Token";
  zh.runLedger.input = "输入";
  zh.runLedger.output = "输出";
  zh.runLedger.cached = "缓存";
}

if (zh.chat) {
  zh.chat.agentLabel = "智能体";
  zh.chat.userLabel = "用户";
  zh.chat.systemLabel = "系统";
  zh.chat.copyComment = "复制评论";
  zh.chat.deleteComment = "删除评论";
  zh.chat.copied = "已复制";
  zh.chat.deleted = "已删除";
  zh.chat.failedDelete = "删除失败";
  zh.chat.confirmDelete = "确定要删除此评论吗？";
  zh.chat.addComment = "添加评论...";
  zh.chat.posting = "发布中...";
  zh.chat.post = "发布";
  zh.chat.noComments = "暂无评论。";
  zh.chat.loadingComments = "加载评论...";
  zh.chat.loadEarlier = "加载更早的评论";
  zh.chat.feedbackHelpful = "有帮助";
  zh.chat.feedbackNotHelpful = "无帮助";
  zh.chat.feedbackShare = "分享反馈";
  zh.chat.feedbackTitle = "分享反馈";
  zh.chat.feedbackPlaceholder = "描述您的反馈...";
  zh.chat.cancel = "取消";
  zh.chat.submit = "提交";
  zh.chat.submitted = "已提交";
  zh.chat.failedSubmit = "提交失败";
}

if (zh.recovery) {
  zh.recovery.title = "恢复操作";
  zh.recovery.noActions = "暂无恢复操作。";
  zh.recovery.resolve = "解决";
  zh.recovery.resolving = "解决中...";
  zh.recovery.resolved = "已解决";
  zh.recovery.failedResolve = "解决失败";
  zh.recovery.state = "状态";
  zh.recovery.kind = "类型";
  zh.recovery.outcome = "结果";
  zh.recovery.createdAt = "创建时间";
  zh.recovery.resolvedAt = "解决时间";
}

if (zh.newDialog) {
  zh.newDialog.title = "新建任务";
  zh.newDialog.for = "给";
  zh.newDialog.in = "在";
  zh.newDialog.selectAssignee = "选择分配人...";
  zh.newDialog.selectProject = "选择项目...";
  zh.newDialog.selectReviewer = "选择审核者...";
  zh.newDialog.selectApprover = "选择审批者...";
  zh.newDialog.selectWatchdog = "选择看门狗...";
  zh.newDialog.subTask = "子任务";
  zh.newDialog.executionWorkspace = "执行工作区";
  zh.newDialog.modelLane = "模型通道";
  zh.newDialog.create = "创建";
  zh.newDialog.creating = "创建中...";
  zh.newDialog.cancel = "取消";
  zh.newDialog.titlePlaceholder = "任务标题";
  zh.newDialog.descriptionPlaceholder = "任务描述（可选）";
}

fs.writeFileSync('ui/src/i18n/locales/zh-CN.json', JSON.stringify(zhCN, null, 2) + '\n');

// Verify
function countKeys(obj) {
  let c = 0;
  for (const v of Object.values(obj)) {
    if (typeof v === 'object' && v !== null) c += countKeys(v);
    else c++;
  }
  return c;
}
console.log('Updated zh-CN.json');
console.log('Total keys:', countKeys(zhCN));
console.log('issue.title:', zhCN.issue.title);
console.log('issue.status.open:', zhCN.issue.status.open);
console.log('issue.tabs.chat:', zhCN.issue.tabs.chat);
console.log('issue.chat.agentLabel:', zhCN.issue.chat.agentLabel);
