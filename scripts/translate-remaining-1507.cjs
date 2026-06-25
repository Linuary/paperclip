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

const translations = {
  // secrets.form (19)
  'secrets.form.pasteNewValue': '粘贴新值',
  'secrets.form.rotateRefHelp': '在更改此 Paperclip 引用之前，请先在提供者中轮换实际值。',
  'secrets.form.defaultVaultHelp': '使用部署默认值轮换可保留当前回退行为。',
  'secrets.form.deploymentHelp': '现有的部署级提供者设置仍可用于向后兼容。',
  'secrets.form.displayname': '显示名称',
  'secrets.form.vaultNamePlaceholder': '生产本地保险库',
  'secrets.form.defaultFor': '{{provider}} 的默认值',
  'secrets.form.awsRegion': 'AWS 区域',
  'secrets.form.namespace': '命名空间',
  'secrets.form.secretNamePrefix': '密钥名称前缀',
  'secrets.form.kmsKeyId': 'KMS 密钥 ID',
  'secrets.form.ownerTag': '所有者标签',
  'secrets.form.environmentTag': '环境标签',
  'secrets.form.projectId': '项目 ID',
  'secrets.form.address': '地址',
  'secrets.form.mountPath': '挂载路径',
  'secrets.form.secretPathPrefix': '密钥路径前缀',
  'secrets.form.backupReminder': '我了解备份和恢复需要数据库元数据和本地加密主密钥文件。',
  'secrets.form.comingSoonNotice': '此提供者可以保存草稿路由元数据，但在提供者模块实现和审核之前，运行时写入和解析将保持禁用。',

  // routine.composer (18)
  'routine.composer.routineTitle': '例程标题',
  'routine.composer.for': '对于',
  'routine.composer.in': '在',
  'routine.composer.assignee': '分配人',
  'routine.composer.noAssignee': '未分配',
  'routine.composer.searchAssignees': '搜索分配人...',
  'routine.composer.noAssigneesFound': '未找到分配人。',
  'routine.composer.project': '项目',
  'routine.composer.noProject': '无项目',
  'routine.composer.searchProjects': '搜索项目...',
  'routine.composer.noProjectsFound': '未找到项目。',
  'routine.composer.addInstructions': '添加指令...',
  'routine.composer.advancedDelivery': '高级交付设置',
  'routine.composer.advancedDeliveryDescription': '将策略控制保持为工作定义的次要内容。',
  'routine.composer.concurrency': '并发',
  'routine.composer.catchUp': '追赶',
  'routine.composer.footerDescription': '创建后，Paperclip 会直接带您进入触发器设置。草稿例程将保持暂停状态，直到您添加默认代理。',
  'routine.composer.failedToCreate': '创建例程失败',

  // routine.toasts (18)
  'routine.toasts.failedToAddTrigger': '添加触发器失败',
  'routine.toasts.couldNotCreateTrigger': 'Paperclip 无法创建触发器。',
  'routine.toasts.triggerSaved': '触发器已保存',
  'routine.toasts.triggerSavedBody': '例程节奏更新已保存。',
  'routine.toasts.failedToUpdateTrigger': '更新触发器失败',
  'routine.toasts.couldNotUpdateTrigger': 'Paperclip 无法更新触发器。',
  'routine.toasts.failedToDeleteTrigger': '删除触发器失败',
  'routine.toasts.couldNotDeleteTrigger': 'Paperclip 无法删除触发器。',
  'routine.toasts.secretRotated': 'Webhook 密钥已轮换',
  'routine.toasts.failedToRotateSecret': '轮换 Webhook 密钥失败',
  'routine.toasts.couldNotRotateSecret': 'Paperclip 无法轮换 Webhook 密钥。',
  'routine.toasts.triggerRestored': 'Webhook 触发器已恢复',
  'routine.toasts.triggersRestored': '{{count}} 个 Webhook 触发器已恢复',
  'routine.toasts.failedToRestore': '恢复修订版本失败',
  'routine.toasts.couldNotRestore': 'Paperclip 无法恢复修订版本。',
  'routine.toasts.restoredRevision': '已将修订版本 {{from}} 恢复为修订版本 {{to}}',
  'routine.toasts.restoredWithSecrets': '触发器启用状态已从快照恢复。新的 Webhook 密钥可在上方横幅中查看。',
  'routine.toasts.restoredWithoutSecrets': '触发器启用状态已从快照恢复。',

  // executionWorkspace.close (17)
  'executionWorkspace.close.aheadBehind': '领先 / 落后',
  'executionWorkspace.close.dirtyTrackedFiles': '已修改的跟踪文件',
  'executionWorkspace.close.unknown': '未知',
  'executionWorkspace.close.notSet': '未设置',
  'executionWorkspace.close.otherLinkedTasks': '其他链接的任务',
  'executionWorkspace.close.attachedRuntimeServices': '附加的运行时服务',
  'executionWorkspace.close.noAdditionalDetails': '无额外详情',
  'executionWorkspace.close.cleanupActions': '清理操作',
  'executionWorkspace.close.cleanupPreviouslyFailed': '此工作区的清理操作之前失败。重试关闭将重新运行清理流程，如果成功将更新工作区状态。',
  'executionWorkspace.close.alreadyArchived': '此工作区已归档。',
  'executionWorkspace.close.repoRoot': '仓库根目录：',
  'executionWorkspace.close.workspacePath': '工作区路径：',
  'executionWorkspace.close.lastChecked': '上次检查于 {{date}}',
  'executionWorkspace.close.workspaceCloseRetried': '工作区关闭已重试',
  'executionWorkspace.close.workspaceClosed': '工作区已关闭',
  'executionWorkspace.close.failedToCloseWorkspace': '关闭工作区失败',
  'executionWorkspace.close.unknownError': '未知错误',

  // issue.workspace (16)
  'issue.workspace.projectDefault': '项目默认',
  'issue.workspace.newIsolated': '新建隔离工作区',
  'issue.workspace.reuseExisting': '重用现有工作区',
  'issue.workspace.existingIsolated': '现有隔离工作区',
  'issue.workspace.repo': '仓库',
  'issue.workspace.reusedWorkspace': '重用的工作区',
  'issue.workspace.projectDefaultLower': '项目默认',
  'issue.workspace.freshIsolatedWillBeCreated': '此任务运行时将创建一个新的隔离工作区。',
  'issue.workspace.willReuseExisting': '此任务运行时将重用现有工作区。',
  'issue.workspace.willUseProjectDefault': '此任务运行时将使用项目默认工作区配置。',
  'issue.workspace.reusing': '重用：',
  'issue.workspace.current': '当前：',
  'issue.workspace.viewDetails': '查看工作区详情 →',
  'issue.workspace.chooseExisting': '选择现有工作区',
  'issue.workspace.browseFiles': '浏览文件…',
  'issue.workspace.openFileByPath': '按路径打开文件…',

  // issue.scheduledRetry (14)
  'issue.scheduledRetry.continuationScheduled': '延续已计划',
  'issue.scheduledRetry.retryScheduled': '重试已计划',
  'issue.scheduledRetry.automaticContinuation': '自动延续',
  'issue.scheduledRetry.automaticRetry': '自动重试',
  'issue.scheduledRetry.pendingSchedule': '待定计划',
  'issue.scheduledRetry.pullContinuationForward': '立即将延续提前',
  'issue.scheduledRetry.pullRetryForward': '立即将重试提前',
  'issue.scheduledRetry.replacesRun': '替换运行',
  'issue.scheduledRetry.lastAttemptFailed': '上次尝试失败：{{error}}。Paperclip 将自动重试。',
  'issue.scheduledRetry.promotingScheduledRetry': '提升计划重试',
  'issue.scheduledRetry.alreadyPromotedRunStarting': '已提升 — 运行即将开始',
  'issue.scheduledRetry.promotedRunStarting': '已提升 — 运行即将开始',
  'issue.scheduledRetry.couldntRetryNow': '无法立即重试',
  'issue.scheduledRetry.tryAgain': '重试',

  // routine.dialog (10)
  'routine.dialog.runRoutine': '运行例程',
  'routine.dialog.runRoutineDescription': '选择此运行的代理和可选项目。例程默认值已预填且不会更改。',
  'routine.dialog.agentRequired': '代理 *',
  'routine.dialog.noAgentsFound': '未找到代理。',
  'routine.dialog.noProject': '无项目',
  'routine.dialog.noProjectsFound': '未找到项目。',
  'routine.dialog.chooseAValue': '选择一个值',
  'routine.dialog.defaultAgentRequired': '此运行需要默认代理。',
  'routine.dialog.missing': '缺少：{{fields}}',
  'routine.dialog.chooseWorkspaceBeforeRunning': '运行前请选择一个现有工作区。',

  // issue.interaction (9)
  'issue.interaction.wakesOnConfirm': '确认时唤醒',
  'issue.interaction.wakesAssignee': '唤醒分配人',
  'issue.interaction.suggestedTaskTree': '建议的任务树',
  'issue.interaction.questionsForOperator': '操作员问题',
  'issue.interaction.checkboxConfirmationRequested': '复选框确认已请求',
  'issue.interaction.planReview': '计划审阅',
  'issue.interaction.confirmationRequested': '确认已请求',
  'issue.interaction.proposedBy': '由 {{name}} 提议',
  'issue.interaction.on': '于 {{date}}',

  // routine.dirty (9)
  'routine.dirty.theTitle': '标题',
  'routine.dirty.theDescription': '描述',
  'routine.dirty.theProject': '项目',
  'routine.dirty.theDefaultAgent': '默认代理',
  'routine.dirty.thePriority': '优先级',
  'routine.dirty.theConcurrencyPolicy': '并发策略',
  'routine.dirty.theCatchUpPolicy': '追赶策略',
  'routine.dirty.theVariables': '变量',
  'routine.dirty.theSecrets': '密钥',

  // issue.columns (8)
  'issue.columns.id': 'ID',
  'issue.columns.labelsDesc': '任务标签和标记。',
  'issue.columns.live': '实时',
  'issue.columns.subtasksRunningBelow': '{{count}} 个子任务正在运行',
  'issue.columns.unassigned': '未分配',
  'issue.columns.noProject': '无项目',
  'issue.columns.filterByWorkspace': '按工作区过滤',
  'issue.columns.subTask': '子任务',

  // issue.attachments (8)
  'issue.attachments.attachments': '附件',
  'issue.attachments.openInNewTab': '在新标签页中打开',
  'issue.attachments.deleteAttachment': '删除附件',
  'issue.attachments.attachmentMeta': '附件 · {{type}} · {{size}}',
  'issue.attachments.loadingPreview': '加载预览...',
  'issue.attachments.markdownPreviewError': '无法加载 Markdown 预览。',
  'issue.attachments.deleteAttachmentConfirm': '删除此附件？此操作无法撤销。',
  'issue.attachments.deleting': '删除中...',

  // secrets.dialog (8)
  'secrets.dialog.updateExternalDesc': '创建指向现有提供者密钥的新 Paperclip 元数据版本。Paperclip 不会写入新的提供者值。',
  'secrets.dialog.updateValueDesc': '创建新的提供者支持版本。固定到最新的消费者将在下次运行时获取新值。',
  'secrets.dialog.place': '个位置',
  'secrets.dialog.places': '个位置',
  'secrets.dialog.vaultDescription': '仅保存非敏感的路由元数据。凭据保留在运行时环境或提供者身份中。',
  'secrets.dialog.removeVaultAwsNote': '这不会删除远程 AWS Secrets Manager 保险库、密钥或任何 AWS 数据。',
  'secrets.dialog.removeVaultGenericNote': '这不会删除任何远程提供者数据。',
  'secrets.dialog.removeVaultImpact': '使用此保险库的密钥将失去保险库关联，直到您分配另一个保险库。',

  // onboardingClassic.errors (8)
  'onboardingClassic.errors.createOrSelectCompany': '在测试适配器环境之前，请创建或选择一个公司。',
  'onboardingClassic.errors.adapterTestFailed': '适配器环境测试失败',
  'onboardingClassic.errors.failedToCreateCompany': '创建公司失败',
  'onboardingClassic.errors.opencodeModelRequired': 'OpenCode 需要提供者/模型格式的显式模型。',
  'onboardingClassic.errors.failedToCreateAgent': '创建代理失败',
  'onboardingClassic.errors.retriedButStillFailing': '已在适配器配置中取消设置 ANTHROPIC_API_KEY 后重试，但环境测试仍然失败。',
  'onboardingClassic.errors.failedToUnsetKey': '取消设置 ANTHROPIC_API_KEY 并重试失败。',
  'onboardingClassic.errors.failedToCreateTask': '创建任务失败',

  // issue.row (7)
  'issue.row.productivityReview': '生产力审阅：{{trigger}}',
  'issue.row.productivityReviewOpen': '生产力审阅已打开',
  'issue.row.parkedBlockerTitle': '被停放的工作阻塞 — 至少一个分配的阻塞项在待办中，不会唤醒其分配人。',
  'issue.row.parkedBlocker': '被停放的工作阻塞',
  'issue.row.markAsRead': '标记为已读',
  'issue.row.dismissFromInbox': '从收件箱中关闭',
  'issue.row.recoveryTooltip': '{{label}} — 打开源任务以操作。',

  // issue.documents (7)
  'issue.documents.outOfDate': '已过期',
  'issue.documents.conflictDescription': '您在编辑时此文档已更改。您的本地草稿已保留，自动保存已暂停。',
  'issue.documents.hideRemote': '隐藏远程',
  'issue.documents.reviewRemote': '审阅远程',
  'issue.documents.keepMyDraft': '保留我的草稿',
  'issue.documents.reloadRemote': '重新加载远程',
  'issue.documents.overwriteRemote': '覆盖远程',

  // userProfile.heroStats (7)
  'userProfile.heroStats.allTimeTokens': '总令牌数',
  'userProfile.heroStats.spent': '已花费 {{amount}}',
  'userProfile.heroStats.rate': '{{rate}} 费率',
  'userProfile.heroStats.openAssigned': '已分配的开放任务',
  'userProfile.heroStats.created': '已创建 {{count}}',
  'userProfile.heroStats.sevenDayActions': '7 天操作',
  'userProfile.heroStats.comments': '{{count}} 条评论',

  // issue.planDecomposition (6)
  'issue.planDecomposition.acceptedRevisions': '{{count}} 个已接受的计划修订',
  'issue.planDecomposition.childrenCreated': '已创建 {{requested}} 个子任务中的 {{created}} 个',
  'issue.planDecomposition.idempotentClaim': '幂等声明',
  'issue.planDecomposition.started': '开始于 {{time}}',
  'issue.planDecomposition.planDocument': '计划文档',
  'issue.planDecomposition.inFlight': '进行中',

  // issue.relatedWork (6)
  'issue.relatedWork.references': '引用',
  'issue.relatedWork.referencesDesc': '此任务当前在其标题、描述、评论或文档中指向的其他任务。',
  'issue.relatedWork.noReferences': '此任务尚未引用任何其他任务。',
  'issue.relatedWork.referencedBy': '被引用',
  'issue.relatedWork.referencedByDesc': '当前指向此任务的其他任务。',
  'issue.relatedWork.noReferencedBy': '尚无其他任务引用此任务。',

  // plugin.localFolders (6)
  'plugin.localFolders.notRequested': '未请求',
  'plugin.localFolders.savedWithWarning': '本地文件夹已保存，但验证仍需关注。',
  'plugin.localFolders.notInspected': '未检查',
  'plugin.localFolders.missing': '缺失',
  'plugin.localFolders.missingCount': '{{count}} 个缺失',
  'plugin.localFolders.rootNotInspected': '配置的根目录未被检查。',

  // onboardingChat.welcomeMessage (6)
  'onboardingChat.welcomeMessage.greeting': '您好！感谢让我来领导 {{companyName}}。',
  'onboardingChat.welcomeMessage.mission': '我们的使命是：{{companyGoal}}',
  'onboardingChat.welcomeMessage.readyToPlan': '我已准备好为我们应该招募谁制定计划。要我开始吗？',
  'onboardingChat.welcomeMessage.letsDiscuss': '先讨论一下',
  'onboardingChat.welcomeMessage.wakingUp': '{{agentName}} 正在唤醒...',
  'onboardingChat.welcomeMessage.composingMessage': '{{agentName}} 正在撰写消息...',

  // issue.assignedBacklog (5)
  'issue.assignedBacklog.defaultAssignee': '分配人',
  'issue.assignedBacklog.willNotBeWoken': '在状态更改为之前不会被唤醒',
  'issue.assignedBacklog.commentsStillWake': '评论仍会唤醒分配人处理问题或分类。仅在工作被故意搁置时才保持此停放状态。',
  'issue.assignedBacklog.resuming': '恢复中…',
  'issue.assignedBacklog.resumeNow': '立即恢复',

  // issue.continuationHandoff (5)
  'issue.continuationHandoff.defaultTitle': '延续移交',
  'issue.continuationHandoff.collapse': '折叠延续移交',
  'issue.continuationHandoff.expand': '展开延续移交',
  'issue.continuationHandoff.handoffBadge': '移交',
  'issue.continuationHandoff.revision': '修订版本 {{number}}',

  // routine.policies (5)
  'routine.policies.coalesceIfActive': '如果运行已在进行中，则只保留一个后续运行排队。',
  'routine.policies.alwaysEnqueue': '排队每个触发器事件，即使例程正在运行。',
  'routine.policies.skipIfActive': '在运行仍在进行中时丢弃新的触发器事件。',
  'routine.policies.skipMissed': '忽略调度器或例程暂停期间错过的窗口。',
  'routine.policies.enqueueMissedWithCap': '在恢复后以有上限的批次追赶错过的计划窗口。',

  // routine.detail (5)
  'routine.detail.skipToSection': '跳转到部分',
  'routine.detail.routineTitle': '例程标题',
  'routine.detail.pauseTriggers': '暂停自动触发器',
  'routine.detail.enableTriggers': '启用自动触发器',
  'routine.detail.couldNotLoad': '无法加载此例程。',

  // routine.nav (5)
  'routine.nav.groupOperate': '操作',
  'routine.nav.triggers': '触发器',
  'routine.nav.delivery': '交付',
  'routine.nav.runs': '运行',
  'routine.nav.routineSections': '例程部分',

  // issue.runActions (4)
  'issue.runActions.stopAndCancel': '停止并取消',
  'issue.runActions.stoppingAndCancelling': '停止并取消中...',
  'issue.runActions.stopAndDone': '停止并完成',
  'issue.runActions.stoppingAndMarkingDone': '停止并标记完成中...',

  // issue.sibling (4)
  'issue.sibling.subTaskNavigation': '子任务导航',
  'issue.sibling.previous': '上一个',
  'issue.sibling.previousSubTask': '上一个子任务',
  'issue.sibling.nextSubTask': '下一个子任务',

  // routine.groups (4)
  'routine.groups.noProject': '无项目',
  'routine.groups.unknownProject': '未知项目',
  'routine.groups.unassigned': '未分配',
  'routine.groups.unknownAgent': '未知代理',

  // userProfile.windowColumn (4)
  'userProfile.windowColumn.done': '完成',
  'userProfile.windowColumn.touched': '已触及',
  'userProfile.windowColumn.comments': '评论',
  'userProfile.windowColumn.spend': '花费',

  // userProfile.usageChart (4)
  'userProfile.usageChart.last14Days': '最近 14 天',
  'userProfile.usageChart.tokensTotal': '令牌总数',
  'userProfile.usageChart.tokensPerDay': '令牌/天',
  'userProfile.usageChart.completions': '完成次数',

  // issue.monitor (3)
  'issue.monitor.scheduled': '监控已计划',
  'issue.monitor.checking': '检查中...',
  'issue.monitor.checkNow': '立即检查',

  // issue.output (3)
  'issue.output.taskOutputs': '任务输出',
  'issue.output.alsoProduced': '同时产生',
  'issue.output.fileDetailsUnavailable': '文件详情不可用',

  // secrets.managed (3)
  'secrets.managed.managedExplanation': 'Paperclip 托管密钥在选定的提供者中创建，未来的轮换通过 Paperclip 写入新的提供者版本。',
  'secrets.managed.awsManagedPath': 'AWS 托管路径：',
  'secrets.managed.neverRedisplays': 'Paperclip 永远不会重新显示存储的值。',

  // secrets.awsDiscovery (3)
  'secrets.awsDiscovery.enterRegion': '发现前请输入 AWS 区域。',
  'secrets.awsDiscovery.candidateCount': '来自 {{sampleCount}} 个采样密钥的 {{count}} 个候选{{plural}}',
  'secrets.awsDiscovery.noStablePrefix': '未检测到稳定的命名空间或前缀',

  // onboardingClassic.tabs (3)
  'onboardingClassic.tabs.company': '公司',
  'onboardingClassic.tabs.task': '任务',
  'onboardingClassic.tabs.launch': '启动',

  // onboardingClassic.adapterResult (3)
  'onboardingClassic.adapterResult.passed': '通过',
  'onboardingClassic.adapterResult.warnings': '警告',
  'onboardingClassic.adapterResult.hint': '提示：',

  // issue.filters (2)
  'issue.filters.filters': '过滤器',
  'issue.filters.filtersCount': '过滤器：{{count}}',

  // issue.references (2)
  'issue.references.addedReferences': '已添加的引用',
  'issue.references.removedReferences': '已移除的引用',

  // routine.sections (2)
  'routine.sections.delivery': '交付',
  'routine.sections.runs': '运行',

  // secrets.vaultCard (2)
  'secrets.vaultCard.awsVaultDisabled': 'AWS 保险库已禁用 — 管理',
  'secrets.vaultCard.configureAwsVault': '配置 AWS 提供者保险库以启用远程导入',

  // plugin.errorDialog (2)
  'plugin.errorDialog.noSummary': '无错误摘要可用。',
  'plugin.errorDialog.noErrorMessage': '插件进入错误状态但没有存储的错误消息。',

  // plugin.toast (2)
  'plugin.toast.enableFailed': '启用插件失败',
  'plugin.toast.disableFailed': '禁用插件失败',

  // onboardingClassic.footer (2)
  'onboardingClassic.footer.creating': '创建中...',
  'onboardingClassic.footer.createAndOpen': '创建并打开任务',

  // skills.* (all single-key sections)
  'skills.skillsImported': '技能已导入',
  'skills.skillsAdded': '已添加 {{count}} 个技能。',
  'skills.importWarnings': '导入警告',
  'skills.skillImportFailed': '技能导入失败',
  'skills.failedToImport': '导入技能源失败。',
  'skills.skillForkCreated': '技能分支已创建',
  'skills.skillCreated': '技能已创建',
  'skills.skillNowEditable': '{{name}} 现在可在 Paperclip 工作区中编辑。',
  'skills.skillCreationFailed': '技能创建失败',
  'skills.failedToCreateSkill': '创建技能失败。',
  'skills.scanningWorkspaces': '正在扫描项目工作区中的技能...',
  'skills.refreshingSkillsList': '正在刷新技能列表...',
  'skills.projectScanComplete': '项目技能扫描完成',
  'skills.skillConflictsFound': '发现技能冲突',
  'skills.scanWarnings': '扫描警告',
  'skills.projectScanFailed': '项目技能扫描失败',
  'skills.failedToScan': '扫描项目工作区失败。',
  'skills.skillSaved': '技能已保存',
  'skills.failedToSaveFile': '保存技能文件失败。',
  'skills.starFailed': '收藏失败',
  'skills.failedToUpdateStar': '更新收藏失败。',
  'skills.sharingUpdated': '共享已更新',
  'skills.sharingUpdateFailed': '共享更新失败',
  'skills.failedToUpdateSharing': '更新共享范围失败。',
  'skills.skillUpdated': '技能已更新',
  'skills.pinnedTo': '已固定到 {{ref}}',
  'skills.updateFailed': '更新失败',
  'skills.failedToInstallUpdate': '安装技能更新失败。',
  'skills.agentsUpdated': '代理已更新',
  'skills.agentsAttached': '已附加 {{count}} 个代理。',
  'skills.failedToUpdateAgentSkills': '更新代理技能失败。',
  'skills.skillInstalled': '技能已安装',
  'skills.skillUpToDate': '技能已是最新',
  'skills.installWarnings': '安装警告',
  'skills.failedToInstallCatalog': '安装目录技能失败。',
  'skills.skillRemoved': '技能已移除',
  'skills.skillRemovedFromLibrary': '{{name}} 已从公司技能库中移除。',
  'skills.failedToRemoveSkill': '移除技能失败。',
  'skills.skillsStore': '技能商店',
  'skills.discoverInstallForkShare': '发现、安装、分支、共享',
  'skills.allSources': '所有来源',
  'skills.new': '新建',
  'skills.createNewSkill': '创建新技能',
  'skills.browseCatalog': '浏览目录',
  'skills.importFromPathOrUrl': '从路径或 URL 导入',
  'skills.scanProjectWorkspaces': '扫描项目工作区',
  'skills.catalog': '目录',
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
