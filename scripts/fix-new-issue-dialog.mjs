import fs from 'node:fs';

let content = fs.readFileSync('ui/src/components/NewIssueDialog.tsx', 'utf-8');

// 1. Add import for useTranslation and t
content = content.replace(
  "import { getTrustPreset } from \"../lib/trust-policy-ui\";",
  "import { getTrustPreset } from \"../lib/trust-policy-ui\";\nimport { useTranslation, t } from \"@/i18n\";"
);

// 2. Add `const { t } = useTranslation()` to main component
content = content.replace(
  "export function NewIssueDialog() {\n  const { newIssueOpen, newIssueDefaults, closeNewIssue } = useDialog();",
  "export function NewIssueDialog() {\n  const { t } = useTranslation();\n  const { newIssueOpen, newIssueDefaults, closeNewIssue } = useDialog();"
);

// 3. Replace thinking effort labels
content = content.replace(/label: "Default"/g, 'label: t("issue.newDialog.thinkingEffort.default", { defaultValue: "Default" })');
content = content.replace(/label: "Low"/g, 'label: t("issue.priority.low", { defaultValue: "Low" })');
content = content.replace(/label: "Medium"/g, 'label: t("issue.priority.medium", { defaultValue: "Medium" })');
content = content.replace(/label: "High"/g, 'label: t("issue.priority.high", { defaultValue: "High" })');
content = content.replace(/label: "Minimal"/g, 'label: t("issue.newDialog.thinkingEffort.minimal", { defaultValue: "Minimal" })');
content = content.replace(/label: "X-High"/g, 'label: t("issue.newDialog.thinkingEffort.xhigh", { defaultValue: "X-High" })');
content = content.replace(/label: "Max"/g, 'label: t("issue.newDialog.thinkingEffort.max", { defaultValue: "Max" })');

// 4. Replace status labels
content = content.replace(/label: "Backlog"/g, 'label: t("issue.status.backlog", { defaultValue: "Backlog" })');
content = content.replace(/label: "Todo"/g, 'label: t("issue.status.todo", { defaultValue: "Todo" })');
content = content.replace(/label: "In Progress"/g, 'label: t("issue.status.inProgress", { defaultValue: "In Progress" })');
content = content.replace(/label: "In Review"/g, 'label: t("issue.status.inReview", { defaultValue: "In Review" })');
content = content.replace(/label: "Done"/g, 'label: t("issue.status.done", { defaultValue: "Done" })');

// 5. Replace priority labels
content = content.replace(/label: "Critical"/g, 'label: t("issue.priority.critical", { defaultValue: "Critical" })');

// 6. Replace adapter options labels
content = content.replace(/\? "Claude options"/g, '? t("issue.newDialog.claudeOptions", { defaultValue: "Claude options" })');
content = content.replace(/\? "Codex options"/g, '? t("issue.newDialog.codexOptions", { defaultValue: "Codex options" })');
content = content.replace(/\? "OpenCode options"/g, '? t("issue.newDialog.openCodeOptions", { defaultValue: "OpenCode options" })');
content = content.replace(/: "Agent options"/g, ': t("issue.newDialog.agentOptions", { defaultValue: "Agent options" })');

// 7. Replace dialog title
content = content.replace(
  'isSubIssueMode ? "New sub-task" : "New task"',
  'isSubIssueMode ? t("issue.newDialog.newSubTask", { defaultValue: "New sub-task" }) : t("issue.newDialog.newTask", { defaultValue: "New task" })'
);

// 8. Replace task title placeholder
content = content.replace(
  'placeholder="Task title"',
  'placeholder={t("issue.newDialog.taskTitlePlaceholder", { defaultValue: "Task title" })}'
);

// 9. Replace description placeholder
content = content.replace(
  'placeholder="Add description..."',
  'placeholder={t("issue.newDialog.descriptionPlaceholder", { defaultValue: "Add description..." })}'
);

// 10. Replace assignee selector
content = content.replace('placeholder="Assignee"', 'placeholder={t("issue.chat.assignee", { defaultValue: "Assignee" })}');
content = content.replace('noneLabel="No assignee"', 'noneLabel={t("issue.chat.noAssignee", { defaultValue: "No assignee" })}');

// 11. Replace project selector
content = content.replace('placeholder="Project"', 'placeholder={t("issue.newDialog.project", { defaultValue: "Project" })}');
content = content.replace('noneLabel="No project"', 'noneLabel={t("issue.newDialog.noProject", { defaultValue: "No project" })}');

// 12. Replace reviewer selector
content = content.replace('placeholder="Reviewer"', 'placeholder={t("issue.newDialog.reviewer", { defaultValue: "Reviewer" })}');
content = content.replace('noneLabel="No reviewer"', 'noneLabel={t("issue.newDialog.noReviewer", { defaultValue: "No reviewer" })}');

// 13. Replace approver selector
content = content.replace('placeholder="Approver"', 'placeholder={t("issue.newDialog.approver", { defaultValue: "Approver" })}');
content = content.replace('noneLabel="No approver"', 'noneLabel={t("issue.newDialog.noApprover", { defaultValue: "No approver" })}');

// 14. Replace backlog/todo descriptions
content = content.replace(
  'description: "Parked — assignee will not be woken"',
  'description: t("issue.newDialog.backlogDescription", { defaultValue: "Parked — assignee will not be woken" })'
);
content = content.replace(
  'description: "Executable — assignee will be woken"',
  'description: t("issue.newDialog.todoDescription", { defaultValue: "Executable — assignee will be woken" })'
);

// 15. Replace error message
content = content.replace(
  '"Failed to create task. Try again."',
  't("issue.newDialog.failedToCreate", { defaultValue: "Failed to create task. Try again." })'
);

fs.writeFileSync('ui/src/components/NewIssueDialog.tsx', content, 'utf-8');
console.log('Fixed NewIssueDialog.tsx');
