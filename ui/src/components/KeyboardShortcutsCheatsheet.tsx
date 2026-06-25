import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation, type TFunction } from "@/i18n";

interface ShortcutEntry {
  keys: string[];
  label: string;
  /** Render keys as a simultaneous chord (joined with "+") rather than a
   *  "then" sequence. */
  combo?: boolean;
}

// Platform-appropriate label for the Cmd/Ctrl modifier so the cheatsheet shows
// the same key the user actually presses (re-pointed in the collapsible sidebar
// work — Cmd/Ctrl+B toggles the rail).
function getPlatformLabel() {
  if (typeof navigator === "undefined") return "";
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  return nav.userAgentData?.platform || navigator.userAgent || "";
}

const META_KEY = /Mac|iPhone|iPad|iPod/.test(getPlatformLabel()) ? "⌘" : "Ctrl";

interface ShortcutSection {
  title: string;
  shortcuts: ShortcutEntry[];
}

function getSections(t: TFunction): ShortcutSection[] {
  return [
    {
      title: t("keyboardShortcuts.sections.inbox"),
      shortcuts: [
        { keys: ["j"], label: t("keyboardShortcuts.moveDown") },
        { keys: ["↓"], label: t("keyboardShortcuts.moveDown") },
        { keys: ["k"], label: t("keyboardShortcuts.moveUp") },
        { keys: ["↑"], label: t("keyboardShortcuts.moveUp") },
        { keys: ["←"], label: t("keyboardShortcuts.collapseSelectedGroup") },
        { keys: ["→"], label: t("keyboardShortcuts.expandSelectedGroup") },
        { keys: ["Enter"], label: t("keyboardShortcuts.openSelectedItem") },
        { keys: ["a"], label: t("keyboardShortcuts.archiveItem") },
        { keys: ["y"], label: t("keyboardShortcuts.archiveItem") },
        { keys: ["r"], label: t("keyboardShortcuts.markAsRead") },
        { keys: ["U"], label: t("keyboardShortcuts.markAsUnread") },
      ],
    },
    {
      title: t("keyboardShortcuts.sections.taskDetail"),
      shortcuts: [
        { keys: ["y"], label: t("keyboardShortcuts.quickArchiveToInbox") },
        { keys: ["g", "i"], label: t("keyboardShortcuts.goToInbox") },
        { keys: ["g", "c"], label: t("keyboardShortcuts.focusCommentComposer") },
      ],
    },
    {
      title: t("keyboardShortcuts.sections.global"),
      shortcuts: [
        { keys: ["/"], label: t("keyboardShortcuts.searchCurrentPage") },
        { keys: ["c"], label: t("keyboardShortcuts.newTask") },
        { keys: ["["], label: t("keyboardShortcuts.toggleSidebar") },
        { keys: [META_KEY, "B"], label: t("keyboardShortcuts.collapseOrExpandSidebar"), combo: true },
        { keys: ["]"], label: t("keyboardShortcuts.togglePanel") },
        { keys: ["?"], label: t("keyboardShortcuts.showKeyboardShortcuts") },
      ],
    },
  ];
}

function KeyCap({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-foreground shadow-[0_1px_0_1px_hsl(var(--border))]">
      {children}
    </kbd>
  );
}

export function KeyboardShortcutsCheatsheetContent() {
  const { t } = useTranslation();
  const sections = getSections(t);
  return (
    <>
      <div className="divide-y divide-border border-t border-border">
        {sections.map((section) => (
          <div key={section.title} className="px-5 py-3">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <div className="space-y-1.5">
              {section.shortcuts.map((shortcut) => (
                <div
                  key={shortcut.label + shortcut.keys.join()}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm text-foreground/90">{shortcut.label}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <span key={key} className="flex items-center gap-1">
                        {i > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {shortcut.combo ? "+" : t("keyboardShortcuts.then")}
                          </span>
                        )}
                        <KeyCap>{key}</KeyCap>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-5 py-3">
        <p className="text-xs text-muted-foreground">
          {t("keyboardShortcuts.pressEsc")} <KeyCap>Esc</KeyCap> {t("keyboardShortcuts.toClose")} &middot; {t("keyboardShortcuts.shortcutsDisabled")}
        </p>
      </div>
    </>
  );
}

export function KeyboardShortcutsCheatsheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gap-0 p-0 overflow-hidden" showCloseButton={false}>
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="text-base">{t("keyboardShortcuts.title")}</DialogTitle>
        </DialogHeader>
        <KeyboardShortcutsCheatsheetContent />
      </DialogContent>
    </Dialog>
  );
}
