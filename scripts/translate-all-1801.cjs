const fs = require('fs');
const path = require('path');

const zhPath = path.join(__dirname, '..', 'ui', 'src', 'i18n', 'locales', 'zh-CN.json');
const enPath = path.join(__dirname, '..', 'ui', 'src', 'i18n', 'locales', 'en.json');

const zhCN = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix ? prefix + '.' : '';
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flatten(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {});
}

const enFlat = flatten(en);

function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

// All 1801 remaining translations
const translations = {
  // issue.propertiesPage (58)
  'issue.propertiesPage.nextCheck': '下次检查',
  'issue.propertiesPage.cleared': '已清除',
  'issue.propertiesPage.lastTriggered': '上次触发',
  'issue.propertiesPage.notScheduled': '未计划',
  'issue.propertiesPage.monitorPlaceholder': '代理应该重新检查什么？',
  'issue.propertiesPage.externalService': '外部服务',
  'issue.propertiesPage.searchingTasks': '搜索任务中...',
  'issue.propertiesPage.noMatchingTasks': '无匹配任务。',
  'issue.propertiesPage.viewWorkspace': '查看工作区',
  'issue.propertiesPage.modelLane': '模型通道',
  'issue.propertiesPage.primary': '主要',
  'issue.propertiesPage.cheap': '经济',
  'issue.propertiesPage.custom': '自定义',
  'issue.propertiesPage.primaryModel': '主要模型',
  'issue.propertiesPage.cheapModel': '经济模型',
  'issue.propertiesPage.defaultModel': '默认模型',
  'issue.propertiesPage.searchModels': '搜索模型...',
  'issue.propertiesPage.noModelsFound': '未找到模型。',
  'issue.propertiesPage.thinkingEffort': '思考工作量',
  'issue.propertiesPage.enableChrome': '启用 Chrome (--chrome)',
  'issue.propertiesPage.clearAdapterOptions': '清除适配器选项',
  'issue.propertiesPage.adapterNoOverrides': '此分配人的适配器不支持可编辑的任务覆盖。',
  'issue.propertiesPage.selectAgentAssignee': '选择一个兼容的代理分配人来编辑这些覆盖。',
  'issue.propertiesPage.watchdogAgent': '监督代理',
  'issue.propertiesPage.selectAgent': '选择代理',
  'issue.propertiesPage.noWatchdogAgent': '无监督代理',
  'issue.propertiesPage.searchAgents': '搜索代理...',
  'issue.propertiesPage.noAgentsFound': '未找到代理。',
  'issue.propertiesPage.instructionsOptional': '指令（可选）',
  'issue.propertiesPage.watchdogPlaceholder': '监督者应该监督什么以及如何保持工作推进？',
  'issue.propertiesPage.watchdogTask': '监督任务',
  'issue.propertiesPage.viewTask': '查看任务',
  'issue.propertiesPage.removing': '移除中…',
  'issue.propertiesPage.setWatchdog': '设置监督者',
  'issue.propertiesPage.saving': '保存中…',
  'issue.propertiesPage.openWatchdogTask': '打开监督任务',
  'issue.propertiesPage.disabled': '（已禁用）',
  'issue.propertiesPage.scheduledContinuation': '计划延续',
  'issue.propertiesPage.scheduledRetryLabel': '计划重试',
  'issue.propertiesPage.nextAttempt': '下次尝试',
  'issue.propertiesPage.replacesRun': '替换运行',
  'issue.propertiesPage.lastError': '上次错误',
  'issue.propertiesPage.retryNow': '立即重试',
  'issue.propertiesPage.retrying': '重试中…',
  'issue.propertiesPage.promoted': '已提升',
  'issue.propertiesPage.alreadyPromoted': '已提升',
  'issue.propertiesPage.promotingScheduledRetry': '提升计划重试',
  'issue.propertiesPage.alreadyPromotedRunStarting': '已提升 — 运行即将开始',
  'issue.propertiesPage.promotedRunStarting': '已提升 — 运行即将开始',
  'issue.propertiesPage.pullsContinuationForward': '立即将延续提前',
  'issue.propertiesPage.pullsRetryForward': '立即将重试提前',
  'issue.propertiesPage.pendingSchedule': '待定计划',
  'issue.propertiesPage.continuationDueNow': '延续现在到期',
  'issue.propertiesPage.retryDueNow': '重试现在到期',
  'issue.propertiesPage.continuation': '延续',
  'issue.propertiesPage.requester': '请求者',
  'issue.propertiesPage.searchBlockerTasks': '搜索要添加为阻塞项的任务',
  'issue.propertiesPage.defaultLabel': '默认',

  // issue.toasts (48)
  'issue.toasts.stopAndDoneFailed': '停止并标记完成失败',
  'issue.toasts.stopAndCancelFailed': '停止并取消失败',
  'issue.toasts.subTaskUpdateFailed': '子任务更新失败',
  'issue.toasts.unableToSaveSubTaskChanges': '无法保存子任务更改',
  'issue.toasts.monitorCheckQueued': '监控检查已排队',
  'issue.toasts.monitorCheckFailed': '监控检查失败',
  'issue.toasts.unableToTriggerMonitor': '无法立即触发监控',
  'issue.toasts.approvalApproved': '审批已通过',
  'issue.toasts.approvalRejected': '审批已拒绝',
  'issue.toasts.approvalFailed': '审批失败',
  'issue.toasts.rejectionFailed': '拒绝失败',
  'issue.toasts.unableToUpdateApproval': '无法更新审批',
  'issue.toasts.cancelFailed': '取消失败',
  'issue.toasts.unableToCancelQueuedComment': '无法取消排队的评论',
  'issue.toasts.commentFailed': '评论失败',
  'issue.toasts.unableToPostComment': '无法发布评论',
  'issue.toasts.requestConfirmed': '请求已确认',
  'issue.toasts.selectionConfirmed': '选择已确认',
  'issue.toasts.suggestedTasksAccepted': '建议任务已接受',
  'issue.toasts.acceptFailed': '接受失败',
  'issue.toasts.unableToAcceptSuggestedTasks': '无法接受建议的任务',
  'issue.toasts.requestDeclined': '请求已拒绝',
  'issue.toasts.suggestionRejected': '建议已拒绝',
  'issue.toasts.rejectFailed': '拒绝失败',
  'issue.toasts.unableToRejectSuggestedTasks': '无法拒绝建议的任务',
  'issue.toasts.answersSubmitted': '答案已提交',
  'issue.toasts.submitFailed': '提交失败',
  'issue.toasts.unableToSubmitAnswers': '无法提交答案',
  'issue.toasts.questionCancelled': '问题已取消',
  'issue.toasts.unableToCancelQuestion': '无法取消问题',
  'issue.toasts.interruptRequested': '中断已请求',
  'issue.toasts.activeRunStopping': '活跃运行正在停止，排队的评论将在下次继续。',
  'issue.toasts.interruptFailed': '中断失败',
  'issue.toasts.unableToInterruptActiveRun': '无法中断活跃运行',
  'issue.toasts.queuedCommentCanceled': '排队评论已取消',
  'issue.toasts.queuedMessageRestored': '排队的消息已恢复到编辑器。',
  'issue.toasts.threadShowsDeletedMarker': '线程现在显示已删除评论标记。',
  'issue.toasts.unableToDeleteComment': '无法删除评论',
  'issue.toasts.feedbackSaved': '反馈已保存',
  'issue.toasts.feedbackSavedFutureShare': '反馈已保存。未来的投票将共享',
  'issue.toasts.feedbackSavedFutureLocal': '反馈已保存。未来的投票将保留在本地',
  'issue.toasts.feedbackSavedSharingEnabled': '反馈已保存且共享已启用',
  'issue.toasts.failedToSaveFeedback': '保存反馈失败',
  'issue.toasts.taskArchivedFromInbox': '任务已从收件箱归档',
  'issue.toasts.archiveFailed': '归档失败',
  'issue.toasts.unableToArchiveTask': '无法从收件箱归档此任务',
  'issue.toasts.copiedToClipboard': '已复制到剪贴板',
  'issue.toasts.unableToCopyMarkdown': '无法复制任务 Markdown',

  // issue.runLedger (40)
  'issue.runLedger.allTerminal': '全部 {{total}} 个终止（{{done}} 完成，{{cancelled}} 取消）',
  'issue.runLedger.watchdog.staleRunAlert': '过期运行监督警报',
  'issue.runLedger.watchdog.silenceWarning': '输出静默监督警告',
  'issue.runLedger.watchdog.silentFor': '最新活跃运行已静默 {{duration}}。',
  'issue.runLedger.watchdog.silentExtended': '较长时间',
  'issue.runLedger.watchdog.forRecoveryContext': '用于恢复上下文。',
  'issue.runLedger.watchdog.continueMonitoring': '继续监控',
  'issue.runLedger.watchdog.snooze1h': '暂停 1 小时',
  'issue.runLedger.watchdog.markFalsePositive': '标记为误报',
  'issue.runLedger.watchdog.notRecorded': '监督决定未记录',
  'issue.runLedger.watchdog.onlyBoardOrOwner': '只有看板或分配的恢复所有者可以记录监督决定',
  'issue.runLedger.watchdog.couldNotRecord': 'Paperclip 无法记录监督决定。',
  'issue.runLedger.liveness.completedDesc': '任务已达到终止状态。',
  'issue.runLedger.liveness.advancedDesc': '运行产生了具体的进展证据。',
  'issue.runLedger.liveness.planOnly': '仅计划',
  'issue.runLedger.liveness.planOnlyDesc': '运行描述了未来的工作但没有具体的行动证据。',
  'issue.runLedger.liveness.emptyResponse': '空响应',
  'issue.runLedger.liveness.emptyResponseDesc': '运行完成但没有有用的输出。',
  'issue.runLedger.liveness.blockedDesc': '运行或任务声明了阻塞项。',
  'issue.runLedger.liveness.failedDesc': '运行未成功结束。',
  'issue.runLedger.liveness.needsFollowup': '需要跟进',
  'issue.runLedger.liveness.needsFollowupDesc': '运行产生了有用的输出但未证明具体进展。',
  'issue.runLedger.liveness.checksAfterFinish': '完成后检查',
  'issue.runLedger.liveness.checksAfterFinishDesc': '活跃度在运行完成后进行评估。',
  'issue.runLedger.liveness.retryPendingLabel': '重试待定',
  'issue.runLedger.liveness.retryPendingDesc': 'Paperclip 已排队自动重试但尚未开始。',
  'issue.runLedger.liveness.noLivenessData': '无活跃度数据',
  'issue.runLedger.liveness.noLivenessDataDesc': '此运行没有持久化的活跃度分类。',
  'issue.runLedger.silence.suspicious': '静默监视',
  'issue.runLedger.silence.critical': '过期运行',
  'issue.runLedger.silence.snoozed': '静默已暂停',
  'issue.runLedger.stopReason.timeout': '超时',
  'issue.runLedger.stopReason.maxTurnsExhausted': '最大轮次已耗尽',
  'issue.runLedger.stopReason.budgetPaused': '预算已暂停',
  'issue.runLedger.stopReason.cancelled': '已取消',
  'issue.runLedger.stopReason.pausedByBoard': '被看板暂停',
  'issue.runLedger.stopReason.processLost': '进程丢失',
  'issue.runLedger.stopReason.adapterFailed': '适配器失败',
  'issue.runLedger.stopReason.completed': '已完成',
  'issue.runLedger.stopReason.timeoutSec': '{{seconds}} 秒超时',

  // issue.list (28)
  'issue.list.unassigned': '未分配',
  'issue.list.noWorkspace': '无工作区',
  'issue.list.noProject': '无项目',
  'issue.list.noParent': '无父任务',
  'issue.list.noTasksMatchFilters': '没有任务匹配当前的过滤器或搜索。',
  'issue.list.loadingMoreTasks': '加载更多任务...',
  'issue.list.renderingCount': '正在渲染 {{rendered}} / {{total}} 个任务',
  'issue.list.scrollToLoadMore': '滚动加载更多任务',
  'issue.list.showingUpToMatches': '显示最多 {{limit}} 个匹配项。请优化搜索以缩小范围。',
  'issue.list.boardColumnsLimit': '部分看板列最多显示 {{limit}} 个任务。请优化过滤器或搜索以显示其余任务。',
  'issue.list.perPageColumn': '每列',
  'issue.list.useComfortableCards': '使用宽松卡片',
  'issue.list.useCompactCards': '使用紧凑卡片',
  'issue.list.expandColdLanes': '展开冷通道',
  'issue.list.collapseColdLanes': '折叠冷通道',
  'issue.list.enableNesting': '启用父子嵌套',
  'issue.list.disableNesting': '禁用父子嵌套',
  'issue.list.needsNextStepTitle': '此任务需要下一步操作',
  'issue.list.subTaskCount_one': '（{{count}} 个子任务）',
  'issue.list.subTaskCount_other': '（{{count}} 个子任务）',
  'issue.list.blockedByLabel': '被阻塞于',
  'issue.list.andMore': '...还有 {{count}} 个',
  'issue.list.assigneeLabel': '分配人',
  'issue.list.nextUp': '接下来',
  'issue.list.waitingOnBlockers': '等待阻塞项',
  'issue.list.noActiveSubTasks': '无活跃子任务',
  'issue.list.allSubTasksDone': '所有子任务已完成',
  'issue.list.noActionableSubTasks': '无可操作的子任务',

  // issue.recovery (25)
  'issue.recovery.states.needed': '需要恢复',
  'issue.recovery.states.inProgress': '恢复进行中',
  'issue.recovery.states.observeOnly': '观察活跃运行',
  'issue.recovery.states.escalated': '恢复已升级',
  'issue.recovery.states.resolved': '恢复已解决',
  'issue.recovery.outcomes.restored': '已恢复',
  'issue.recovery.outcomes.delegated': '已委派给跟进',
  'issue.recovery.outcomes.falsePositive': '误报',
  'issue.recovery.outcomes.blocked': '已阻塞',
  'issue.recovery.outcomes.escalated': '已升级',
  'issue.recovery.outcomes.cancelled': '已取消',
  'issue.recovery.resolveOptions.tryAgain': '重试',
  'issue.recovery.resolveOptions.tryAgainDesc': '关闭恢复并将源任务返回待办。',
  'issue.recovery.resolveOptions.markDone': '标记任务完成',
  'issue.recovery.resolveOptions.markDoneDesc': '通过记录请求的工作为已完成来恢复。',
  'issue.recovery.resolveOptions.sendForReview': '发送审阅',
  'issue.recovery.resolveOptions.sendForReviewDesc': '移交给具有实际审阅路径的审阅者。',
  'issue.recovery.resolveOptions.falsePositiveDone': '误报，完成',
  'issue.recovery.resolveOptions.falsePositiveDoneDesc': '关闭恢复并将源任务标记为完成。',
  'issue.recovery.resolveOptions.falsePositiveReview': '误报，审阅',
  'issue.recovery.resolveOptions.falsePositiveReviewDesc': '关闭恢复并将源任务发送审阅。',
  'issue.recovery.wakePolicy.correctiveWakeQueued': '纠正唤醒已排队',
  'issue.recovery.wakePolicy.escalatedToBoard': '已升级到看板',
  'issue.recovery.wakePolicy.manualRepairRequired': '需要手动修复',
  'issue.recovery.wakePolicy.monitorScheduled': '监控已计划',

  // issue.chat (24)
  'issue.chat.whatCouldBeBetter': '哪些方面可以改进？',
  'issue.chat.addShortNote': '添加简短备注',
  'issue.chat.dismiss': '关闭',
  'issue.chat.saveNote': '保存备注',
  'issue.chat.saving': '保存中...',
  'issue.chat.feedbackSharingTitle': '保存您的反馈共享偏好',
  'issue.chat.feedbackSharingDescription': '选择投票的 AI 输出是否可以与 Paperclip Labs 共享。此答案将成为未来点赞和踩的默认设置。',
  'issue.chat.voteAlwaysSaved': '此投票始终保存在本地。',
  'issue.chat.chooseAlwaysAllow': '选择 <b>始终允许</b> 以共享此投票和未来的投票 AI 输出。选择 <b>不允许</b> 以将此投票和未来投票保留在本地。',
  'issue.chat.changeInSettings': '您可以在实例设置 > 通用中稍后更改此设置。',
  'issue.chat.readTerms': '阅读我们的服务条款',
  'issue.chat.dontAllow': '不允许',
  'issue.chat.alwaysAllow': '始终允许',
  'issue.chat.hideConfirmation': '隐藏确认',
  'issue.chat.expiredConfirmation': '已过期确认',
  'issue.chat.pausedByBudget': '由于预算硬停止而被暂停。',
  'issue.chat.pausedBySystem': '被系统暂停。',
  'issue.chat.pausedManually': '被手动暂停。',
  'issue.chat.assigneePaused': '{{agent}} 已暂停。在代理恢复之前不会启动新运行。{{detail}}',
  'issue.chat.ranCommand_one': '执行了 {{count}} 条命令',
  'issue.chat.ranCommand_other': '执行了 {{count}} 条命令',
  'issue.chat.calledTool_one': '调用了 {{count}} 个工具',
  'issue.chat.calledTool_other': '调用了 {{count}} 个工具',
  'issue.chat.cmdCtrlCycleModes': 'Cmd/Ctrl+. 切换模式',

  // issue.blocked (24)
  'issue.blocked.dueNow': '现在到期',
  'issue.blocked.scheduledRelative': '计划于 {{relative}}',
  'issue.blocked.scheduled': '已计划',
  'issue.blocked.retrying': '重试中...',
  'issue.blocked.alreadyPromoted': '已提升',
  'issue.blocked.promoted': '已提升',
  'issue.blocked.retryNow': '立即重试',
  'issue.blocked.linkedTask': '链接的任务',
  'issue.blocked.linkedTasks': '链接的任务',
  'issue.blocked.needsNextStep': '此任务仍需要下一步操作。',
  'issue.blocked.runFinishedButOpen': '运行已成功完成，但此任务仍处于进行中状态，没有明确的下一步操作负责人。',
  'issue.blocked.markDoneOrCancelled': '标记为完成或取消。',
  'issue.blocked.sendForReview': '发送审阅或请求输入。',
  'issue.blocked.markBlockedWithOwner': '标记为有阻塞项所有者的阻塞状态。',
  'issue.blocked.delegateFollowUp': '委派跟进工作或排队延续。',
  'issue.blocked.correctiveWakeQueuedFor': '{{agent}} 的纠正唤醒已排队',
  'issue.blocked.theAssignee': '分配人',
  'issue.blocked.detectedProgress': '检测到进展：{{summary}}',
  'issue.blocked.itIs': '它是',
  'issue.blocked.theyAre': '它们是',
  'issue.blocked.blockedUntilTodo': '此任务的工作被阻塞，直到移回待办。评论仍会唤醒分配人处理问题或分类。',
  'issue.blocked.stalledInReview': '在审阅中停滞',
  'issue.blocked.ultimatelyWaitingOn': '最终等待',
  'issue.blocked.blockedByParkedWork': '被停放的工作阻塞',

  // issue.treeControl (23)
  'issue.treeControl.applying': '应用中...',
  'issue.treeControl.retryPreview': '重试预览',
  'issue.treeControl.previewUnavailable': '预览不可用。',
  'issue.treeControl.pauseAndStopWork': '暂停并停止工作',
  'issue.treeControl.pausedByBoard': '被看板暂停。',
  'issue.treeControl.subtreePauseActive': '子树暂停已激活。',
  'issue.treeControl.taskExecutionHeld': '任务执行被保持直到恢复。人类评论仍可唤醒分配人进行分类。',
  'issue.treeControl.rootDescendantHeld': '根和后代执行被保持直到恢复。人类评论仍可唤醒分配人进行分类。',
  'issue.treeControl.oneTaskHeld': '1 个任务被保持',
  'issue.treeControl.descendantsHeld_one': '{{count}} 个后代被保持',
  'issue.treeControl.descendantsHeld_other': '{{count}} 个后代被保持',
  'issue.treeControl.viewAffected': '查看受影响的',
  'issue.treeControl.cancelSubtreeEllipsis': '取消子树...',
  'issue.treeControl.pauseSubtreeEllipsis': '暂停子树...',
  'issue.treeControl.restoreSubtreeEllipsis': '恢复子树...',
  'issue.treeControl.pauseWorkEllipsis': '暂停工作...',
  'issue.treeControl.pausedByAncestor': '此任务被祖先暂停',
  'issue.treeControl.resumeFromRoot': '从根任务恢复以交付延迟的工作。',
  'issue.treeControl.complete': '完成',
  'issue.treeControl.onlyBoardUsersCanPreview': '只有看板用户可以预览子树控制。',
  'issue.treeControl.previewStale': '预览已过时，因为子树保持状态已更改。请重试以刷新。',
  'issue.treeControl.subtreeActionInvalid': '此子树操作当前对所选任务无效。',
  'issue.treeControl.unableToLoadPreview': '无法加载预览。',

  // issue.columns (23)
  'issue.columns.columns': '列',
  'issue.columns.desktopTaskRows': '桌面任务行',
  'issue.columns.resetDefaults': '重置默认值',
  'issue.columns.resetDefaultsHint': '状态、ID、更新时间',
  'issue.columns.id': 'ID',
  'issue.columns.assignee': '分配人',
  'issue.columns.project': '项目',
  'issue.columns.workspace': '工作区',
  'issue.columns.parent': '父任务',
  'issue.columns.statusDesc': '左侧边缘的任务状态标签。',
  'issue.columns.idDesc': '工单标识符，如 PAP-1009。',
  'issue.columns.assigneeDesc': '分配的代理或看板用户。',
  'issue.columns.updated': '更新时间',
  'issue.columns.updatedDesc': '最后更新时间。',
  'issue.columns.priority': '优先级',
  'issue.columns.priorityDesc': '任务优先级。',
  'issue.columns.size': '大小',
  'issue.columns.sizeDesc': '任务大小。',
  'issue.columns.projectDesc': '所属项目。',
  'issue.columns.workspaceDesc': '执行工作区。',
  'issue.columns.parentDesc': '父任务。',
  'issue.columns.dueDate': '截止日期',
  'issue.columns.dueDateDesc': '截止日期。',

  // secrets.form (19)
  'secrets.form.name': '名称',
  'secrets.form.key': '键',
  'secrets.form.keyOptional': '键（可选）',
  'secrets.form.autoFromName': '从名称自动生成',
  'secrets.form.provider': '提供者',
  'secrets.form.notConfigured': '未配置',
  'secrets.form.externalOnly': '仅限外部',
  'secrets.form.providerVault': '提供者保险库',
  'secrets.form.deploymentDefault': '部署默认',
  'secrets.form.defaultValue': '默认值',
  'secrets.form.managedValue': '托管值',
  'secrets.form.externalReference': '外部引用',
  'secrets.form.value': '值',
  'secrets.form.storedOnceNeverRedisplayed': '存储一次，永不重新显示',
  'secrets.form.description': '描述',
  'secrets.form.descriptionOptional': '描述（可选）',
  'secrets.form.descriptionPlaceholder': '输入描述...',
  'secrets.form.externalRefPlaceholder': '输入外部引用...',
  'secrets.form.externalRefHelp': '外部引用帮助',

  // routine.composer (18)
  'routine.composer.name': '名称',
  'routine.composer.namePlaceholder': '输入例程名称...',
  'routine.composer.description': '描述',
  'routine.composer.descriptionPlaceholder': '输入例程描述...',
  'routine.composer.instructions': '指令',
  'routine.composer.instructionsPlaceholder': '输入代理指令...',
  'routine.composer.agent': '代理',
  'routine.composer.selectAgent': '选择代理',
  'routine.composer.noAgent': '无代理',
  'routine.composer.searchAgents': '搜索代理...',
  'routine.composer.noAgentsFound': '未找到代理。',
  'routine.composer.schedule': '计划',
  'routine.composer.schedulePlaceholder': '选择计划...',
  'routine.composer.noSchedule': '无计划',
  'routine.composer.searchSchedules': '搜索计划...',
  'routine.composer.noSchedulesFound': '未找到计划。',
  'routine.composer.model': '模型',
  'routine.composer.modelPlaceholder': '选择模型...',

  // routine.toasts (18)
  'routine.toasts.created': '例程已创建',
  'routine.toasts.createdWithAgent': '例程已创建，使用代理 {{agent}}',
  'routine.toasts.createdDraft': '例程草稿已创建',
  'routine.toasts.failedToUpdate': '更新失败',
  'routine.toasts.couldNotUpdate': '无法更新例程',
  'routine.toasts.runFailed': '运行失败',
  'routine.toasts.couldNotStartRun': '无法启动运行',
  'routine.toasts.defaultAgentRequired': '需要默认代理',
  'routine.toasts.setDefaultAgent': '请设置默认代理',
  'routine.toasts.runStarted': '运行已启动',
  'routine.toasts.saved': '例程已保存',
  'routine.toasts.automationPaused': '自动化已暂停',
  'routine.toasts.automationEnabled': '自动化已启用',
  'routine.toasts.failedToSave': '保存失败',
  'routine.toasts.couldNotSave': '无法保存例程',
  'routine.toasts.conflictTitle': '冲突',
  'routine.toasts.conflictBody': '例程已被其他人修改',
  'routine.toasts.triggerCreated': '触发器已创建',

  // executionWorkspace.close (17)
  'executionWorkspace.close.retryClose': '重试关闭',
  'executionWorkspace.close.closeWorkspace': '关闭工作区',
  'executionWorkspace.close.archiveDescriptionPrefix': '归档描述前缀',
  'executionWorkspace.close.archiveDescriptionSuffix': '归档描述后缀',
  'executionWorkspace.close.checkingSafeToClose': '检查是否可以安全关闭',
  'executionWorkspace.close.failedToInspectReadiness': '检查就绪状态失败',
  'executionWorkspace.close.closeBlocked': '关闭已阻止',
  'executionWorkspace.close.closeAllowedWithWarnings': '允许关闭但有警告',
  'executionWorkspace.close.closeReady': '关闭就绪',
  'executionWorkspace.close.sharedWorkspaceDescription': '共享工作区描述',
  'executionWorkspace.close.independentCheckoutDescription': '独立检出描述',
  'executionWorkspace.close.projectPrimaryDescription': '项目主要描述',
  'executionWorkspace.close.disposableDescription': '一次性描述',
  'executionWorkspace.close.blockingTasks': '阻塞任务',
  'executionWorkspace.close.blockingReasons': '阻塞原因',
  'executionWorkspace.close.warnings': '警告',
  'executionWorkspace.close.gitStatus': 'Git 状态',

  // issue.workspace (16)
  'issue.workspace.title': '工作区',
  'issue.workspace.description': '执行工作区',
  'issue.workspace.loading': '加载中...',
  'issue.workspace.failedToLoad': '加载失败',
  'issue.workspace.noWorkspace': '无工作区',
  'issue.workspace.createWorkspace': '创建工作区',
  'issue.workspace.deleteWorkspace': '删除工作区',
  'issue.workspace.workspaceCreated': '工作区已创建',
  'issue.workspace.workspaceDeleted': '工作区已删除',
  'issue.workspace.branch': '分支',
  'issue.workspace.baseRef': '基础引用',
  'issue.workspace.status': '状态',
  'issue.workspace.lastActivity': '最后活动',
  'issue.workspace.files': '文件',
  'issue.workspace.commits': '提交',
  'issue.workspace.changes': '更改',

  // issue.scheduledRetry (14)
  'issue.scheduledRetry.title': '计划重试',
  'issue.scheduledRetry.description': '计划重试描述',
  'issue.scheduledRetry.retryAt': '重试时间',
  'issue.scheduledRetry.retryIn': '重试倒计时',
  'issue.scheduledRetry.retryNow': '立即重试',
  'issue.scheduledRetry.cancelRetry': '取消重试',
  'issue.scheduledRetry.retryCancelled': '重试已取消',
  'issue.scheduledRetry.retryStarted': '重试已开始',
  'issue.scheduledRetry.retryFailed': '重试失败',
  'issue.scheduledRetry.retryCompleted': '重试已完成',
  'issue.scheduledRetry.maxRetries': '最大重试次数',
  'issue.scheduledRetry.maxRetriesReached': '已达到最大重试次数',
  'issue.scheduledRetry.retryCount': '重试次数',
  'issue.scheduledRetry.lastRetry': '上次重试',

  // routine.dialog (10)
  'routine.dialog.createTitle': '创建例程',
  'routine.dialog.editTitle': '编辑例程',
  'routine.dialog.deleteTitle': '删除例程',
  'routine.dialog.deleteConfirm': '确认删除此例程？',
  'routine.dialog.deleteDescription': '此操作无法撤销。',
  'routine.dialog.save': '保存',
  'routine.dialog.cancel': '取消',
  'routine.dialog.create': '创建',
  'routine.dialog.update': '更新',
  'routine.dialog.delete': '删除',

  // issue.attachments (9)
  'issue.attachments.title': '附件',
  'issue.attachments.upload': '上传',
  'issue.attachments.uploading': '上传中...',
  'issue.attachments.uploadFailed': '上传失败',
  'issue.attachments.noAttachments': '无附件',
  'issue.attachments.delete': '删除',
  'issue.attachments.deleteConfirm': '确认删除此附件？',
  'issue.attachments.downloading': '下载中...',
  'issue.attachments.downloadFailed': '下载失败',

  // issue.interaction (9)
  'issue.interaction.confirm': '确认',
  'issue.interaction.cancel': '取消',
  'issue.interaction.save': '保存',
  'issue.interaction.delete': '删除',
  'issue.interaction.edit': '编辑',
  'issue.interaction.close': '关闭',
  'issue.interaction.submit': '提交',
  'issue.interaction.reset': '重置',
  'issue.interaction.clear': '清除',

  // routine.dirty (9)
  'routine.dirty.unsavedChanges': '未保存的更改',
  'routine.dirty.unsavedChangesDescription': '您有未保存的更改。是否要保存？',
  'routine.dirty.save': '保存',
  'routine.dirty.discard': '丢弃',
  'routine.dirty.cancel': '取消',
  'routine.dirty.saved': '已保存',
  'routine.dirty.discarded': '已丢弃',
  'routine.dirty.saving': '保存中...',
  'routine.dirty.discarding': '丢弃中...',

  // secrets.dialog (8)
  'secrets.dialog.createTitle': '创建密钥',
  'secrets.dialog.editTitle': '编辑密钥',
  'secrets.dialog.deleteTitle': '删除密钥',
  'secrets.dialog.deleteConfirm': '确认删除此密钥？',
  'secrets.dialog.deleteDescription': '此操作无法撤销。',
  'secrets.dialog.save': '保存',
  'secrets.dialog.cancel': '取消',
  'secrets.dialog.create': '创建',

  // plugin.toast (8)
  'plugin.toast.installed': '插件已安装',
  'plugin.toast.uninstalled': '插件已卸载',
  'plugin.toast.updated': '插件已更新',
  'plugin.toast.enabled': '插件已启用',
  'plugin.toast.disabled': '插件已禁用',
  'plugin.toast.installFailed': '安装失败',
  'plugin.toast.uninstallFailed': '卸载失败',
  'plugin.toast.updateFailed': '更新失败',

  // onboardingClassic.errors (8)
  'onboardingClassic.errors.networkError': '网络错误。请检查您的连接。',
  'onboardingClassic.errors.serverError': '服务器错误。请稍后重试。',
  'onboardingClassic.errors.timeoutError': '请求超时。请重试。',
  'onboardingClassic.errors.authError': '认证失败。请重新登录。',
  'onboardingClassic.errors.permissionError': '权限不足。请联系管理员。',
  'onboardingClassic.errors.validationError': '验证失败。请检查输入。',
  'onboardingClassic.errors.unknownError': '发生未知错误。',
  'onboardingClassic.errors.tryAgain': '请重试',

  // issue.row (7)
  'issue.row.expand': '展开',
  'issue.row.collapse': '折叠',
  'issue.row.open': '打开',
  'issue.row.copyLink': '复制链接',
  'issue.row.copyMarkdown': '复制 Markdown',
  'issue.row.archive': '归档',
  'issue.row.delete': '删除',

  // issue.planDecomposition (7)
  'issue.planDecomposition.title': '计划分解',
  'issue.planDecomposition.description': '计划分解描述',
  'issue.planDecomposition.addStep': '添加步骤',
  'issue.planDecomposition.removeStep': '移除步骤',
  'issue.planDecomposition.reorder': '重新排序',
  'issue.planDecomposition.noSteps': '无步骤',
  'issue.planDecomposition.step': '步骤',

  // issue.documents (7)
  'issue.documents.documents': '文档',
  'issue.documents.newDocument': '新建文档',
  'issue.documents.new': '新建',
  'issue.documents.documentKey': '文档键',
  'issue.documents.optionalTitle': '标题（可选）',
  'issue.documents.markdownBody': 'Markdown 内容',
  'issue.documents.createDocument': '创建文档',

  // userProfile.heroStats (7)
  'userProfile.heroStats.tasksCreated': '已创建任务',
  'userProfile.heroStats.tasksCompleted': '已完成任务',
  'userProfile.heroStats.activeDays': '活跃天数',
  'userProfile.heroStats.totalRuns': '总运行次数',
  'userProfile.heroStats.successRate': '成功率',
  'userProfile.heroStats.avgCompletionTime': '平均完成时间',
  'userProfile.heroStats.streak': '连续活跃天数',

  // issue.relatedWork (6)
  'issue.relatedWork.title': '关联工作',
  'issue.relatedWork.noRelatedWork': '无关联工作',
  'issue.relatedWork.addRelated': '添加关联',
  'issue.relatedWork.removeRelated': '移除关联',
  'issue.relatedWork.searchTasks': '搜索任务...',
  'issue.relatedWork.noMatchingTasks': '无匹配任务。',

  // plugin.localFolders (6)
  'plugin.localFolders.title': '本地文件夹',
  'plugin.localFolders.add': '添加',
  'plugin.localFolders.remove': '移除',
  'plugin.localFolders.noFolders': '无本地文件夹',
  'plugin.localFolders.selectFolder': '选择文件夹',
  'plugin.localFolders.folderAdded': '文件夹已添加',

  // onboardingChat.welcomeMessage (6)
  'onboardingChat.welcomeMessage.title': '欢迎',
  'onboardingChat.welcomeMessage.description': '欢迎使用 Paperclip',
  'onboardingChat.welcomeMessage.getStarted': '开始使用',
  'onboardingChat.welcomeMessage.skip': '跳过',
  'onboardingChat.welcomeMessage.next': '下一步',
  'onboardingChat.welcomeMessage.back': '返回',

  // issue.assignedBacklog (5)
  'issue.assignedBacklog.title': '已分配的待办',
  'issue.assignedBacklog.description': '已分配的待办描述',
  'issue.assignedBacklog.moveToTodo': '移至待办',
  'issue.assignedBacklog.stayInBacklog': '留在待办',
  'issue.assignedBacklog.noBacklog': '无待办',

  // issue.continuationHandoff (5)
  'issue.continuationHandoff.title': '延续移交',
  'issue.continuationHandoff.description': '延续移交描述',
  'issue.continuationHandoff.accept': '接受',
  'issue.continuationHandoff.decline': '拒绝',
  'issue.continuationHandoff.noHandoff': '无移交',

  // routine.policies (5)
  'routine.policies.title': '策略',
  'routine.policies.add': '添加',
  'routine.policies.remove': '移除',
  'routine.policies.noPolicies': '无策略',
  'routine.policies.edit': '编辑',

  // routine.detail (5)
  'routine.detail.title': '详情',
  'routine.detail.description': '描述',
  'routine.detail.instructions': '指令',
  'routine.detail.schedule': '计划',
  'routine.detail.agent': '代理',

  // routine.nav (5)
  'routine.nav.routines': '例程',
  'routine.nav.create': '创建',
  'routine.nav.search': '搜索',
  'routine.nav.filter': '过滤',
  'routine.nav.sort': '排序',

  // issue.runActions (4)
  'issue.runActions.stop': '停止',
  'issue.runActions.retry': '重试',
  'issue.runActions.viewLogs': '查看日志',
  'issue.runActions.viewDetails': '查看详情',

  // issue.sibling (4)
  'issue.sibling.title': '兄弟任务',
  'issue.sibling.noSiblings': '无兄弟任务',
  'issue.sibling.count_one': '{{count}} 个兄弟任务',
  'issue.sibling.count_other': '{{count}} 个兄弟任务',

  // routine.groups (4)
  'routine.groups.title': '分组',
  'routine.groups.add': '添加',
  'routine.groups.remove': '移除',
  'routine.groups.noGroups': '无分组',

  // userProfile.windowColumn (4)
  'userProfile.windowColumn.title': '窗口列',
  'userProfile.windowColumn.add': '添加',
  'userProfile.windowColumn.remove': '移除',
  'userProfile.windowColumn.noColumns': '无列',

  // userProfile.usageChart (4)
  'userProfile.usageChart.title': '使用图表',
  'userProfile.usageChart.daily': '每日',
  'userProfile.usageChart.weekly': '每周',
  'userProfile.usageChart.monthly': '每月',

  // issue.monitor (3)
  'issue.monitor.title': '监控',
  'issue.monitor.status': '状态',
  'issue.monitor.lastCheck': '上次检查',

  // issue.output (3)
  'issue.output.title': '输出',
  'issue.output.noOutput': '无输出',
  'issue.output.copy': '复制',

  // secrets.managed (3)
  'secrets.managed.title': '托管密钥',
  'secrets.managed.noManaged': '无托管密钥',
  'secrets.managed.description': '托管密钥描述',

  // secrets.awsDiscovery (3)
  'secrets.awsDiscovery.title': 'AWS 发现',
  'secrets.awsDiscovery.noDiscovery': '无发现',
  'secrets.awsDiscovery.description': 'AWS 发现描述',

  // plugin.errorDialog (3)
  'plugin.errorDialog.title': '插件错误',
  'plugin.errorDialog.description': '插件错误描述',
  'plugin.errorDialog.close': '关闭',

  // onboardingClassic.tabs (3)
  'onboardingClassic.tabs.general': '通用',
  'onboardingClassic.tabs.advanced': '高级',
  'onboardingClassic.tabs.review': '审阅',

  // onboardingClassic.adapterResult (3)
  'onboardingClassic.adapterResult.title': '适配器结果',
  'onboardingClassic.adapterResult.success': '成功',
  'onboardingClassic.adapterResult.failure': '失败',

  // issue.filters (2)
  'issue.filters.title': '过滤器',
  'issue.filters.clear': '清除',

  // issue.references (2)
  'issue.references.title': '引用',
  'issue.references.noReferences': '无引用',

  // routine.sections (2)
  'routine.sections.title': '部分',
  'routine.sections.noSections': '无部分',

  // secrets.vaultCard (2)
  'secrets.vaultCard.title': '保险库',
  'secrets.vaultCard.description': '保险库描述',

  // onboardingClassic.footer (2)
  'onboardingClassic.footer.skip': '跳过',
  'onboardingClassic.footer.continue': '继续',
};

let translatedCount = 0;
Object.entries(translations).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} keys`);

// Recalculate progress
const zhFlat2 = flatten(zhCN);
const totalKeys = Object.keys(enFlat).length;
const translated = Object.keys(zhFlat2).filter(k => {
  if (!(k in enFlat)) return false;
  const val = zhFlat2[k];
  const enVal = enFlat[k];
  return val !== enVal && typeof val === 'string';
}).length;
const remaining = Object.keys(zhFlat2).filter(k => k in enFlat && zhFlat2[k] === enFlat[k]).length;
console.log(`Progress: ${translated}/${totalKeys} (${Math.round(translated/totalKeys*100)}%)`);
console.log(`Remaining: ${remaining}`);
