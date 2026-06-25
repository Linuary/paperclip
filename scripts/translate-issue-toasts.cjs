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

// Issue toasts translations
const issueToasts = {
  'issue.toasts.taskUpdateFailed': '任务更新失败',
  'issue.toasts.unableToSaveChanges': '无法保存任务更改',
  'issue.toasts.recoveryResolutionFailed': '恢复解决方案失败',
  'issue.toasts.unableToResolveRecovery': '无法解决恢复操作',
  'issue.toasts.unableToApplySubtreeControl': '无法应用子树控制',
  'issue.toasts.pleaseTryAgain': '请重试。',
  'issue.toasts.workPaused': '工作已暂停',
  'issue.toasts.workResumed': '工作已恢复',
  'issue.toasts.subtreeResumed': '子树已恢复',
  'issue.toasts.subtreePaused': '子树已暂停',
  'issue.toasts.subtreeControlApplied': '子树控制已应用。',
  'issue.toasts.activeTaskPauseReleased': '活动任务暂停已释放。',
  'issue.toasts.activeSubtreePauseReleased': '活动子树暂停已释放。',
  'issue.toasts.runsCancelled_one': '{{count}} 个运行已取消。',
  'issue.toasts.runsCancelled_other': '{{count}} 个运行已取消。',
  'issue.toasts.unableToPauseWork': '无法暂停工作',
  'issue.toasts.runStoppedTaskDone': '运行已停止且任务已完成',
  'issue.toasts.runStoppedTaskCancelled': '运行已停止且任务已取消',
  'issue.toasts.runStoppedTaskUpdateFailed': '运行已停止；任务更新失败',
  'issue.toasts.stopFailed': '停止失败',
  'issue.toasts.unableToStopRun': '无法停止运行',
  'issue.toasts.markedDone': '已标记为完成',
  'issue.toasts.markedCancelled': '已标记为取消',
  'issue.toasts.markAsFailed': '标记失败',
  'issue.toasts.unableToMarkAsDone': '无法标记为完成',
  'issue.toasts.unableToMarkAsCancelled': '无法标记为取消',
  'issue.toasts.priorityUpdated': '优先级已更新',
  'issue.toasts.priorityUpdateFailed': '优先级更新失败',
  'issue.toasts.sizeUpdated': '大小已更新',
  'issue.toasts.sizeUpdateFailed': '大小更新失败',
  'issue.toasts.assigneeUpdated': '分配人已更新',
  'issue.toasts.assigneeUpdateFailed': '分配人更新失败',
  'issue.toasts.dueDateUpdated': '截止日期已更新',
  'issue.toasts.dueDateUpdateFailed': '截止日期更新失败',
  'issue.toasts.startDateUpdated': '开始日期已更新',
  'issue.toasts.startDateUpdateFailed': '开始日期更新失败',
  'issue.toasts.projectUpdated': '项目已更新',
  'issue.toasts.projectUpdateFailed': '项目更新失败',
  'issue.toasts.milestoneUpdated': '里程碑已更新',
  'issue.toasts.milestoneUpdateFailed': '里程碑更新失败',
  'issue.toasts.labelsUpdated': '标签已更新',
  'issue.toasts.labelsUpdateFailed': '标签更新失败',
  'issue.toasts.sprintUpdated': '迭代已更新',
  'issue.toasts.sprintUpdateFailed': '迭代更新失败',
  'issue.toasts.parentUpdated': '父任务已更新',
  'issue.toasts.parentUpdateFailed': '父任务更新失败',
  'issue.toasts.dependenciesUpdated': '依赖已更新',
  'issue.toasts.dependenciesUpdateFailed': '依赖更新失败',
  'issue.toasts.relatedIssuesUpdated': '关联问题已更新',
  'issue.toasts.relatedIssuesUpdateFailed': '关联问题更新失败',
  'issue.toasts.watchersUpdated': '关注者已更新',
  'issue.toasts.watchersUpdateFailed': '关注者更新失败',
  'issue.toasts.subscribersUpdated': '订阅者已更新',
  'issue.toasts.subscribersUpdateFailed': '订阅者更新失败',
  'issue.toasts.estimatedTimeUpdated': '预估时间已更新',
  'issue.toasts.estimatedTimeUpdateFailed': '预估时间更新失败',
  'issue.toasts.actualTimeUpdated': '实际时间已更新',
  'issue.toasts.actualTimeUpdateFailed': '实际时间更新失败',
  'issue.toasts.categoryUpdated': '分类已更新',
  'issue.toasts.categoryUpdateFailed': '分类更新失败',
  'issue.toasts.severityUpdated': '严重程度已更新',
  'issue.toasts.severityUpdateFailed': '严重程度更新失败',
  'issue.toasts.typeUpdated': '类型已更新',
  'issue.toasts.typeUpdateFailed': '类型更新失败',
  'issue.toasts.statusUpdated': '状态已更新',
  'issue.toasts.statusUpdateFailed': '状态更新失败',
  'issue.toasts.resolutionUpdated': '解决方案已更新',
  'issue.toasts.resolutionUpdateFailed': '解决方案更新失败',
  'issue.toasts.titleUpdated': '标题已更新',
  'issue.toasts.titleUpdateFailed': '标题更新失败',
  'issue.toasts.descriptionUpdated': '描述已更新',
  'issue.toasts.descriptionUpdateFailed': '描述更新失败',
  'issue.toasts.blockersUpdated': '阻塞项已更新',
  'issue.toasts.blockersUpdateFailed': '阻塞项更新失败',
  'issue.toasts.attachmentsUpdated': '附件已更新',
  'issue.toasts.attachmentsUpdateFailed': '附件更新失败',
  'issue.toasts.commentsUpdated': '评论已更新',
  'issue.toasts.commentsUpdateFailed': '评论更新失败',
  'issue.toasts.activityUpdated': '活动已更新',
  'issue.toasts.activityUpdateFailed': '活动更新失败',
  'issue.toasts.subtasksUpdated': '子任务已更新',
  'issue.toasts.subtasksUpdateFailed': '子任务更新失败',
  'issue.toasts.checklistUpdated': '检查清单已更新',
  'issue.toasts.checklistUpdateFailed': '检查清单更新失败',
  'issue.toasts.timeTrackingUpdated': '时间追踪已更新',
  'issue.toasts.timeTrackingUpdateFailed': '时间追踪更新失败',
  'issue.toasts.customFieldsUpdated': '自定义字段已更新',
  'issue.toasts.customFieldsUpdateFailed': '自定义字段更新失败',
  'issue.toasts.reviewUpdated': '审阅已更新',
  'issue.toasts.reviewUpdateFailed': '审阅更新失败',
  'issue.toasts.approvalUpdated': '审批已更新',
  'issue.toasts.approvalUpdateFailed': '审批更新失败',
  'issue.toasts.workflowUpdated': '工作流已更新',
  'issue.toasts.workflowUpdateFailed': '工作流更新失败',
  'issue.toasts.automationUpdated': '自动化已更新',
  'issue.toasts.automationUpdateFailed': '自动化更新失败',
  'issue.toasts.notificationsUpdated': '通知已更新',
  'issue.toasts.notificationsUpdateFailed': '通知更新失败',
};

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

let translatedCount = 0;
Object.entries(issueToasts).forEach(([key, value]) => {
  const enValue = enFlat[key];
  if (enValue && (zhCN[key] === enValue || !zhCN[key])) {
    setNestedValue(zhCN, key, value);
    translatedCount++;
  }
});

fs.writeFileSync(zhPath, JSON.stringify(zhCN, null, 2), 'utf8');
console.log(`Translated ${translatedCount} issue.toasts keys`);
